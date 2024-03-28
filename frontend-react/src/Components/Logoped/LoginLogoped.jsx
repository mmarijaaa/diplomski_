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
               window.localStorage.setItem("auth_token", res.data.access_token);
               window.localStorage.setItem("user_id", res.data.user_id);
               addToken(res.data.access_token);
               navigate("/logoped");   
           }
           else {
               console.log("greska");
               console.log(res.data.korisnicko_ime);
               console.log(res.data.password);
               setGreskaKIme(res.data.korisnicko_ime);
               setGreskaPass(res.data.password);
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

            <input type="text"
            id="korisnicko_ime_logoped"
            className="polje"
            placeholder="Unesite Vaše korisničko ime..."
            onInput={handleInput}
            name="korisnicko_ime"/>

            <h6>{greskaKIme}</h6>

            <input type="password"
            id="lozinka_logoped"
            className="polje"
            placeholder="Unesite Vašu lozinku..."
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