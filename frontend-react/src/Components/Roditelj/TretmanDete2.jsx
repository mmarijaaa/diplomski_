import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const TretmanDete2 = ({tretman}) => {

    let datum1 = tretman.datum_tretmana;
    let datum = moment(datum1).local().format('ll');  

    return (

        <div className="tret_d2">

            <div className="tretman_d">

                <div className='tretman_info'>
                    <div>{tretman.naziv_tretmana}</div> 
                    <div>{tretman.vreme_tretmana}</div>
                    <div>{datum}</div>
                </div>
                <div id='tretman_opis2'>Opis: {tretman.sadrzaj_tretmana}</div>
    
            </div>

        </div>
    );
}

export default TretmanDete2;