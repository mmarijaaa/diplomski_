import React from 'react';
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

const KreirajRoditelja = ({}) => {

    const [roditeljData, setRoditeljData] = useState({
        ime:"",
        prezime:"",
        korisnicko_ime:"",
        email:"",
        password:"",
        broj_telefona:"",
        id_logopeda:""
    });

    //setovanje polja na prazno kada se kreira roditelj 
    const [polje, setPolje] = useState();

    let navigate = useNavigate();

    function handleInput(e) {
        let newRoditeljData = roditeljData;
        newRoditeljData[e.target.name] = e.target.value;
        setRoditeljData(newRoditeljData);
    }

    const [porukaGreske, setPorukaGreske] = useState();

    function handleKreirajRoditelja(e) {
        e.preventDefault();
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreirajRoditelja',
            headers: { 
                'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
            },
            data: roditeljData,
        };
        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if(response.data.success == true) {
                console.log("Roditelj uspesno kreiran!");
                window.sessionStorage.setItem("roditelj_id", response.data.roditelj_id);
                // navigate('/logoped/kreirajPacijenta');
                Swal.fire({
                    title: 'Uspešno sačuvan roditelj!',
                    showConfirmButton: true,
                  }).then(function(){
                    window.location.reload();
                    });
            }
            else {
                console.log("Roditelj NIJE uspesno kreiran!");
                console.log(response.data.poruka);
                setPorukaGreske(response.data.poruka);
            }
        })
        .catch((error) => {
          console.log(error);
        });
    }


//******** ISNTRUKCIJE ZA KORISCENJE APLIKACJE ZA RODITELJE
//******** SVE INSTRUKCIJE POSLATE PUTEM MEJLA KAD SE POSALJU I KOR IME I SIFRA NALOGA


    return (
        <div className="log_forma">

            <form onSubmit={handleKreirajRoditelja}>

            <div className="kreiraj_forma">
                <p>KREIRANJE RODITELJA</p> 
                    <input 
                        type="text"
                        id="ime_roditelja"
                        className="polje"
                        placeholder="Unesite ime roditelja..."
                        onInput={handleInput}
                        name="ime"
                        value={polje}
                        
                    />
                    
                    <input 
                        type="text"
                        id="prezime_roditelja"
                        className="polje"
                        placeholder="Unesite prezime roditelja..."
                        onInput={handleInput}
                        name="prezime"
                        value={polje}
                    />
                    <input 
                        type="text"
                        id="korisnicko_ime_roditelja"
                        className="polje"
                        placeholder="Unesite korisnicko ime roditelja..."
                        onInput={handleInput}
                        name="korisnicko_ime"
                        value={polje}
                    />
                    <input 
                        type="email"
                        id="email_roditelja"
                        className="polje"
                        placeholder="Unesite email..."
                        onInput={handleInput}
                        name="email"
                        value={polje}
                    />
                    <input 
                        type="text"
                        id="password_roditelja"
                        className="polje"
                        placeholder="Unesite lozinku..."
                        onInput={handleInput}
                        name="password"
                        value={polje}
                    />
                    <input 
                        type="text"
                        id="broj_telefona_roditelja"
                        className="polje"
                        placeholder="Unesite broj telefona..."
                        onInput={handleInput}
                        name="broj_telefona"
                        value={polje}
                    />
                    <h6>{porukaGreske}</h6>
                    <button
                        type="submit"
                        className="dugme"
                    >
                    KREIRAJ RODITELJA
                    </button>

            </div>

            </form>

        </div>
    );
};

export default KreirajRoditelja;
