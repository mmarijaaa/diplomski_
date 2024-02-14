import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TretmanDete = ({tretman}) => {

    let datum1 = tretman.datum_tretmana;
    let datum = moment(datum1).local().format('ll'); //srediti 

    //OTKAZIVANJE TRETMANA UBACTITI!!!!!

    return (
        <div className="tretman_d">

            <div className='tretman_info'>
                <div>{tretman.naziv_tretmana} {tretman.redni_broj_tretmana}</div> 
                <div>{tretman.vreme_tretmana}</div>
                <div>{datum}</div>
            </div>
            <div id='tretman_opis'>Opis: {tretman.sadrzaj_tretmana}</div>
 
        </div>
    );
}

export default TretmanDete;