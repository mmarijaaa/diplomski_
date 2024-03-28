import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const TretmanDete = ({tretman}) => {

    let datum1 = tretman.datum_tretmana;
    let datum = moment(datum1).local().format('ll'); //srediti 
    let navigate = useNavigate();

    //OTKAZIVANJE TRETMANA
    function otkazivanjeTretmana() {

        Swal.fire({
            title: "Da li sigurno želite da otkažete tretman?",
            confirmButtonText: "DA",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
  
          var config = {
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/brisanjeTretmana/' + tretman.id,
            headers: { 
              'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),  
            },
            
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Tretman obrisan.");
          })
          .catch((error) => {
            console.log(error);
          });
  
          Swal.fire("Tretman otkazan.")
          .then(function(){
            navigate("/roditelj");
          });
        }
        });
    
    }

    return (

        <div className="tret_d">

            <div className="tretman_d">

                <div className='tretman_info'>
                    <div>{tretman.naziv_tretmana}</div> 
                    <div>{tretman.vreme_tretmana}</div>
                    <div>{datum}</div>
                </div>
                <div id='tretman_opis'>Opis: {tretman.sadrzaj_tretmana}</div>
    
            </div>

            <div className="tretman_dugme_brisanje">
                <button onClick={otkazivanjeTretmana}>OTKAŽITE TRETMAN</button>
            </div>

        </div>
    );
}

export default TretmanDete;