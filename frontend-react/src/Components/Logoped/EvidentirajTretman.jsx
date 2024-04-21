import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../stil.css'; 
import Swal from 'sweetalert2';

const EvidentirajTretman = ({}) => {
    
    let id_logopeda = window.localStorage.getItem("user_id");
    let id_pacijenta;
    let id_paketa_pacijenta;
    let redni_broj_tretmana;

    //TRETMAN DATA
    const [tretmanData, setTretmanData] = useState({
        datum_tretmana:"",
        vreme_tretmana:"",
        redni_broj_tretmana: "",
        id_pacijenta: "",
        id_logopeda: "",
        id_paketa: "",
    });

    //HANDLE INPUT ZA TRETMAN DATA
    function handleInput(e) {
        let newTretmanData = tretmanData;
        newTretmanData[e.target.name] = e.target.value;
        setTretmanData(newTretmanData); 
    }

    //HANDLE KREIRAJ TRETMAN - EVIDENTIRAJ TRETMAN
    function handleKreirajTretman(e) {

            /*var config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_pacijenta + '/' + id_paketa_pacijenta + '/' + redni_broj_tretmana,
                headers: { 
                  'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
                },
                data: tretmanData,
            }
    
            axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("Tretman kreiran!");
                Swal.fire({
                  title: 'Uspešno zakazan tretman!',
                }).then(function(){
                  window.location.reload();
                });
                
            })
            .catch((error) => {
                console.log(error);
                console.log("Tretman NIJE kreiran.");
            });*/

            console.log("paket opet: "+id_paketa_pacijenta);
        }

    //LISTA PACIJENATA - DECE
    const [pacijents, setPacijents] = useState();
    
    useEffect(() => {
        if(pacijents == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/logopedListaPacijenata/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token"),
            },
            data : pacijents,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista pacijenata prikazana");
            setPacijents(response.data.pacijenti); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista pacijenata NIJE prikazana");
        });
        }
    }, []); 

    //JEDAN PACIJENT
    const[pacijent, setPacijent] = useState();
    const[pacijentPaket, setPacijentPaket] = useState();

    function pacijentFunkcija(e) {
        handleInput(e);
        id_pacijenta = e.target.value;
        console.log(id_pacijenta);

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/pacijent/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.localStorage.getItem("auth_token"),
            },
            data : pacijent,
          };

        axios(config)
        .then((response) => {
            console.log("paket: "+JSON.stringify(response.data.pacijenti[0].id_paketa));
            console.log("Pacijenat prikazan");
            id_paketa_pacijenta = response.data.pacijenti[0].id_paketa;
        })
        .catch((error) => {
            console.log(error);
            console.log("Pacijenta NEMA");
        });

    }

    return (
        <div className="evidencija">
            <h1>Evidencija tretmana</h1>

            <div className="tretman_zakazi">
                    <select name="id_pacijenta" id="pacijent" onChange={pacijentFunkcija}> 
                        {pacijents == null 
                            ? (<></>)
                            :
                        (pacijents.map(({id, ime, prezime, uzrast, poremecaj, id_roditelja, id_logopeda, id_paketa, created_at, updated_at} )=> <option value={id} >{ime} {prezime} / {uzrast} godina/e / {poremecaj}</option>))} 
                    </select>
                    <input 
                        type="date"
                        id="datum_tretmana"
                        className="polje"
                        placeholder="Unesite datum..."
                        onInput={handleInput}
                        name="datum_tretmana"
                    />
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
                    <button onClick={handleKreirajTretman}>
                        EVIDENTIRAJ 
                    </button>
                    
            </div>
        </div>
    )

};

export default EvidentirajTretman;