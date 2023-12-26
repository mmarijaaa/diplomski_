import React from 'react';
import axios from "axios";
import PocetnaRoditelj from  './PocetnaRoditelj';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../stil.css'; 

const LoginRoditelj = ({addToken2}) => {

    const [roditeljData, setRoditeljData] = useState({
        korisnicko_ime:"",
        password:""
    });

    let navigate = useNavigate();

    function handleInput(e) {
        let newRoditeljData = roditeljData;
        newRoditeljData[e.target.name] = e.target.value;
        setRoditeljData(newRoditeljData);
    }

    const [greskaKIme, setGreskaKIme] = useState();
    const [greskaPass, setGreskaPass] = useState();

    function handleLogin(e) {
        e.preventDefault(); 
        axios
        .post("http://127.0.0.1:8000/api/loginroditelj",   
        roditeljData)
        .then((res2)=> {
            console.log(res2.data);  
            if(res2.data.success === true) {
                window.sessionStorage.setItem("auth_token2", res2.data.access_token);
                window.sessionStorage.setItem("roditelj_user_id", res2.data.roditelj_user_id);
                addToken2(res2.data.access_token);
                navigate("/roditelj");
            }
            else {
                console.log("greska");
                console.log(res2.data.korisnicko_ime);
               console.log(res2.data.password);
               setGreskaKIme(res2.data.korisnicko_ime);
               setGreskaPass(res2.data.password); 
                /*Swal.fire({
                    icon: 'error',
                    text: 'Niste uneli ispravne podatke!'
                  })*/
            }
        })
        .catch((e)=> {
            console.log(e);
        });
    }

return (
    <div className="forma">

        <form onSubmit={handleLogin}>
        <div className="login_formaR">
            {/* <h1>RODITELJ</h1>
            <p>Korisnicko ime: </p> */}

            <input type="text"
            id="korisnicko_ime_roditelj"
            className="polje"
            placeholder="Unesite Vase korisnicko ime..."
            onInput={handleInput}
            name="korisnicko_ime"/>

            <h6>{greskaKIme}</h6>

            {/* <p>Lozinka: </p> */}

            <input type="password"
            id="lozinka_roditelj"
            className="polje"
            placeholder="Unesite Vasu lozinku..."
            onInput={handleInput}
            name="password"/>

            <h6>{greskaPass}</h6>

            <button
            type="submit"
            className="dugme"
            >
            PRIJAVITE SE
            </button>
        </div>
        </form>
    </div>
);

};

export default LoginRoditelj; 