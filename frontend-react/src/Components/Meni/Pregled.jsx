import React from "react";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Meni from './Meni';
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../stil.css';  
import Footer from './Footer';
import kalendar from '../Slike/schedule.png'; 

const Pregled = () => {

    return (
        <div className="pregled"> 
        <Meni/> 
            <div className="pre">
            <div className="pr_forma">

                <div className="pregled_icon">
                    <img className="preg" src={kalendar} alt="" />
                </div>
                    
                <form>
                <div className="pregled_forma">

                    <p>ZAKAŽITE PRVI PREGLED ZA VAŠE DETE</p>

                <div className="pregled_roditelj">
                    <input type="text"
                    id="ime_prezime_roditelj"
                    className="polje"
                    placeholder="Unesite Vaše ime i prezime..."
                    // onInput={handleInput1}
                    name="ime_prezime"/>
                </div>
                <div className="pregled_datum">
                    <input 
                    type="date"
                    id="datum_pregleda"
                    className="polje"
                    placeholder="Izaberite datum..."
                    // onInput={handleInput}
                    name="datum_pregleda"
                    />
                </div>
                <div className="pregled_vreme">
                    <select name="vreme_pregleda" id="vreme_pregleda">
                        <option value="12h">12h</option>
                        <option value="13h">13h</option>
                        <option value="14h">14h</option>
                        <option value="15h">15h</option>
                        <option value="16h">16h</option>
                        <option value="17h">17h</option>
                        <option value="18h">18h</option>
                        <option value="19h">19h</option>
                        <option value="20h">20h</option> 
                    </select>
                </div>
                <button
                    type="submit"
                    className="dugme"
                    >
                    ZAKAŽITE
                    </button> 
                </div>
                </form>
            </div>

            </div>
        <Footer/>
        </div>
    )
}

export default Pregled;