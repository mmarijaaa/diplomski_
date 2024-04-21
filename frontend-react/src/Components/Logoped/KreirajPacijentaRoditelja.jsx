import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import {useRef} from 'react';
import Swal from 'sweetalert2'

const KreirajPacijentaRoditelja = ({}) => {

    const Swal = require('sweetalert2'); 

    var [poremecaji, setPoremecaji] = useState();
    var listaPoremecaja = "";

    function handleInput3(e) {
        var options = e.target.options;
        var value = [];
        poremecaji = ""; 
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
            listaPoremecaja = listaPoremecaja + options[i].value + ", ";
          }
        }
        var listaPoremecaja1 = listaPoremecaja.slice(0,-1);
        console.log(value);
        setPoremecaji(listaPoremecaja1); 
        console.log(poremecaji);
    }

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

    let id_logopeda = window.localStorage.getItem("user_id");

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaRoditeljaLogopeda/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token"),
            },
            data : roditelji,
          };
          axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data)); 
            console.log(response.data.data);
            console.log("Roditelj JESTE prikazan"); 
            setRoditelji(response.data.data);  
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

    function handleInput2(e) {
        let newPaketPac = paketPac;
        setPaketPac[e.target.name] = e.target.value;
        setPaketPac(newPaketPac);
    }

    function dve(e) {
        handleInput(e);
        //handleInput2(e);
        id_roditelja = e.target.value;
        console.log(e.target.value);
    }

    function hanldex2(e) {
        handleInput(e);
        //handleInput2(e);
        naziv_paketa = e.target.options[e.target.selectedIndex].text
        console.log(e.target.options[e.target.selectedIndex].text);
    }

    function handleSelect(e) {
        handleInput3();
        handleInput();
    }

    let id_roditelja;
    const [polje, setPolje] = useState(); 
    const [porukaGreske, setPorukaGreske] = useState();

    const today = new Date();
    const mesec_danas = today.getMonth() + 1;
    const mesec_danas1 = today.getMonth() + 2;
    const godina_danas = today.getFullYear();
    const dan_danas = today.getDate();
    var datum_od = godina_danas + "-" + mesec_danas + "-" + dan_danas + " " + "00:00:00";
    var datum_do = godina_danas + "-" + mesec_danas1 + "-" + dan_danas + " " + "00:00:00";

    const[paketPac, setPaketPac] = useState({
        naziv_paketa:"",
        datum_od: datum_od,
        datum_do: datum_do,
        id_pacijenta:"",
        id_logopeda:"",
    });
    var id_pac;
    var naziv_paketa;

    function handleKreirajPacijenta(e) {
        e.preventDefault();

        let id_paketa = document.getElementById("paket").value;

        console.log(id_paketa);
        
        //KREIRANJE PACIJENTA
       var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreirajPacijenta/'+ id_roditelja + '/' + id_paketa,
            headers: { 
              'Authorization': 'Bearer '+window.localStorage.getItem("auth_token"), 
            },
            data: pacijentData,
        };

        axios(config)
        .then((response) => {
            if(response.data.success === true) {
                console.log("Pacijent uspesno kreiran");
                console.log(JSON.stringify(response.data));
                window.localStorage.setItem('id_pac',response.data[0].id);
                id_pac = response.data[0].id;
                Swal.fire({
                    title: 'Uspesno sačuvan pacijent!', 
                    showConfirmButton: true
                     }).then((result) => {
                        if (result.isConfirmed) {
                   
                                console.log(id_pac);
                                console.log(id_roditelja);
                                console.log(naziv_paketa);
                                var config = {
                                    method: 'post',
                                    url: 'http://127.0.0.1:8000/api/kreirajNoviPaket/'+ naziv_paketa + '/' + id_pac + '/' + id_logopeda,
                                    headers: { 
                                    'Authorization': 'Bearer '+window.localStorage.getItem("auth_token"), 
                                    },
                                    data: paketPac,
                                };
            
                                axios(config)
                                .then((response) => {
                                    console.log(JSON.stringify(response.data));

                                    Swal.fire({
                                        title: 'Kreiran paket pacijenta!', 
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        window.location.reload(false);
                                    }
                                    )
                                })
                                .catch((error) => {
                                    console.log(error);
                                });  
                            }
                    })
        } else {
                console.log("Pacijent NIJE USPESNO kreiran");
                console.log(response.data.poruka);
                setPorukaGreske(response.data.poruka);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="log_forma">
            {/* <form onSubmit={handleKreirajPacijenta}> */}

            <div className="kreiraj_forma">
                <p>KREIRANJE PACIJENTA</p> 
                
                    <input 
                        type="text"
                        id="ime_pacijenta"
                        className="polje"
                        placeholder="Ime pacijenta..."
                        onInput={handleInput}
                        name="ime"
                        value={polje}
                        autoComplete="off"
                    />
                    
                    <input 
                        type="text"
                        id="prezime_pacijenta"
                        className="polje"
                        placeholder="Prezime pacijenta..."
                        onInput={handleInput}
                        name="prezime"
                        value={polje}
                        autoComplete="off"
                    />
                    
                    <input 
                        type="text"
                        id="uzrast_pacijenta"
                        className="polje"
                        placeholder="Uzrast pacijenta(od 3 do 15)..."
                        onInput={handleInput}
                        name="uzrast"
                        value={polje}
                        autoComplete="off"
                    />
                   
                    <select name="poremecaj" onChange={handleInput} defaultValue={"placeholder"}>
                        <option value={"placeholder"}>Izaberi poremećaj</option>
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
                   
                    <select name="id_paketa" id="paket" onChange={hanldex2} defaultValue={"placeholder"}>
                        <option value={"placeholder"}>Izaberi paket</option>
                        <option value="1">Paket 1 - 4 tretmana</option>
                        <option value="2">Paket 2 - 8 tretmana</option>
                        <option value="3">Paket 3 - 12 tretmana</option>
                        <option value="4">Paket 4 - 18 tretmana</option>
                        <option value="5">Paket 5 - 24 tretmana</option>
                    </select>
                    
                    <select name="id_roditelja" id="roditelj" onChange={dve} defaultValue={"placeholder"}> 
                        <option value={"placeholder"}>Izaberi roditelja</option>
                        {roditelji == null 
                            ? (<></>)
                            :
                        (roditelji.map(({id, ime, prezime, korisnicko_ime, email, email_verified_at, broj_telefona, created_at, updated_at} )=> <option value={id} >{ime} {prezime} - {korisnicko_ime} - {email}</option>))} 
                    </select>
                    <h6>{porukaGreske}</h6>
                    
                    <button
                        // type="submit"
                        className="dugme"
                        onClick={handleKreirajPacijenta}
                    >
                    KREIRAJ PACIJENTA 
                    </button>
                    
            </div>

            {/* </form> */}

        </div>
    );

};

export default KreirajPacijentaRoditelja;  
