import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import {useRef} from 'react';
import Swal from 'sweetalert2'

const KreirajPacijentaRoditelja = ({}) => {

    const Swal = require('sweetalert2'); 

    const [pacijentData, setPacijentData] = useState({
        ime:"",
        prezime:"",
        uzrast:"",
        poremecaj:"",
        id_roditelja:"",
        id_logopeda:"",
        id_paketa:""
    });
    const [roditelji, setRoditelji] = useState();

    let id_logopeda = window.sessionStorage.getItem("user_id");

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaRoditeljaLogopeda/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
            },
            data : roditelji,
          };
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data)); 
            console.log(response.data.roditelj);
            console.log("Roditelj JESTE prikazan"); 
            setRoditelji(response.data.roditelj);  
          })
          .catch((error) => {
              console.log(error);
              console.log("Roditelj NIJE prikazan");
          }); 
    }, []);

    function handleInput(e) {
        let newPacijentData = pacijentData;
        newPacijentData[e.target.name] = e.target.value;
        setPacijentData(newPacijentData);
    }

    let id_roditelja;
    const [polje, setPolje] = useState(); 
    const [porukaGreske, setPorukaGreske] = useState();

    function handleKreirajPacijenta(e) {
        e.preventDefault();

        let id_paketa = document.getElementById("paket").value;

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreirajPacijenta/'+ id_roditelja + '/' + id_paketa,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"), 
            },
            data: pacijentData,
        };

        axios(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            // console.log("Pacijent uspesno kreiran");
            // setPolje('');
            //console.log(response.data.success);
            if(response.data.success === true) {
                console.log("Pacijent uspesno kreiran");
                console.log(JSON.stringify(response.data));
                //setPolje(''); 
                Swal.fire({
                    title: 'Uspesno sacuvan pacijent!',
                    showConfirmButton: true,
                  }).then(function(){
                    window.location.reload();
                    });
                //window.location.reload(false);
            } else {
                console.log("Pacijent NIJE USPESNO kreiran");
                console.log(response.data.poruka);
                setPorukaGreske(response.data.poruka);
            } 
        })
        .catch((error) => {
            console.log(error);
            //console.log("Pacijent NIJE USPESNO kreiran");
        });

    };

    
    // function nesto() {
    //     console.log("lista roditelja: ");
    //     var config = {
    //           method: 'get',
    //           url: 'http://127.0.0.1:8000/api/listaRoditelja',
    //           headers: { 
    //             'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
    //           },
    //           data : roditelji,
    //         };
    //         axios(config)
    //         .then((response) => {
    //           console.log(JSON.stringify(response.data)); 
    //           console.log(response.data.roditelj);
    //           //console.log(response.data.roditelj[0].ime);
    //           // setIme(response.data.roditelj[0].ime);
    //           // console.log(response.data.roditelj[0].prezime);
    //           // setPrezime(response.data.roditelj[0].prezime);
    //           console.log("Roditelj JESTE prikazan"); 
    //           setRoditelji(response.data.roditelj);  
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             console.log("Roditelj NIJE prikazan");
    //         }); 
    // }
    
    function dve(e) {
        handleInput(e);
        id_roditelja = e.target.value;
        console.log(e.target.value);
    }

    return (
        <div className="log_forma">
            {/* <button onClick={nesto}>Nesto</button> */}
            <form onSubmit={handleKreirajPacijenta}>

            <div className="kreiraj_forma">
                <p>KREIRANJE PACIJENTA</p> 
                
                    <input 
                        type="text"
                        id="ime_pacijenta"
                        className="polje"
                        placeholder="Unesite ime pacijenta..."
                        onInput={handleInput}
                        name="ime"
                        value={polje}
                    />
                    
                    <input 
                        type="text"
                        id="prezime_pacijenta"
                        className="polje"
                        placeholder="Unesite prezime pacijenta..."
                        onInput={handleInput}
                        name="prezime"
                        value={polje}
                    />
                    
                    <input 
                        type="text"
                        id="uzrast_pacijenta"
                        className="polje"
                        placeholder="Unesite uzrast pacijenta..."
                        onInput={handleInput}
                        name="uzrast"
                        value={polje}
                    />
                   
                    <select name="poremecaj" onChange={handleInput}>
                        <option value="Pervazivni razvojni poremecaji - autizam">Pervazivni razvojni poremecaji - autizam</option>
                        <option value="Afazija">Afazija</option>
                        <option value="Artikulacija">Artikulacija</option>
                        <option value="Disfazija">Disfazija</option>
                        <option value="Disgrafija">Disgrafija</option>
                        <option value="Egzekutivne funkcije">Egzekutivne funkcije</option>
                        <option value="Disleksija">Disleksija</option>
                        <option value="Fluentnost govora - mucanje">Fluentnost govora - mucanje</option>
                        <option value="Razvoj grafomotorickih sposobnosti">Razvoj grafomotorickih sposobnosti</option>
                        <option value="Agramatizam">Agramatizam</option>
                        <option value="Razvoj verbalne memorije">Razvoj verbalne memorije</option>
                        <option value="Savladavanje školskog gradiva">Savladavanje školskog gradva</option>
                    </select>
                   
                    <select name="id_paketa" id="paket" onChange={handleInput}>
                        <option value="1">Paket 1 - 4 tretmana</option>
                        <option value="2">Paket 2 - 8 tretmana</option>
                        <option value="3">Paket 3 - 12 tretmana</option>
                        <option value="4">Paket 4 - 18 tretmana</option>
                        <option value="5">Paket 5 - 24 tretmana</option>
                    </select>
                    
                    <select name="id_roditelja" id="roditelj" onChange={dve}> 
                        {roditelji == null 
                            ? (<></>)
                            :
                        (roditelji.map(({id, ime, prezime, korisnicko_ime, email, email_verified_at, broj_telefona, created_at, updated_at} )=> <option value={id} >{ime} {prezime}</option>))} 
                    </select>
                    <h6>{porukaGreske}</h6>
                    
                    <button
                        type="submit"
                        className="dugme"
                    >
                    KREIRAJ PACIJENTA 
                    </button>
                    
            </div>

            </form>

        </div>
    );

};

export default KreirajPacijentaRoditelja;  
