import React from 'react';
import Meni from './Meni';
import fist from '../Slike/fist.png';  
import fist2 from '../Slike/fist (1).png';  
import fist3 from '../Slike/fist (2).png'; 
import Footer from './Footer'; 

const Paketi = () => {
    return(
        <div>
            <Meni/>
            <div className="paketi_tekst">
                <h2>NAŠI PAKETI TRETMANA</h2>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum.
                    </p>
            </div>
            <div className="paketi">
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" /> */}
                    <h2>PAKET 1</h2>
                    <p className='paket_tretman'>4 tretmana</p>
                    <p className='paket_cena'>6.000 dinara</p>
                </div>
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" /> */}
                    <h2>PAKET 2</h2>
                    <p className='paket_tretman'>8 tretmana</p>
                    <p className='paket_cena'>12.000 dinara</p>
                </div>
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" />    */}
                    <h2>PAKET 3</h2>
                    <p className='paket_tretman'>12 tretmana</p>
                    <p className='paket_cena'>18.000 dinara</p>
                </div>
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" /> */}
                    <h2>PAKET 4</h2>
                    <p className='paket_tretman'>16 tretmana</p>
                    <p className='paket_cena'>24.000 dinara</p>
                </div>
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" /> */}
                    <h2>PAKET 5</h2>
                    <p className='paket_tretman'>20 tretmana</p>
                    <p className='paket_cena'>30.000 dinara</p>
                </div>
                <div className="paket">
                    {/* <img className="pslika" src={fist3} alt="" /> */}
                    <h2>PAKET 6</h2>
                    <p className='paket_tretman'>24 tretmana</p>
                    <p className='paket_cena'>36.000 dinara</p>
                </div>
            </div> 
            
            <Footer/>
        </div>
    )
}


export default Paketi;