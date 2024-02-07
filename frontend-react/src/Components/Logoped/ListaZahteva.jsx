import React, { useReducer } from 'react'
import Zahtev from './Zahtev';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListaZahteva = () => {

    const [zahtevi, setZahtevi] = useState();
    let id_logopeda = window.sessionStorage.getItem("user_id");

    useEffect(() => {
        if(zahtevi == null) {
        let config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/sviZahtevi/' + id_logopeda, 
          headers: { 
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
          },
          data : zahtevi
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data));
          setZahtevi(response.data.data);
          if(response.data.success == true) {
              setZahtevi(response.data.zahtevi);
            } else {
                // Swal.fire({
                //     title: 'Nemate zahteva!', 
                // }); 
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }},
    []); 

    const [search, setSearch] = useState(''); 

    return (
        <div className="lista">
          
          <p id='lista_naslov'>LISTA ZAHTEVA</p> 
          <div className='pretraga'><input type='text' className='pretraga' placeholder='Pretraži zahteve' onChange={(e) => setSearch(e.target.value)}></input></div>
          <div className='zahtevi'> 
          {  
                zahtevi == null 
                ? (<></>)
                : zahtevi.filter((zahtev) => {
                    return search.toLowerCase() === ''   
                    ? zahtev
                    : (zahtev.tip_zahteva.toLowerCase().includes(search)); 
                  }).map((zahtev)=>(
          
                  <Zahtev zahtev={zahtev} key={zahtev.id}/>
          
                  ))
                }
          </div>

        </div>
    )

}

export default ListaZahteva; 