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

    function sacuvajIdPacijenta() {
        window.sessionStorage.setItem("id_deteta",pacijent.id);
        window.sessionStorage.setItem("ime_deteta",pacijent.ime);
        window.sessionStorage.setItem("prezime_deteta",pacijent.prezime); 
        navigate('/roditelj/dete'); 
    }
   
    return (
        <div className="dete_info">
            {/* <Link className="dete_link" to="/roditelj/dete" onClick={sacuvajIdPacijenta}>{pacijent.ime} {pacijent.prezime}</Link>   */}
            <button  className="dete_link" onClick={sacuvajIdPacijenta}>
                {pacijent.ime} {pacijent.prezime}
            </button>
        </div>
    ); 
}

export default PacijentRoditelj2;