import React from "react";
import { Link } from "react-router-dom";
import '../stil.css'; 
import instagram from '../Slike/instagram.png'; 
import facebook from '../Slike/facebook.png'; 
import ear from '../Slike/ear.png';
import logo from '../Slike/lg1F.png';

const Footer = () => {
    return (
        <div className="foo">
        <div className="footer">
            {/* <div className="deo12">
                    <div className="deo1">
                        <img id='logoF' src={logo} alt="" />
                        <div className="social">
                            <img src={instagram} alt="" />
                            <img src={facebook} alt="" />
                        </div>
                    </div>
                    <div className="deo2">
                        <Link to="/" className="linkF">POČETNA</Link>
                        <Link to="/nastim" className="linkF">O NAMA</Link>
                        <Link to="/usluge" className="linkF">USLUGE</Link>
                        
                        <Link to="/kontakt" className="linkF">KONTAKT</Link> 
                        
                    </div>
            </div> */}
            
            {/* <div className="deo3">
            <form className="deo3">
              <input type="email" name="user_email" placeholder='Unesite Vaš email' id="email"/>
              <textarea name="message" placeholder='Unesite poruku' id="poruka"/>
              <input className='btn' type="submit" value="POŠALJITE" id="dugme"/>
            </form>

            </div> */}


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
                <div><b>TEL:</b>  011/1111-000<br></br></div>
                <div><b>EMAIL:</b>  kovacev@gmail.com<br></br></div>
                <div><b>INSTARGRAM:</b>  lc_kovacev<br></br></div>
                <div><b>FACEBOOK:</b>  LC Kovacev </div>
            </div>
           
        </div>
            <div className="copyright">
                Copyrights © 2023 Marija®. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;