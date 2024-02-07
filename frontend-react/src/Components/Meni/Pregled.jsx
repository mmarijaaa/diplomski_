import React from "react";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Meni from './Meni';
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../stil.css';  
import Footer from './Footer';
import kalendar from '../Slike/schedule.png'; 
import Swal from 'sweetalert2';

const Pregled = () => {

    const [pregledData, setPregledData] = useState({
        datum_tretmana:"",
        vreme_tretmana:"",
        sadrzaj_tretmana: ""
    });

    function handleInput(e) {
        let newPregledData = pregledData;
        newPregledData[e.target.name] = e.target.value;
        setPregledData(newPregledData); 
    }

    function handleKreirajPregled(e) {
        
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreiranjePregleda',
            data: pregledData,
        }

        axios.request(config)
        .then((response) => {
            if(response.data.success === true) {
                console.log(JSON.stringify(response.data));
                console.log("Pregled kreiran!");
                setPregledData(response.data.tretmani);  
                Swal.fire({
                title: 'Uspešno kreiran pregled!',
                }).then(function(){ 
                window.location.reload();
                }); 
            } else {
                console.log("Pregled nije kreiran.");
            }
            
        })
        .catch((error) => {
            console.log(error);
            console.log("Pregled NIJE kreiran.");
        });
    }

    return (
        <div className="pregled"> 
        <Meni/> 
            <div className="pre">
            <div className="pr_forma">

                <div className="pregled_icon">
                    <img className="preg" src={kalendar} alt="" />
                </div>
                    
                
                <div className="pregled_forma">

                    <p>ZAKAŽITE PRVI PREGLED ZA VAŠE DETE</p>

                <div className="pregled_roditelj">
                    <input type="text"
                    id="ime_prezime_roditelj"
                    className="polje"
                    placeholder="Unesite Vaše ime i prezime..."
                    onInput={handleInput}
                    name="sadrzaj_tretmana"/>
                </div>
                <div className="pregled_datum">
                    <input 
                    type="date"
                    id="datum_pregleda"
                    className="polje"
                    placeholder="Izaberite datum..."
                    onInput={handleInput}
                    name="datum_tretmana"
                    />
                </div>
                <div className="pregled_vreme">
                    <select name="vreme_tretmana" id="vreme_tretmana" onChange={handleInput}>
                        <option value="12h">12h</option>
                        <option value="13h">13h</option>
                        <option value="14h">14h</option>
                        <option value="15h">15h</option>
                        <option value="16h">16h</option>
                        <option value="17h">17h</option>
                        <option value="18h">18h</option>
                        <option value="19h">19h</option>
                        <option value="20h">20h</option> 
                    </select>
                </div>
                <button
                    onClick={handleKreirajPregled}
                    className="dugme"
                    >
                    ZAKAŽITE
                    </button> 
                </div>
            </div>

            </div>
        <Footer/>
        </div>
    )
}

export default Pregled;