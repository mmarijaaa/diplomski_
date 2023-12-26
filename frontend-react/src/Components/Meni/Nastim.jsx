import React from 'react';
import Meni from './Meni';
import st1 from '../Slike/st1.jpg';  
import st2 from '../Slike/st2.jpg';  
import st3 from '../Slike/st3.jpeg';  
import st4 from '../Slike/st4.jpg';  
import st from '../Slike/st.jpg';  
import Footer from './Footer';
const Nastim = () => {
    return(
        <div>
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
                            <img className="log" src={st} alt="" />
                        </div>
                        <div className='log_tekst'>
                            <h3>Andrea Kovačev</h3>
                            <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.Excepteur sint 
                            occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum."
                            </p>
                        </div>
                </div>
        {/*
        </section> */} 
        {/* <section class="reveal">  */}
                <div className="logopedi"> 
                    <div className="logoped">
                        <img className="log" src={st1} alt="" />
                        <h3>Aleksandra Milović</h3>
                        <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st2} alt="" />
                        <h3>Hristina Stanišić</h3>
                        <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st3} alt="" />
                        <h3>Milica Mihailović</h3>
                        <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="logoped">
                        <img className="log" src={st4} alt="" />
                        <h3>Kristina Nešković</h3>
                        <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum."
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