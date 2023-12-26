import React from 'react';
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

const KreirajPacijenta = ({}) => {

    const [pacijentData, setPacijentData] = useState({
        ime:"",
        prezime:"",
        uzrast:"",
        poremecaj:"",
        id_roditelja:"",
        id_logopeda:"",
        id_paketa:""
    });

    //setovanje polja na prazno kada se kreira pacijent 
    const [polje, setPolje] = useState();

    function handleInput(e) {
        let newPacijentData = pacijentData;
        newPacijentData[e.target.name] = e.target.value;
        setPacijentData(newPacijentData);
    }

    const [porukaGreske, setPorukaGreske] = useState();

    function handleKreirajPacijenta(e) {
        e.preventDefault();

        let id_roditelja = window.sessionStorage.getItem("roditelj_id");
        let id_paketa = document.getElementById("paket").value;
        // console.log(id_paketa);
        // console.log(id_roditelja);

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
            } else {
                console.log("Pacijent NIJE USPESNO kreiran");
                console.log(response.data.poruka);
                setPorukaGreske(response.data.poruka);
            }  
        })
        .catch((error) => {
            console.log(error);
            // console.log("Pacijent NIJE USPESNO kreiran");
            // console.log(error.data.poruka);
            // setPorukaGreske(error.data.poruka);
        });

    };

    

    return (
        <div className="log_forma">

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
                    
                    {/* <input 
                        type="text"
                        id="poremecaj_pacijenta"
                        className="polje"
                        placeholder="Unesite poremecaj pacijenta..."
                        onInput={handleInput}
                        name="poremecaj2"
                    /> */}
                  

                    <select name="poremecaj" onChange={handleInput}>
                        <option value="Pervazivni razvojni poremecaji">Pervazivni razvojni poremecaji - autizam</option>
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
                    
                    <h6>{porukaGreske}</h6>
                    <button
                        type="submit"
                        className="dugme"
                    >
                    KREIRAJ PACIJENTA
                    </button>
                    <br></br>
            </div>

            </form>

        </div>
    );

};

export default KreirajPacijenta;  
