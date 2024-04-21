import React from 'react';
import Meni from './Meni';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios'; 
import p1 from '../Slike/p1.jpg';
import p2 from '../Slike/p3.jpg';     
import p6 from '../Slike/l3.jpg';  
import p7 from '../Slike/l4.jpeg';   
import brain from '../Slike/brain.png';
import ear from '../Slike/ear.png';
import mouth from '../Slike/mouth.png';
import teeth from '../Slike/teeth.png';
import p10 from '../Slike/p2.jpg';
import p11 from '../Slike/p4.jpg';
import forbrain from '../Slike/forbrain.png';
import logset from '../Slike/logset.png';
import sonde from '../Slike/sonde.png';
import vib from '../Slike/vibrofon.png';
import down from '../Slike/down.png';
import up from '../Slike/up.png';
import poc15 from '../Slike/poc15.jpg';  
import Footer from './Footer';
// import autoAnimate from '@formkit/auto-animate'

const Pocetna = () => {

    const[icon1, setIcon1] = useState(false);
    const[icon2, setIcon2] = useState(false);
    const[icon3, setIcon3] = useState(false);
    const[icon4, setIcon4] = useState(false);
    const[icon5, setIcon5] = useState(false);

    //MODALI - POSTAVLJENA PITANJA
    const[modal1, setModal1] = useState(false);
    function toggleModal1() {
      setModal1(!modal1);
      setIcon1(!icon1);
    }
    if(modal1) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal2, setModal2] = useState(false);
    function toggleModal2() {
      setModal2(!modal2);
      setIcon2(!icon2);
    }
    if(modal2) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal3, setModal3] = useState(false);
    function toggleModal3() {
      setModal3(!modal3);
      setIcon3(!icon3);
    }
    if(modal3) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal4, setModal4] = useState(false);
    function toggleModal4() {
      setModal4(!modal4);
      setIcon4(!icon4);
    }
    if(modal4) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal5, setModal5] = useState(false);
    function toggleModal5() {
      setModal5(!modal5);
      setIcon5(!icon5);
    }
    if(modal5) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    //ANIMATION ON SCROLL
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
      
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 10;
      
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      }
      
      window.addEventListener("scroll", reveal);

    return(
        <div>
            <Meni/>

        {/* <section class="reveal">  */}

            <div className="pocetna1">

                <div className="poc1_deo1">
                    <div className="poc1_slika">
                        <img id="poc1" src={poc15} alt="" />
                    </div>
                </div> 

                <div className="poc1_deo2">
                    <div className="poc1_tekst">
                        <div className="txt1"> 
                            DOBRO DOŠLI <br></br> 
                            U <b>KOVAČEV</b> <br></br>  
                            LOGOPEDSKI <br></br>CENTAR 
                        </div>
                        <div className="txt2">
                            Napravili ste prvi korak u rešavanju problema. <br></br>
                            Sa nama ste u sigurnim rukama.
                        </div>
                        <div className="txt3">
                            <a href='/kontakt'>KONTAKTIRAJTE NAS</a>  
                        </div>

                    </div>
                </div>
            </div>

        {/* </section> */}

        <section class="reveal">

            <div className="pocetna11">
                <div className="h22">
                    <h2>ŠTA MI RADIMO?</h2>
                </div>
                <div className="pocetna11_tekst">
                <p>U našem centru veliku pažnju posvećujemo prevenciji govorno- jezičkih poremećaj, 
                rehabilitaciji već nastalih smetnji, kao i ranoj stimulaciji govorno- jezičkog razvoja 
                dece kroz igru i savetodavni rad sa roditeljima.
                Individualni logopedski tretman zauzima centralno mesto u logopedskom radu. 
                Od njegovog kvaliteta, kao i od saradnje sa roditeljima zavisi brzina i napredak deteta.
                Nije važno koliko sporo dete uči, sve dok ga podstičemo da ne prestaje.
                </p>
                </div>
                <h3 id="p11_saz">Saznajte više o nama i našem stručnom timu</h3>
                <div className="pocetna11_dugme">
                    <a href="/nastim" id="p11_onama">O NAMA</a>
                </div>
            </div>

        </section>

        <section class="reveal">

            <div id="pocetna2">
                <div className="deo">
                    <img className="slika2" src={p7} alt="" />
                </div>
                <div className="tekst2">
                    <h3>KO JE LOGOPED?</h3>
                    <p>Logoped je stručnjak koji ima ulogu u proceni jezika i govora, 
                        dijagnostikuje govorno jezičke poremećaje, sprovodi intervenciju,
                        kao i logopedski tretman u kome se vrši otklanjanje poremećaja govora,
                        jezika i glasa. On procenjuje artikulaciju kao i govorne organe 
                        koji učestvuju u govoru kao što su disanje, mišiće usana, lica i jezik, 
                        kao i celokupnu anatomiju govornog aparata. Logoped svojom stručnošću vrši 
                        edukaciju i savetodavni rad sa porodicom.   
                    </p>
                </div>
            </div>

        </section>

        <section class="reveal">

            <div className="pocetna3">
                <div className="deo1">
                    <div className="deo11">
                        <div className="deo111">
                            <img className="slika" src={p1} alt="" /> 
                        </div>
                        <div className="deo222">
                            <img className="icon" src={brain} alt="" />
                        </div>
                    </div>
                    <div className="deo11">
                        <div className="deo222">
                            <img className="icon" src={mouth} alt="" />
                        </div>
                        <div className="deo111">
                            <img className="slika" src={p2} alt="" />   
                        </div>
                    </div>
                </div>
                <div className="deo2">
                    <p>Naš logopedski centar sprovodi tretmane u cilju što efikasnijeg i 
                        bržeg otklanjanja poteškoća sa kojima se Vaše dete svakodnevno susreće
                    </p>
                    <h3>Pogledajte ponudu naših usluga i paketa</h3>
                    <a href='/usluge'>
                        USLUGE
                    </a>
                </div>
                <div className="deo1">
                    <div className="deo11">
                        <div className="deo222">
                            <img className="icon" src={ear} alt="" />
                        </div>
                        <div className="deo111">
                            <img className="slika" src={p11} alt="" />              
                        </div>
                    </div>
                    <div className="deo11">
                        <div className="deo111">
                            <img className="slika" src={p10} alt="" /> 
                        </div>
                        <div className="deo222">
                            <img className="icon" src={teeth} alt="" />   
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section class="reveal">

            <div className="pocetna4">
                <div className="tekst2">
                    <h3>KADA JE POTREBNO JAVITI SE LOGOPEDU?</h3>
                    <p>Ukoliko dete: <br></br>
                        - Kasni sa progovaranjem<br></br>
                        - Nepravilno izgovara glasove ili je govor nerazumljiv okolini<br></br>
                        - Ne razume govor i nepravilno upotrebljava reči<br></br>
                        - Kasni sa govorno-jezičkim razvojem<br></br>
                        - Poseduje oskudan fond reči<br></br>
                        - Ima problem sa mucanjem<br></br>
                        - Ima potrebu za pripremnim predškolskim programom<br></br>
                        - Otežano savladava školsko gradivo<br></br>
                        - Ima teškoće u čitanju i pisanju<br></br>
                    </p>
                </div>
                <div className="deo">
                    <img className="slika2" src={p6} alt="" />  
                </div>
            </div>

        </section>

        <section class="reveal">

            <div className="pocetna5">
                <div className="h33">
                    <h3>LOGOPEDSKI INSTRUMENTI</h3>
                </div>
                
                <div className="alat">

                    <div className="a1">
                    <div className="alatka">
                        <div className="alat_slika">
                            <img className="aslika" src={vib} alt="" /> 
                        </div>
                        <div className='alat_naziv'>VIBROFON</div>
                        <div className="alat_tekst">
                            Predstavlja ključan logopedski instrument koji se koristi u tretmanima
                            artikulacionih poremećaja. 
                        </div>
                    </div>
                    <div className="alatka">
                        <div className="alat_slika">
                            <img className="aslika" src={forbrain} alt="" /> 
                        </div>
                        <div className='alat_naziv'>FORBRAIN APARAT</div>
                        <div className="alat_tekst">
                            Uređaj sa elektronsko-dinamičkim filterom koji koristi vibracije visoke 
                            frekvencije koje korisniku pomažu da stvori i obradi zvuk.
                        </div>
                    </div>
                    </div>
                    <div className="a2">
                    <div className="alatka">
                        <div className="alat_slika">
                            <img className="aslika" src={sonde} alt="" /> 
                        </div>
                        <div className='alat_naziv'>LOGOPEDSKE SONDE</div>
                        <div className="alat_tekst">
                            Logopedske sonde su tanke nerđajuđe hromirane žice određenog oblika koje olakšavaju
                            korekciju izgovora glasova.  
                        </div>
                    </div>
                    <div className="alatka">
                        <div className="alat_slika">
                            <img className="aslika" src={logset} alt="" /> 
                        </div> 
                        <div className='alat_naziv'>DIGITALNI LOGOPEDSKI SET</div>
                        <div className="alat_tekst">
                            Predstavlja set za brzu i preciznu obradu zvučnog signala istog kvaliteta i brzine
                            kao i ljudski mozak.
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
        </section>

        

            <div className="pocetna6">
                <div className="galerija">

                </div>
            </div>
            
        <section class="reveal">

            <div className="pocetna7">
                <div className="h33">
                      <h3>NAJČEŠĆE POSTAVLJENA PITANJA</h3>
                </div>
              
                <div className="pitanja">
                    <div className="pitanje">
                        <div className="pitanje_tekst">
                            <div className="pit">Sa koliko godina bi dete trebalo da pravilno izgovara glasove?</div>
                            <button className="pit_icon" onClick={toggleModal1}> 
                                {icon1 ? 
                                (<img className="picon" src={up} alt=""/>) 
                                : 
                                (<img className="picon" src={down} alt=""/>)
                                }
                                
                            </button>
                        </div>
                        <div className="pitanje_modal">
                            {modal1 && (
                            <div className='modalP'>
                            <div className='overlayP' onClick={toggleModal1}></div>
                            <div className='contentP'>
                            Svako dete je individua za sebe pa tako i postoje individualne razlike u brzini usvajanja određenih glasova. 
                            Dajemo vam okvirne norme i napomenu da neka deca pre ovladaju određenim glasovima. <br></br>
                            - deca do 3 godine treba da pravilno izgovaraju: A,E,I,O,U,P,B,T,D,K,G,M,N. <br></br>
                            - deca od 3-4 godine treba da pravilno izgovaraju: J,F,V,H,L,S,Z,C,NJ. <br></br>
                            - deca od 4-5 godina treba da pravilno izgovaraju: R,LJ,Š,Ž,Č,Ć,Đ,DŽ. <br></br>
                            Potrebno je razlikovati normalno tepanje od patološkog, kada je potrebno što pre potražiti pomoć logopeda. 
                            Dete sa 5,5 godina treba pravilno da izgovara sve glasove. 
                            </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="pitanje">
                        <div className="pitanje_tekst">
                            <div className="pit">Kako roditelji mogu da utiču na govorni razvoj svog deteta?</div>
                            <button className="pit_icon" onClick={toggleModal2}>
                                {icon2 ? 
                                (<img className="picon" src={up} alt=""/>) 
                                : 
                                (<img className="picon" src={down} alt=""/>)
                                }
                            </button>
                        </div>
                        <div className="pitanje_modal">
                            {modal2 && (
                            <div className='modalP'>
                            <div className='overlayP' onClick={toggleModal2}></div>
                            <div className='contentP'>
                                Roditelji u značajnoj meri mogu povoljno da utiču na govorni razvoj svog deteta tako što će 
                                mu obezbediti optimalne uslove za razvoj govora koji podrazumevaju: <br></br>
                                - skladne odnose između deteta i njegove okoline  <br></br>
                                - dobre govorne modele  <br></br>
                                - mogućnost za sticanje što celovitijeg iskustva o svetu u kome dete živi
                            </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="pitanje">
                        <div className="pitanje_tekst"> 
                            <div className="pit">Kada je potrebno tražiti savet od logopeda?</div>
                            <button className="pit_icon" onClick={toggleModal3}>
                                {icon3 ? 
                                (<img className="picon" src={up} alt=""/>) 
                                : 
                                (<img className="picon" src={down} alt=""/>)
                                }
                            </button>                        
                        </div>
                        <div className="pitanje_modal">
                            {modal3 && (
                            <div className='modalP'>
                            <div className='overlayP' onClick={toggleModal3}></div>
                            <div className='contentP'>
                            Savet logopeda potražiti kad: <br></br>
                            - ako dete nema reči sa 18 meseci, ako mu se govor sporo i nepravilno razvija <br></br>
                            - ako primetite da je posle progovaranja došlo do zastoja ili su se izgubile već stečene govorne sposobnosti <br></br>
                            - ako nepravilno izgovara ili uopšte ne izgovara neke od glasova za odgovarajući uzrast, ako mu je govor slabije razumljiv ili nerazumljiv za okolinu.. <br></br>
                            - ako mu se pri govoru javljaju grčevi, poremećaj disanja, zastajkivanje, ponavljanje početnog glasa, sloga ili čitave reči… <br></br>
                            - ako mu je govor ubrzan i time narušeno razumevanje ili preterano spor… <br></br>
                            - ako ima izvesne poteškoće na planu čitanja i pisanja…
                            </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="pitanje">
                        <div className="pitanje_tekst">
                            <div className="pit">Kada bi trebalo početi sa čitanjem detetu?</div>
                            <button className="pit_icon" onClick={toggleModal4}>
                                {icon4 ? 
                                (<img className="picon" src={up} alt=""/>) 
                                : 
                                (<img className="picon" src={down} alt=""/>)
                                }
                            </button>                        </div>
                        <div className="pitanje_modal">
                            {modal4 && (
                            <div className='modalP'>
                            <div className='overlayP' onClick={toggleModal4}></div>
                            <div className='contentP'>
                                Čitanje je veoma korisno i bitno za jezički razvoj deteta ali pozitivno utiče i na celokupan razvoj. 
                                To je najbolja i najlepša aktivnost koju ne smete da propustite u svom roditeljstvu. 
                                Savet je da se počne što ranije, može već u toku druge godine ali sa jednostavnim slikovnicama. 
                                Takođe mogu i neke po izboru deteta koje možete prilagoditi tako što ćete 
                                skratiti tekst samo na osnovni sadržaj koji dete vidi na slici. 
                                Preporuka je svaki dan 15 minuta  čitanja. 
                            </div>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="pitanje">
                        <div className="pitanje_tekst">
                            <div className="pit">Kada bi trebalo da dete krene sa izgovaranjem prvih reči?</div>
                            <button className="pit_icon" onClick={toggleModal5}>
                                {icon5 ? 
                                (<img className="picon" src={up} alt=""/>) 
                                : 
                                (<img className="picon" src={down} alt=""/>)
                                }
                            </button>                        </div>
                        <div className="pitanje_modal">
                            {modal5 && (
                            <div className='modalP'>
                            <div className='overlayP' onClick={toggleModal5}></div>
                            <div className='contentP'>
                                Prva reč se javlja u uzrastu od oko godinu dana, ali to je sve individualno, 
                                može da se javi i ranije i kasnije…. Važno je naglasiti da ponavljanje slogova 
                                (ma-ma, da-da, ba-ba) koje se javlja kod dece od 7-8 meseci, ne predstavlja reči, 
                                već brbljanje, uvežbavanje govornog aparata kroz ponavljanje glasova. 
                                Prve reči su one čije značenje dete zna (kada kaže mama i zna na koga se to odnosi). 
                                Ukoliko je kašnjenje duže od par meseci potrebno je obratiti se logopedu kako bi 
                                se utvrdio razlog kašnjenja.
                            </div>
                            </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </section>

            <Footer/>
        </div>
        
    )
}

export default Pocetna