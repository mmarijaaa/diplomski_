import React from "react";
import { Link } from "react-router-dom";
import '../stil.css'; 
import logo from '../Slike/logof.png';

const Footer = () => {
    return (
        <div className="foo">
        <div className="footer">

            <div className="flogo">
                <img id='logoF' src={logo} alt="" />
            </div>

            <div className="flinkovi">
                <Link to="/" className="linkF">POČETNA</Link>
                <Link to="/nastim" className="linkF">O NAMA</Link>
                <Link to="/usluge" className="linkF">USLUGE</Link>
                <Link to="/kontakt" className="linkF">KONTAKT</Link> 
            </div>

            <div className="finfo">
                <div><b>TELEFON:</b>  011/1111-000<br></br></div>
                <div><b>EMAIL:</b>  kovacev@gmail.com<br></br></div>
                <div><b>INSTARGRAM:</b>  lc_kovacev<br></br></div>
                <div><b>FACEBOOK:</b>  LC Kovacev </div>
            </div>
           
        </div>
            <div className="copyright">
                Copyrights © 2024 Marija®. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;