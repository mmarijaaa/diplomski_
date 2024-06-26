import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TretmaniLogopeda = ({tretman}) => {

    let datum1 = tretman.datum_tretmana;
    let datum = moment(datum1).local().format('ll');  

    return (
        <div className="zauzeti_tret_log">
            
            <div id='datum_kolona'>{datum}</div> 
            <div id='vreme_kolona'>{tretman.vreme_tretmana}</div> 
 
        </div>
    );
}

export default TretmaniLogopeda;