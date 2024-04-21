import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const KreirajTretman = () => {

    const [pacijenti, setPacijenti] = useState();
    const [pacIdPaketa, setPacIdPaketa] = useState();
    const [pacIdPakPac, setPacIdPakPac] = useState();

    var id_logopeda = window.localStorage.getItem("user_id");
    var id_pacijenta;
    var id_paket;
    var id_paket_pacijenta;

    useEffect(() => {
        if(pacijenti == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/svipac/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token"),
            },
            data : pacijenti,
          };

        axios(config)
        .then((response) => {
            console.log("Lista pacijenata prikazana");
            setPacijenti(response.data.data); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista pacijenata NIJE prikazana");
        });
        }
    }, []); 

    function handleInput() {
    }

    function handleKreirajTretman() {
    }

    function dve(e) {
        id_pacijenta = e.target.value;
        handleInput();
        uzmiPaketPacijenta();
    }

    const[paketTrenutni, setPaketTrenutni] = useState();

    function uzmiPaketPacijenta() {
        console.log("id pacijenta: "+id_pacijenta);
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.localStorage.getItem("auth_token"),
              
            },
            data : paketTrenutni
          };
          axios.request(config)
            .then((response) => {
              console.log("id paketa pacijenta: "+response.data.data[0].id);
              id_paket_pacijenta = response.data.data[0].id;
              console.log("id paketa: "+response.data.data[0].naziv_paketa.slice(6,8));
              id_paket = response.data.data[0].naziv_paketa.slice(6,8);
            })
            .catch((error) => {
              console.log(error);
            });
    }


    return (
        <div className="log_forma">

            <form onSubmit={handleKreirajTretman}>

            <div className="kreiraj_forma">

                <p>KREIRANJE TRETMANA</p> 

                    <select name="id_roditelja" id="roditelj" defaultValue={"placeholder"}  
                        onChange={dve}> 
                        <option value={"placeholder"}>Izaberi pacijenta</option>
                        {pacijenti == null 
                            ? (<></>)
                            :
                        (pacijenti.map(({id, ime, prezime, uzrast, poremecaj, id_roditelja, id_logopeda, id_paketa, created_at, updated_at} )=> <option value={id} >{ime} {prezime} - {uzrast} godina/e</option>))} 
                    </select>

                    <input 
                        type="date"
                        id="datum_tretmana"
                        className="polje"
                        placeholder="Unesite datum..."
                        onInput={handleInput}
                        name="datum_tretmana"
                    />
                    <select name="vreme_tretmana" className="vreme_tretmana2" onChange={handleInput}>
                        <option>Vreme</option>
                        <option value="12h">12h</option>
                        <option value="13h">13h</option>
                        <option value="14h">14h</option>
                        <option value="15h">15h</option>
                        <option value="16h">16h</option>
                        <option value="17h">17h</option>
                        <option value="18h">18h</option>
                        <option value="19h">19h</option>
                        <option value="20h">20h</option> 
                    </select>
                    <button className="dugme1" type="submit">
                        ZAKAŽI TRETMAN
                    </button>
                </div>
                  
            </form>

        </div>
    )

}

export default KreirajTretman;