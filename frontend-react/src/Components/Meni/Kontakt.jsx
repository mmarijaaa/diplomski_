import React from 'react';
import Meni from './Meni';
import Footer from './Footer';
import adresa from '../Slike/addr.png'; 
import info from '../Slike/info.png'; 
import vreme from '../Slike/clock.png'; 

const Kontakt = () => {
    return(
        <div>
            <Meni/>

            <div className="kontaktt">
                <div className="h22">
                    <h3>KONTAKTIRAJTE NAS</h3>
                </div>

                <div className="kontakt_delovi">
                    
                    <div className="kontakt">
                        <div className='kontakt_icon1'><img className="kont" src={adresa} alt="" /></div>
                        
                        <div className="kontakt_txt"><p>ADRESA</p>
                            Jove Ilića 154<br></br>
                            Voždovac<br></br>
                            11000 Beograd<br></br>
                            Srbija
                        </div>
                    </div>
                    <div className="kontakt">
                        <div className='kontakt_icon2'><img className="kont" src={info} alt="" /></div>
                        
                        <div className="kontakt_txt"><p>INFORMACIJE</p>
                            Tel: 011/1111-000<br></br>
                            Email: kovacev@gmail.com<br></br>
                            Instagram: lc_kovacev<br></br>
                            Facebook: LC Kovacev
                        </div>
                    </div>
                    <div className="kontakt">
                        <div className='kontakt_icon3'><img className="kont" src={vreme} alt="" /></div>
                        
                        <div className="kontakt_txt"><p>RADNO VREME</p>
                            Ponedeljak-Petak<br></br>
                            12h-21h<br></br>
                            Subota-Nedelja<br></br>
                            Neradne
                        </div>
                    </div>    

                </div>

                <div className="kontakt_mapa">
                    <iframe id="mapa_slika"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.397016738454!2d20.475035100000003!3d44.7727108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a705762332ab5%3A0x422a527f1ff25cac!2z0IjQvtCy0LUg0JjQu9C40ZvQsCAxNTQsINCR0LXQvtCz0YDQsNC0IDExMDAw!5e0!3m2!1ssr!2srs!4v1687104658891!5m2!1ssr!2srs" ></iframe>
                </div>
               
            </div>

            <Footer/> 
        </div>
    )
}

export default Kontakt;