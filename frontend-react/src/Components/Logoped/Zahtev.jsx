import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Zahtev = ({zahtev}) => { 

    var odob = zahtev.odobren;
    var preg = zahtev.pregledan;
    var tip = zahtev.tip_zahteva;

    function promeni() {
        odob = 1;
        console.log(odob + " -- " + preg); 
    }
    return (
        <div className="zahtev">
          
            {
              tip == "Zahtev za novog pacijenta"
              ? (<div className="zahtev_sadrzaj">
                    <div className='ztip'>{zahtev.tip_zahteva}</div>
                    <div className='zlog'>{zahtev.logopedK.ime} {zahtev.logopedK.prezime}</div>
                    <div className='zrod'>{zahtev.info_roditelja}</div>
                    <div className='zpac'>{zahtev.info_pacijenta}</div>
                    <div className='zinfo'>                     </div>
                </div>)
              : (<div className="zahtev_sadrzaj">
                    <div className='ztip'>{zahtev.tip_zahteva}</div>
                    <div className='zlog'>                     </div>
                    <div className='zrod'>{zahtev.roditelj.ime} {zahtev.roditelj.prezime}</div>
                    <div className='zpac'>{zahtev.pacijent.ime} {zahtev.pacijent.prezime}</div>
                    <div className='zinfo'>{zahtev.info_pacijenta} </div>
                </div>) 
            }

            {/* <input type="checkbox" onChange={promeni}/> {zahtev.tip_zahteva} -- {zahtev.info_zahteva} */}
        </div>
    )
}

export default Zahtev;