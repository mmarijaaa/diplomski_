import React from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import logout from '../Slike/logout.png'; 
import user from '../Slike/user.png'; 
import lista from '../Slike/checklist.png'; 
import phone from '../Slike/phone.png'; 

const Deca = ({}) => {

    const [deca, setDeca] = useState();

    let id_roditelja = window.localStorage.getItem("roditelj_user_id");

    //LISTA DECE RODITELJA
    useEffect(() => {
        if(deca == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaDece/' + id_roditelja,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token2"),
            },
            data : deca,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista dece prikazana");
            setDeca(response.data.deca); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista dece NIJE prikazana");
        });
        }
    }, [deca]);
    return (
        <div className="roditelj_deca">
            {
                deca == null 
                ? (<></>)
                : (deca.map((pacijent) => <PacijentRoditelj pacijent={pacijent} key={pacijent.id}/>))
            }
            </div>
    )
}

export default Deca;
