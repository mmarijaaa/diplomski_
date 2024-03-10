import React from "react";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Meni from './Meni';
import username from '../Slike/username.png'; 
import password from '../Slike/password.png'; 
import roditelj from '../Slike/roditelj.png'; 
import logoped from '../Slike/logoped.png'; 
import axios from "axios";
import PocetnaRoditelj from  '../Roditelj/PocetnaRoditelj';
import PocetnaLogoped from  '../Logoped/PocetnaLogoped';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../stil.css';  
import Footer from './Footer';

const Prijava = ({addToken, addToken2}) => {

    //LOGOPED PRIJAVA

    const [logopedData, setLogopedData] = useState({
        korisnicko_ime:"",
        password:""
    });

    let navigate = useNavigate();

    function handleInput1(e) {
        //console.log(e);
        let newLogopedData = logopedData;
        newLogopedData[e.target.name] = e.target.value;
        setLogopedData(newLogopedData);
   }

   const [greskaKIme, setGreskaKIme] = useState();
   const [greskaPass, setGreskaPass] = useState();

   function handleLogin1(e) {
       e.preventDefault(); 
       axios
       .post("http://127.0.0.1:8000/api/login",   
       logopedData)
       .then((res)=> {
           console.log(res.data);  
           if(res.data.success === true) {
               window.sessionStorage.setItem("auth_token", res.data.access_token);
               window.sessionStorage.setItem("user_id", res.data.user_id);
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


    //RODITELJ PRIJAVA

    const [roditeljData, setRoditeljData] = useState({
        korisnicko_ime:"",
        password:""
    });

    // let navigate = useNavigate();

    function handleInput2(e) {
        let newRoditeljData = roditeljData;
        newRoditeljData[e.target.name] = e.target.value;
        setRoditeljData(newRoditeljData);
    }

    const [greskaKImeR, setGreskaKImeR] = useState();
    const [greskaPassR, setGreskaPassR] = useState();

    function handleLogin2(e) {
        e.preventDefault(); 
        axios
        .post("http://127.0.0.1:8000/api/loginroditelj",   
        roditeljData)
        .then((res2)=> {
            console.log(res2.data);  
            if(res2.data.success === true) {
                window.sessionStorage.setItem("auth_token2", res2.data.access_token);
                window.sessionStorage.setItem("roditelj_user_id", res2.data.roditelj_user_id);
                window.localStorage.setItem("auth_token2", res2.data.access_token);
                window.localStorage.setItem("roditelj_user_id", res2.data.roditelj_user_id); 
                addToken2(res2.data.access_token);
                navigate("/roditelj");
            }
            else {
                console.log("greska");
                console.log(res2.data.korisnicko_ime);
                console.log(res2.data.password);
                setGreskaKImeR(res2.data.korisnicko_ime);
                setGreskaPassR(res2.data.password); 
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
             
        <div className="prijava">
           <Meni/> 

           <div className="forme"> 

            <div className="pl">

                        <div className="prijava_forma">

                        <div className="prijava_icon_logoped">
                            <img className="prij" src={logoped} alt="" />
                        </div>
                        
                
                        <form onSubmit={handleLogin1}>
                        <div className="login_formaL">

                        <p>PRIJAVA LOGOPEDA</p>

                        <div className="prijava_kime">
                            <img className="prij" src={username} alt="" />
                            <input type="text"
                            id="korisnicko_ime_logoped"
                            className="polje"
                            placeholder="Unesite Vaše korisničko ime..."
                            onInput={handleInput1}
                            name="korisnicko_ime"
                            spellcheck="false"/>
                        </div>
                            <h6>{greskaKIme}</h6>

                        <div className="prijava_pw">
                            <img className="prij" src={password} alt="" />
                            <input type="password"
                            id="lozinka_logoped"
                            className="polje"
                            placeholder="Unesite Vašu lozinku..."
                            onInput={handleInput1}
                            name="password"
                            spellcheck="false"/>
                        </div>

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
            </div>

            <div className="pr">

                    <div className="prijava_forma">
                
                    <div className="prijava_icon_roditelj">
                            <img className="prij" src={roditelj} alt="" />
                    </div>

                    <form onSubmit={handleLogin2}>
                    <div className="login_formaR">

                        <p>PRIJAVA RODITELJA</p>

                        <div className="prijava_kime">
                            <img className="prij" src={username} alt="" />
                            <input type="text"
                            id="korisnicko_ime_roditelj"
                            className="polje"
                            placeholder="Unesite Vaše korisničko ime..."
                            onInput={handleInput2}
                            name="korisnicko_ime"/>
                        </div>

                        <h6>{greskaKImeR}</h6>

                        <div className="prijava_pw">
                            <img className="prij" src={password} alt="" />
                            <input type="password"
                            id="lozinka_roditelj"
                            className="polje"
                            placeholder="Unesite Vašu lozinku..."
                            onInput={handleInput2}
                            name="password"/>
                        </div>

                        <h6>{greskaPassR}</h6>

                        <button
                        type="submit"
                        className="dugme"
                        >
                        PRIJAVA
                        </button>
                    </div>
                    </form>
                    </div>
            </div>

            </div>

        <Footer/>
        </div>
        
    )
}

export default Prijava;