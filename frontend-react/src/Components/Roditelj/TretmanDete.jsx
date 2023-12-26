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

    return (
        <div className="tretman_dete">
            
            <p>{tretman.naziv_tretmana} {tretman.redni_broj_tretmana} --- {datum} --- {tretman.vreme_tretmana}</p>
            <p id='tretman_opis'><b>Opis tretmana:</b> {tretman.sadrzaj_tretmana}</p>
 
        </div>
    );
}

export default TretmanDete;