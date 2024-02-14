import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


const Pregled = ({pregled}) => { 

    return (
        <div className="tpLista">  
            <div className="tp1">{pregled.naziv_tretmana} </div>
            <div className="tp2">{moment(pregled.datum_tretmana).local().format('ll')} </div>
            <div className="tp3">{pregled.vreme_tretmana} </div>
            <div className="tp4"> Roditelj: {pregled.sadrzaj_tretmana}</div>
            <div className="tp5"> Prvi pregled</div>
        </div>
    )

}

export default Pregled; 