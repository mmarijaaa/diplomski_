import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../stil.css';
import meni from '../Slike/menu.png';
import close from '../Slike/close.png';
import logo from '../Slike/lg1.png';
import ver1 from '../Slike/ver1.png';
import ver2 from '../Slike/ver2.png';
import ver3 from '../Slike/ver3.png';
import { useState } from 'react';

const Meni2 = () => {

    return (

        <div className="ceomeni">
            <div className="meni">

                <div className="meni_logo">
                    <a href="/"><img className="logo" src={ver1} alt="" /></a>
                </div>

                <input type="checkbox" id="check" />
                <label htmlFor="check" className="meni_ikonica">
                    <img className="ikonica_menu" src={meni} alt="" />
                    <img className="ikonica_close" src={close} alt="" />
                </label>

                <div className="meni_linkovi">
                    <div className="meni_linkovi1">
                        <Link to="/" className="link">POČETNA</Link>
                        <Link to="/nastim" className="link">O NAMA</Link>
                        <Link to="/usluge" className="link">USLUGE</Link>
                        <Link to="/kontakt" className="link">KONTAKT</Link>
                    </div>
                    <div className="meni_linkovi2">
                       
                            <Link to="/logoped" className="link_prijava">PROFIL</Link>

                       
                        
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Meni2;