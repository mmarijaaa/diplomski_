import React from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import arrow from '../Slike/arrow_back.png'; 

const Dete = ({}) => {

    var ime_deteta = window.sessionStorage.getItem("ime_deteta");
    var prezime_deteta = window.sessionStorage.getItem("prezime_deteta");

    return (
        <div className="dete">
            <div className='back'>
                <a href="/roditelj/deca" ><img className="arrow_back" src={arrow} alt="" /></a> 
                <div id="back_povratak">Povratak na listu</div>
            </div>

            {window.sessionStorage.getItem("ime_deteta")}  {window.sessionStorage.getItem("prezime_deteta")}

        </div>
    )
}

export default Dete;
