import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pregled from './Pregled';
import Tretman from './Tretman';
import Swal from 'sweetalert2';
import arrow from '../Slike/arrow_back.png'; 

const ListaTretmana = () => {

    const [pregledi, setPregledi] = useState();
    const [tretmani, setTretmani] = useState();
    const[modalP, setModalP] = useState(false);
    const[modalT, setModalT] = useState(false);

    var id_logopeda =  window.sessionStorage.getItem("user_id");

    function preglediLista() {
        setModalP(!modalP);
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaPregleda', 
          headers: { 
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
          },
          data : pregledi
        };
        
        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data)); 
            setPregledi(response.data.data);
          if(response.data.success == true) {
            setPregledi(response.data.data);
            } else {
                // Swal.fire({
                //     title: 'Nemate zahteva!', 
                // }); 
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function tretmaniLista() {
        setModalT(!modalT);
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/listaTretmanaLogoped/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            },
            data : tretmani
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setTretmani(response.data.data);
          })
          .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="lista">
          
          <p id='lista_naslov'>LISTA PREGLEDA I TRETMANA</p>   

        <div className="dugmadP">
            <button className='dugmeP' onClick={preglediLista}>PREGLEDI</button>
            <button className='dugmeP' onClick={tretmaniLista}>TRETMANI</button>
        </div>
         

                {modalP && (
                <div className='modalP'>
                <div className='overlayP' onClick={preglediLista}></div>
                <div className='contentP'>
                    <p className='dete_naslov'>PREGLEDI: </p> 

                    { 
                    pregledi == null 
                    ? (<></>)
                    : (pregledi.map((pregled) => <Pregled pregled={pregled} key={pregled.id}/>))
                    }
                
                </div>
                </div>
                )}

                {modalT && (
                <div className='modalT'>
                <div className='overlayT' onClick={tretmaniLista}></div>
                <div className='contentT'>
                    <p className='dete_naslov'>TRETMANI: </p> 

                    { 
                    tretmani == null 
                    ? (<></>)
                    : (tretmani.map((tretman) => <Tretman tretman={tretman} key={tretman.id}/>))
                    }
               
                </div>
                </div>
                )}
          
          </div>
    )

}

export default ListaTretmana;