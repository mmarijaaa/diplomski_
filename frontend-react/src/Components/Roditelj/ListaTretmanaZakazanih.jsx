import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete from './TretmanDete';

const ListaTretmanaZakazanih = () => {

    const [tretmani, setTretmani] = useState();

    //LISTA TRETMANA
    useEffect(() => {

        let id_pacijenta = window.sessionStorage.getItem("id_pacijenta");

        if(tretmani == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmana/' + window.sessionStorage.getItem("id_pacijenta"),
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmani,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista tretmana prikazana");
            setTretmani(response.data.tretmani); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
        });
        }
    }, [tretmani]);


    return (
        <div>
            {
            tretmani == null 
            ? (<></>)
            : (tretmani.map((tretman) => <TretmanDete tretman={tretman} key={tretman.id}/>))
            }
        </div>
    )

}

export default ListaTretmanaZakazanih;