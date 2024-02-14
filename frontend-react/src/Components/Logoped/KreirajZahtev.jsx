import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const KreirajZahtev = ({}) => {

    const [logopedi, setLogopedi] = useState();

    const [zahtevData, setZahtevData] = useState({
        tip_zahteva:"",
        odobren:"",
        pregledan:"",
        id_logopeda_kreira:"",
        id_logopeda_prima:"",
        id_pacijenta:"",
        id_roditelja:"",
        info_pacijent:"",
        info_roditelja:"", 
    });

    function handleInput(e) {
        let newZahtevData = zahtevData;
        newZahtevData[e.target.name] = e.target.value;
        setZahtevData(newZahtevData);
    }

    var id_logopeda_kreira = window.sessionStorage.getItem("user_id"); 
    var id_logopeda_prima;

    function idRod(e) {
        handleInput(e); 
        id_logopeda_prima = e.target.value;
        console.log(e.target.value); 
    }
    function handleKreirajZahtev(e) {
        e.preventDefault();
        console.log("kreiraj zahtev");
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreirajZahtev/' + id_logopeda_kreira + '/' +  id_logopeda_prima + '/' + 0 + '/' + 0,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            },
            data : zahtevData
          };
          
          axios.request(config)
          .then((response) => {
            //console.log(JSON.stringify(response.data));
            if(response.data.success == true && id_logopeda_prima != id_logopeda_kreira) {
                    setZahtevData(response.data);
                    Swal.fire({
                        title: 'Uspesno poslat zahtev!',
                        showConfirmButton: true,
                    }) .then(function(){
                        window.location.reload();
                        });
            }  else {
                Swal.fire({
                    icon: "error",
                    title: 'Greska!', 
                }); 
            }  
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: 'Greska! ', 
            }); 
          });
          
    }

    useEffect(() => {
        if(logopedi == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/sviLogopedi',
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            },
            data : logopedi,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data['data']));
            console.log("Lista logopeda prikazana");
            setLogopedi(response.data['data']); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista logopeda NIJE prikazana");
        });
        }
    }, []);  

    const [polje, setPolje] = useState();

    return (
        <div className="log_forma">

            <form onSubmit={handleKreirajZahtev}>

            <div className="kreiraj_forma">

                <p>KREIRANJE ZAHTEVA<br></br>
                ZA NOVOG PACIJENTA</p> 

                        {/* <input 
                            type="text"
                            id="tip_zahteva"
                            className="polje1"
                            // onInput={handleInput}
                            name="tip_zahteva"
                            value="Zahtev za novog pacijenta"
                            spellcheck="false"
                        /> */}
                    <textarea 
                        type="text"
                        id="info_pacijenta"
                        className="polje1"
                        placeholder="Unesite info pacijenta..."
                        onInput={handleInput}
                        name="info_pacijenta"
                        value={polje}
                        spellcheck="false"
                    />
                    <textarea 
                        type="text"
                        id="info_roditelja"
                        className="polje1"
                        placeholder="Unesite info roditelja..."
                        onInput={handleInput}
                        name="info_roditelja"
                        value={polje}
                        spellcheck="false"
                    />
                    <select name="id_logopeda_prima" id="id_logopeda_prima" onChange={idRod} defaultValue={"placeholder"}> 
                        <option value={"placeholder"}>Izaberi logopeda</option>
                        {logopedi == null
                            ? (<></>)
                            :
                        (logopedi.map(({id, ime, prezime, korisnicko_ime, email, email_verified_at, password, sifra_logopeda, remember_token, created_at, updated_at} )=> <option value={id} >{ime} {prezime}</option>))}
                    </select>
                    <button
                        type="submit"
                        className="dugme1"
                    >
                    KREIRAJ ZAHTEV
                    </button> 

            </div>
            </form>

        </div>
    )
}

export default KreirajZahtev;