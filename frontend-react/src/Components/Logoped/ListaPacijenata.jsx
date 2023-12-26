import React, { useReducer } from 'react'
import PacijentLogoped from './PacijentLogoped';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const ListaPacijenata = () => {

    const [pacijents, setPacijents] = useState();

    let id_logopeda = window.sessionStorage.getItem("user_id");

    useEffect(() => {
        if(pacijents == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/logopedListaPacijenata/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
            },
            data : pacijents,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista pacijenata prikazana");
            setPacijents(response.data.pacijenti); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista pacijenata NIJE prikazana");
        });
        }
    }, []); 
    
    const [search, setSearch] = useState('');
    console.log(search); 

    return (
        <div className="lista">
            <p id='lista_naslov'>LISTA PACIJENATA</p>
            <div className='pretraga'><input type='text' className='pretraga' placeholder='Pretraži pacijente' onChange={(e) => setSearch(e.target.value)}></input></div>
            { 
                // pacijents == null 
                // ? (<></>)
                // : (pacijents.map((pacijent) => <PacijentLogoped pacijent={pacijent} key={pacijent.id}/>))
                pacijents == null 
                ? (<></>)
                : pacijents.filter((pacijent) => {
                    return search.toLowerCase() === ''  
                    ? pacijent
                    : (pacijent.ime.toLowerCase().includes(search) 
                        || pacijent.prezime.toLowerCase().includes(search)
                        || pacijent.poremecaj.toLowerCase().includes(search)); 
                  }).map((pacijent)=>(
          
                  <PacijentLogoped pacijent={pacijent} key={pacijent.id}/>
          
                  ))
                }
            
        </div> 
      )
    }
     
    export default ListaPacijenata;