import React from 'react';
import Meni from './Meni';
import Meni2 from './Meni2';
import Meni3 from './Meni3';
import st1 from '../Slike/st1.jpg';  
import st2 from '../Slike/st2.jpg';  
import st3 from '../Slike/st3.jpeg';  
import st4 from '../Slike/st4.jpg';  
import log from '../Slike/Logg.jpg';  
import Footer from './Footer';
const Nastim = () => {

    return(
        <div>
             {/* {
                window.localStorage.getItem("auth_token") == null && 
                window.localStorage.getItem("auth_token2") == null  
                ?
                <Meni/>
                :
                <Meni2/>
            }  */}
            <Meni/>
            <div className="nastim">

            <div className="nastim_onama">
                    <div className="h22">
                        <h3>O NAMA</h3>
                    </div>
                    
                    <p>
                        Kovačev logopedski centar je privatna dečija logopedsko - defektološka ordinacija 
                        koja je osnovana 2020. godine u Beogradu od strane Andree Kovačev, 
                        master logopeda. Naše postojanje jeste kratko, ali smo za kratko vreme stekli  
                        veliko znanje i iskustvo. Naš stručni tim logopeda svoje strplejnje, znanje i 
                        iskustvo implementira svakodnevno u radu sa decom. 
                        Naše dijagnostičke i terapijske procedure naučno su zasnovane i jasne. U našem Centru 
                        pružamo mogućnost dijagnostike govornih i jezičkih poremećaja poput disfazije ili specifičnog 
                        jezičkog poremećaja, disleksije, autizma, afazije, govorne apraksije kao i svih razvojnih 
                        kašnjenja primenom najsavremenijih svetski priznatih testova. Terapijske procedure koje 
                        primenjujemo zasnivaju se na jezičkim i kognitivno-bihejvioralnim aspektima.
                        <br></br>
                        <br></br>
                        Naše aktivnosti u prevencija, rana detekcija, dijagnostika i rehabilitacija dece koja poseduju neki 
                        govorno jezički poremećaj i/ili poremećaj ponašanja i učenja. Cilj našeg rada jeste da se 
                        deca osećaju sigurno i lepo kod nas i da rado dolaze na tretmane.  
                        Trudimo se da obezbedimo deci interaktivni i efikasan program tretmana kako bi 
                        dete uspelo na što lakši način da prevaziće svoj govorno jezički poremećaj, ostvari svoj
                        pun potencijal i tako svaku porodicu učinimo zadovoljnom i srećnom. Pored naših redovnih 
                        tretmana, deo našeg tima postajete i Vi kao roditelj, uz svu našu podršku. 
                        <br></br> 
                        <br></br>
                        Dijagnostičke postupke sprovodimo primenom standardizovanih logopedskih mernih instrumenata. 
                        Stalnim naučnim i stručnim usavršavanjem zaposlenih logopeda i kvalitetom usluga koje nudimo 
                        trudimo se da budemo primer dobre logopedske prakse u Republici Srbiji.
                        Nalazimo se na Voždovcu, u dobro opremeljenom prostoru, veselih boja u kome će se 
                        Vaše dete osećati srećno i lepo. 


                       
                    </p>
                </div>

                <div className="nastim_tekst">
                    <div className="h22">
                        <h3>NAŠ STRUČNI TIM LOGOPEDA</h3>
                    </div>
                    
                </div>

        {/* <section class="reveal"> */}

                <div className="logoped1">
                        <div className="log_slika">
                            <img className="log" src={log} alt="" />
                        </div>
                        <div className='log_tekst'>
                            <h3>Andrea Kovačev</h3>
                            <p>
                            Andrea Kovačev, rođena 14. septembra 1999. godinez. Godine 2021. je diplomirala 
                            na Visokoj školi socijalnog rada u Boegradu, na smeru Logopedija i dobila zvanje
                            Diplomiranog Logopeda. Iste godine upisuje master studije i uspešno ih završava 
                            2022. godine braneći master rad pod nazivom "Poremećaj glasa kod vokalnih profesionalaca".
                            Osnivač je i rukovodilac logopedskog centra Kovačev.                            
                            U centru primenjuje metodologiju bio-psiho-socijalnog, lingvističkog i bihejvioralnog pristupa u dijagnostici, 
                            terapiji i savetovanju roditelja dece.

                            </p>
                        </div>
                </div>
        {/*
        </section> */} 
        {/* <section class="reveal">  */}
                <div className="logopedi"> 
                    <div className="logoped">
                        <img className="log" src={st1} alt="" />
                        <h3>Ana Pešić</h3>
                        <p>
                        Diplomirala 2019.godine na Fakultetu za specijalnu edukaciju i rehabilitaciju 
                        Univerziteta u Beogradu na odseku za logopediju i dobila zvanje Defektolog-Logoped.
                        U toku studiranja volontirala je u humanitarnoj organizaciji "Dečije srce".
                        Od 2020.godine je deo stručnog tima "Kovačev Logopedskog centra" .
                        Nastavlja stručno usavršavanje kao polaznik Edukacije za Senzorno-integracijskog 
                        pedagoga.
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st2} alt="" />
                        <h3>Milica Jovanović</h3>
                        <p>
                        Diplomirala 2017. godine na Fakultetu za specijalnu edukaciju i rehabilitaciju 
                        Univerziteta u Beogradu na odseku za logopediju.
                        U periodu od 2017. do 2019. godine stažirala u Domu zdravlja 
                        "Zvezdara" "Razvojno savetovalište u službi za zdravstvenu zaštitu dece i školske dece". 
                        Od septembra 2019. do februara 2020. godine je pedagoški i personalni asistent u 
                        Osnovnoj školi "Montesori" u Beogradu.
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st3} alt="" />
                        <h3>Milica Mihailović</h3>
                        <p>
                        2017. godine upisala Fakultet za specijalnu i edukaciju i rehabilitaciju u Beogradu. 
                        Diplomirala na osnovnim akademskim studijama 2021. godine i tako stekla zvanje diplomiranog 
                        logopeda. Master studije upisala iste godine u oktobru. 
                        Od novembra 2022.godine pedagoški asistent u vrtiću i nižim razredima osnovne škole.
                        U "Kovačev Logopedskom Centru" radi od novembra 2022.godine.
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st4} alt="" /> 
                        <h3>Kristina Nešković</h3>
                        <p>
                        2020. godine diplomirala na Fakultetu za specijalnu edukaciju i rehabilitaciju 
                        sa zvanjem diplomirani defektolog-logoped. Od 2020. do 2021.
                        je volonterski radila na Institutu za eksperimentalnu fonetiku i patologiju govora 
                        "Đorđe Kostić", kao audiolingvista. Radila je na dijagnostici i tretmanu 
                        patologije verbalne komunikacije. 
                        Završila je edukaciju za primenu tretmana mucanja po Švarc metodi.  
                        </p>
                    </div>
                </div>

        {/* </section> */}

            </div> 
            <Footer/>
        </div>
    )
}

export default Nastim;