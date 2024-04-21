import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete from './TretmanDete';
import TretmaniLogopeda from './TretmaniLogopeda';
import Swal from 'sweetalert2';
import moment from 'moment';

const PacijentRoditelj2 = ({pacijent}) => {

    let navigate = useNavigate();
    var deteime;
    var deteprezime;
    function dete() {
        window.localStorage.setItem("id_deteta",pacijent.id);
        window.localStorage.setItem("ime_deteta_roditelj",pacijent.ime);
        window.localStorage.setItem("prezime_deteta_roditelj",pacijent.prezime); 
        navigate('/roditelj/dete'); 
    }
   
    return (
        <div className="dete_info">
            <div className="dete_dugme">

            <a href='/roditelj/dete' onClick={dete}> {pacijent.ime} {pacijent.prezime}</a> 

            </div> 

            
            
        </div>
    ); 
}

export default PacijentRoditelj2;