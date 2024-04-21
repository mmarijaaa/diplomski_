import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const KreirajRoditelja = ({ }) => {

    const [roditeljData, setRoditeljData] = useState({
        ime: "",
        prezime: "",
        korisnicko_ime: "",
        email: "",
        password: "",
        broj_telefona: "",
        id_logopeda: ""
    });

    //setovanje polja na prazno kada se kreira roditelj 
    const [polje, setPolje] = useState();

    let navigate = useNavigate();
    const [kopija, setKopija] = useState('');
    var roditelj_kor_ime;
    var roditelj_lozinka;
    var tekst;

    function handleInput(e) {
        let newRoditeljData = roditeljData;
        newRoditeljData[e.target.name] = e.target.value;
        setRoditeljData(newRoditeljData);

        if (e.target.name == 'korisnicko_ime') {
            roditelj_kor_ime = e.target.value;
        }
        if (e.target.name == 'password') {
            roditelj_lozinka = e.target.value;
        }
    }

    const [porukaGreske, setPorukaGreske] = useState();

    function handleKreirajRoditelja(e) {
        e.preventDefault();
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreirajRoditelja',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
            },
            data: roditeljData,
        };
        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.success == true) {
                    console.log("Roditelj uspesno kreiran!");
                    window.localStorage.setItem("roditelj_id", response.data.roditelj_id);
                    Swal.fire({
                        title: 'Uspešno sačuvan roditelj!',
                        showConfirmButton: true,
                    }).then(function () {
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


        //kopiranje u clipboard info roditelja za mail
        tekst = "Poštovani, \n" + "\n" +
            "U nastavku se nalaze podaci za logovanje na Vaš profil: \n" + "\n" +
            "Korisničko ime: " + roditelj_kor_ime + "\n" +
            "Lozinka: " + roditelj_lozinka + "\n" + "\n" +
            "Hvala Vam na poverenju." + "\n" +
            "Srdačan pozdrav, " + "\n" +
            "Kovačev Logopedski Centar"
        navigator.clipboard.writeText(tekst);

    }

    return (
        <div className="log_forma">

            <form onSubmit={handleKreirajRoditelja}>

                <div className="kreiraj_forma">
                    <p>KREIRANJE RODITELJA</p>
                    <input
                        type="text"
                        id="ime_roditelja"
                        className="polje"
                        placeholder="Ime roditelja..."
                        onInput={handleInput}
                        name="ime"
                        value={polje}
                        autoComplete="off"
                    />

                    <input
                        type="text"
                        id="prezime_roditelja"
                        className="polje"
                        placeholder="Prezime roditelja..."
                        onInput={handleInput}
                        name="prezime"
                        value={polje}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        id="korisnicko_ime_roditelja"
                        className="polje"
                        placeholder="Korisničko ime roditelja..."
                        onInput={handleInput}
                        name="korisnicko_ime"
                        value={polje}
                        autoComplete="off"
                    />
                    <input
                        type="email"
                        id="email_roditelja"
                        className="polje"
                        placeholder="Email roditelja..."
                        onInput={handleInput}
                        name="email"
                        value={polje}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        id="password_roditelja"
                        className="polje"
                        placeholder="Lozinka(min 6 karaktera)..."
                        onInput={handleInput}
                        name="password"
                        value={polje}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        id="broj_telefona_roditelja"
                        className="polje"
                        placeholder="Broj telefona(min 11 cifara)..."
                        onInput={handleInput}
                        name="broj_telefona"
                        value={polje}
                        autoComplete="off"
                    />
                    <h6>{porukaGreske}</h6>
                    <button
                        type="submit"
                        className="dugme"
                    >
                        KREIRAJ RODITELJA
                    </button>
                    <a id="dugme_mail" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new"
                        target="_blank">
                        POŠALJI MAIL</a>
                </div>

            </form>

        </div>
    );
};

export default KreirajRoditelja;
