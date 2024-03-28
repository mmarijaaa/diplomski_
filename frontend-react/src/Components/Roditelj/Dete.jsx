import React from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import arrow from '../Slike/arrow_back.png'; 

const Dete = () => {

    const[dete, setDete] = useState();
    const[deteIme, setDeteIme] = useState();
    const[detePrezime, setDetePrezime] = useState();

    var i = window.localStorage.getItem("ime_deteta_roditelj");
    var p = window.localStorage.getItem("prezime_deteta_roditelj"); 

   /* useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/pacijent/' + id_dete,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token2"),
            },
            data : dete,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data.pacijenti)); 
            console.log("ima deteta");
            setDete(response.data.pacijenti);
            setDeteIme(response.data.pacijenti.ime);
            setDetePrezime(response.data.pacijenti.prezime);
        })
        .catch((error) => {
            console.log(error);
            console.log("nema deteta");
        });
        
      }, []);*/


    return (
        <div className="dete">
            <h1>DETE: {i} {p}</h1>

            
            <button className='dugmeP' >ZAKAZI TRETMAN</button>
            <button className='dugmeP' >TRETMANI</button>

        </div>
    )
}

export default Dete;
