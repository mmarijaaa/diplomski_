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

        //uzimanje odabranih vrednosti za datum i vreme
        //dodavanje promenljivima radi dalje provere
        if(e.target.name == 'datum_tretmana') {
            datum_odabran = e.target.value;
        }
        if(e.target.name == 'vreme_tretmana') {
            vreme_odabrano = e.target.value;
        }
        console.log(datum_odabran);
        console.log(vreme_odabrano);

        //izvlacenje dana, meseca i godine iz odabranog datuma
        var dan_naziv = moment(datum_odabran).format('dddd'); //dan u nedelji
        const dan = moment(datum_odabran).format('D');
        const mesec = moment(datum_odabran).format('M');
        const godina = moment(datum_odabran).format('YYYY');
        const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 

        //izvlacenje danasnjeg datuma
        const today = new Date();
        const mesec_danas = today.getMonth()+1;
        const godina_danas = today.getFullYear();
        const dan_danas = today.getDate();
        const danasnji_dan = moment(today).format('L'); //12/04/2023 

        //prebacivanje dana u number ???
        let dan_number = Number(dan);
        let dan_danas_number = Number(dan_danas);
        console.log(dan_number);
        console.log(dan_danas_number);

         //provera da li je odabran vikend
         if(dan_naziv == "Sunday" || dan_naziv == "Saturday") {
            console.log("Ne radimo vikendom!");
            Swal.fire({
              title: 'Ne radimo vikendom!',
            })
        }

        //provera da li se poklapaju datumi
        if (godina == godina_danas) {
            if(mesec == mesec_danas) {
                if(dan  == dan_danas) {
                  console.log("DANAS NEMA ZAKAZIVANJA !!!");
                  Swal.fire({
                    title: 'Danas ne može da se zakaže tretman!', 
                  })
                } 
                else if(dan_danas > dan) {
                  console.log("DATUM JE PROSAO !!!");
                  Swal.fire({
                    title: 'Datum je prošao!', 
                  })
                }
                else {
                  console.log("MOZE DA SE ZAKAZE !!!");
                }
            } 
            else if(mesec_danas > mesec) {
                console.log("DATUM JE PROSAO !!!");
                Swal.fire({
                  title: 'Datum je prošao!', 
                })
            }
            else {
                console.log("MOZE DA SE ZAKAZE !!!");
            }
          }
          else if (godina_danas < godina) {
            console.log("MOZE DA SE ZAKAZE !!!");
          } 
          else if (godina_danas > godina){
            console.log("DATUM JE PROSAO !!!");
            Swal.fire({
              title: 'Datum je prošao!', 
            })
        }
        else {
            setTretmanData(newTretmanData); 
        }

        // setPregledData(newPregledData); 
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