import React from 'react';
import axios from "axios";
import PocetnaLogoped from  './PocetnaLogoped';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../stil.css'; 

const LoginLogoped = ({addToken}) => {

    const [logopedData, setLogopedData] = useState({
        korisnicko_ime:"",
        password:""
    });

    let navigate = useNavigate();

    function handleInput(e) {
        //console.log(e);
        let newLogopedData = logopedData;
        newLogopedData[e.target.name] = e.target.value;
        setLogopedData(newLogopedData);
   }

   const [greskaKIme, setGreskaKIme] = useState();
   const [greskaPass, setGreskaPass] = useState();

   function handleLogin(e) {
       e.preventDefault(); 
       axios
       .post("http://127.0.0.1:8000/api/login",   
       logopedData)
       .then((res)=> {
           console.log(res.data);  
           if(res.data.success === true) {
               window.sessionStorage.setItem("auth_token", res.data.access_token);
               window.sessionStorage.setItem("user_id", res.data.user_id);
               addToken(res.data.access_token);
               navigate("/logoped"); 
           }
           else {
               console.log("greska");
               console.log(res.data.korisnicko_ime);
               console.log(res.data.password);
               setGreskaKIme(res.data.korisnicko_ime);
               setGreskaPass(res.data.password);
            
               /*Swal.fire({
                   icon: 'error',
                   text: 'Niste uneli ispravne podatke!'
                 })*/
           }
       })
       .catch((e)=> {
           
           console.log(e.response.error);
         
       });
   }

return (
    <div className="forma">

        <form onSubmit={handleLogin}>
        <div className="login_formaL">
            {/* <h1>LOGOPED</h1> */}
            {/* <p>Korisnicko ime: </p> */}

            <input type="text"
            id="korisnicko_ime_logoped"
            className="polje"
            placeholder="Unesite Vase korisnicko ime..."
            onInput={handleInput}
            name="korisnicko_ime"/>

            <h6>{greskaKIme}</h6>

            {/* <p>Lozinka: </p> */}

            <input type="password"
            id="lozinka_logoped"
            className="polje"
            placeholder="Unesite Vasu lozinku..."
            onInput={handleInput}
            name="password"/>

            <h6>{greskaPass}</h6>       
            <button
            type="submit"
            className="dugme"
            >
            PRIJAVA
            </button>
        </div>
        </form>
    </div>
);

};

export default LoginLogoped;