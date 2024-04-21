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

    return (
        <div className="dete">
            <h1>DETE: {i} {p}</h1>

            
            <button className='dugmeP' >ZAKAZI TRETMAN</button>
            <button className='dugmeP' >TRETMANI</button>

        </div>
    )
}

export default Dete;
