import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PrethodniPaketi = () => {

    //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
    const[paketiPac, setPaketiPac] = useState();
    var id_dete = window.sessionStorage.getItem("iddete");

    //USEEFFECT FUNCKIJA ZA ISPISIVANJE ZAVRSENIH TRETMANA
    useEffect(() => {
 
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketiZavrseni/' + id_dete,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
              
            },
            data : paketiPac
          };
          
          axios.request(config)
          .then((response) => { 
            console.log(JSON.stringify(response.data));
            setPaketiPac(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <div className="prethodni_paketi">
            <div className='naslovi_dugmica'>PRETHODNI PAKETI</div>

            <div className="prethodni_paketi_lista">
                    <select 
                      name="id_paketa_pacijenta" 
                      id="dete_lista_paketa" 
                      defaultValue={"placeholder"}
                      > 
                          <option value={"placeholder"}>Izaberite paket...</option> 
                          {paketiPac == null 
                              ? (<></>)
                              :
                          (paketiPac.map(({id, naziv_paketa, datum_od, datum_do, id_pacijenta, id_logopeda, created_at, updated_at} )=> 
                          <option value={id} >
                             
                                {naziv_paketa} *** {moment(datum_od).local().format('ll')} - {moment(datum_do).local().format('ll')}
                            
                          </option>))} 
                      </select>
            </div>
        </div>
    );
}

export default PrethodniPaketi;