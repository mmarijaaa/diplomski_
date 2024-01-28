import React from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";

const KontaktLogopeda = () => {

    //LOGOPED INFO
    const[logoped,setLogoped] = useState();
    const[logopedIme,setLogopedIme] = useState();
    const[logopedPrezime,setLogopedPrezime] = useState();

    let id_logopeda = window.sessionStorage.getItem("id_logopeda_pacijenta");
    useEffect(() => {
        if(logoped == null) { 
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/logoped/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
            },
            data : logoped,
          };
    
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setLogopedIme(response.data.logoped[1].ime);  
            setLogopedPrezime(response.data.logoped[1].prezime);  
        })
        .catch((error) => {
            console.log(error);
            console.log("Logopeda NEMA");
        });
        }
    }, []);
    return (
        <div className='kontakt_logopeda'>

           <div id='kont_naslov'>KONTAKT LOGOPEDA</div>

           <div className='kont_info'>
                <b>Logoped:</b> 
                {logopedIme} {logopedPrezime}
            </div>

           <div className='kont_info'>
                <b>Broj telefona logopeda:</b> 
                061/1111-222
            </div>

           <div className='kont_info'>
                <b>Email logopeda:</b> 
                <div id='kont_email_log'>{logopedIme}{logopedPrezime}@gmail.com</div>
            </div> 
           
        </div>
    )
}

export default KontaktLogopeda;