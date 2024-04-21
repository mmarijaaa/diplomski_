import React from 'react';
import Meni from './Meni';
import Footer from './Footer';
import mucanje from '../Slike/mucanje2.png'; 
import afazija from '../Slike/afazija.png'; 
import disleksija from '../Slike/disleksija.png'; 
import disfazija from '../Slike/disfazija.png'; 
import disgrafija from '../Slike/disgrafija.png'; 
import autizam from '../Slike/autizam.png'; 
import atrikulacija from '../Slike/artikulacija.png'; 
import egzek_fje from '../Slike/egzekutivne.png'; 
import grafmot_spos from '../Slike/grafmot_spos.png'; 
import skola from '../Slike/skola.png'; 
import verbalna_mem from '../Slike/verbalna_mem.png'; 
import agramatizam from '../Slike/agr.png'; 
import down from '../Slike/down.png';
import up from '../Slike/up.png';
import { useState } from 'react';

const Usluge = () => {

    const[icon1, setIcon1] = useState(false);
    const[icon2, setIcon2] = useState(false);
    const[icon3, setIcon3] = useState(false);
    const[icon4, setIcon4] = useState(false);
    const[icon5, setIcon5] = useState(false);
    const[icon6, setIcon6] = useState(false);
    const[icon7, setIcon7] = useState(false);
    const[icon8, setIcon8] = useState(false);
    const[icon9, setIcon9] = useState(false);
    const[icon10, setIcon10] = useState(false);
    const[icon11, setIcon11] = useState(false);
    const[icon12, setIcon12] = useState(false);
   
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

    const[modal6, setModal6] = useState(false);
    function toggleModal6() {
      setModal6(!modal6);
      setIcon6(!icon6);
    }
    if(modal6) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal7, setModal7] = useState(false);
    function toggleModal7() {
      setModal7(!modal7);
      setIcon7(!icon7);
    }
    if(modal7) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal8, setModal8] = useState(false);
    function toggleModal8() {
      setModal8(!modal8);
      setIcon8(!icon8);
    }
    if(modal8) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal9, setModal9] = useState(false);
    function toggleModal9() {
      setModal9(!modal9);
      setIcon9(!icon9);
    }
    if(modal9) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal10, setModal10] = useState(false);
    function toggleModal10() {
      setModal10(!modal10);
      setIcon10(!icon10);
    }
    if(modal10) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal11, setModal11] = useState(false);
    function toggleModal11() {
      setModal11(!modal11);
      setIcon11(!icon11);
    }
    if(modal11) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    const[modal12, setModal12] = useState(false);
    function toggleModal12() {
      setModal12(!modal12);
      setIcon12(!icon12);
    }
    if(modal12) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <Meni/>
            <div className="usluge">

                <div className="usluge_tekst">
                    <div className="h22">
                        <h3>USLUGE NAŠEG LOGOPEDSKOG CENTRA</h3>
                    </div>
                    
                    <p>
                        Deca svih uzrasta mogu se susresti sa jednim ili više poremećaja govora i jezika koji svakodnevno
                        mogu da ometaju njegovo normalno funkcionisanje. U okviru našeg logopedskog centra,
                        logopedi svojim znanjem, strpljenjem i stručnošću pomažu Vašoj deci u rešavanju
                        poremećaja govora i jezika sa kojim se ono susreće. Interaktivnim i redovnim tretmanima, Vaše 
                        dete će uspešno prevazići postojeće probleme. Naš logopedski centar nudi nekoliko paketa tretmana,
                        koji variraju u ceni i broju tretmana. Vi, kao roditelj, u dogovoru sa izabranim logopedom, imate
                        mogućnost da izaberete neke od ponuđenih paketa, u zavisnosti od ozbiljnosti problema sa kojim 
                        se Vaše dete susreće. 
                    </p>

                </div>

                <div className="usluge_paketi">
                        <div className="paket3">
                            <div className='paket_naziv'>PAKET  1</div>
                            <div className='paket_tretman'>4 tretmana</div>
                            <div className='paket_cena'>6.000 RSD</div>
                        </div>
                        <div className="paket3">
                            <div className='paket_naziv'>PAKET  2</div>
                            <div className='paket_tretman'>8 tretmana</div>
                            <div className='paket_cena'>12.000 RSD</div>
                        </div>
                        <div className="paket3">
                            <div className='paket_naziv'>PAKET  3</div>
                            <div className='paket_tretman'>12 tretmana</div>
                            <div className='paket_cena'>18.000 RSD</div>
                        </div>
                        <div className="paket3">
                            <div className='paket_naziv'>PAKET  4</div>
                            <div className='paket_tretman'>18 tretmana</div>
                            <div className='paket_cena'>27.000 RSD</div> 
                        </div>
                        <div className="paket3">
                            <div className='paket_naziv'>PAKET  5</div>
                            <div className='paket_tretman'>24 tretmana</div>
                            <div className='paket_cena'>36.000 RSD</div>
                        </div>
                </div>

        

                <div className="h23">
                    <h3>POREMEĆAJI GOVORA I JEZIKA</h3>
                </div>

        {/* <section class="reveal"> */}

                <div className="usluge_poremecaji"> 


                    <div className="poremecaji">
                        <div className="poremecaj">

                            <div className="poremecaj_prvideo">
                                <div className='por_icon1'><img className="por" src={autizam} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Pervazivni razvojni poremećaji</div>
                                    <button className="poremecaj_icon" onClick={toggleModal1}>
                                        {icon1 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal1 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal1}></div>
                                    <div className='contentP'>
                                    Pervazivni poremećaji su poremećaji verbalne i neverbalne komunikacije, socijalnih interakcija
                                     i stereotipan repertoar ponašanja i aktivnosti. U pervazivne razvojne poremećaje (prema 
                                     međunarodnoj klasifikaciji) spadaju: Dečiji autizam, Atipični autizam, Rettov sindrom, Drugi 
                                     dezintegrativni poremećaji detinjstva, Hiperkinetički poremećaj udružen sa mentalnom retardacijom
                                    i stereotipnim pokretima, Aspergerov sindrom, Drugi pervazivni razvojni poremećaj, Pervazivni 
                                    razvojni poremećaj, nespecifikovan. 
                                    </div>
                                    </div>
                                )}
                                </div>
                            
                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon2'><img className="por" src={afazija} alt="" /></div>
                            <div className='por_naziv'>Afazija</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon2'><img className="por" src={afazija} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Afazija</div>
                                    <button className="poremecaj_icon" onClick={toggleModal2}>
                                        {icon2 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal2 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal2}></div>
                                    <div className='contentP'>
                                    Afazija je stečeni poremećaj govora i/ili jezika koji nastaje kao posledica 
                                    moždanog oštećenja. Afazija je neurolingvistički deficit koji nastaje nakon 
                                    neurološkog oboljenja koje može biti izazvano akutnim moždanim udarom različite 
                                    etiologije: vaskularne, traumatske ili nekog drugog neurološkog oboljenja ili stanja. 
                                    Simptomi afazije ispoljavaju se u vidu: nemogućnosti govorenja, gubitka sposobnosti razumevanja,
                                    ponavljanja, imenovanja, čitanja, pisanja, nemogućnošću nalaženja reči, zamene jedne 
                                    reči drugom, nevoljnom produkcijom reči ili fraza, odsustvom uvida u jezički deficit itd.
                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon3'><img className="por" src={atrikulacija} alt="" /></div>
                            <div className='por_naziv'>Artikluacija</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon3'><img className="por" src={atrikulacija} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Artikluacija</div>
                                    <button className="poremecaj_icon" onClick={toggleModal3}>
                                        {icon3 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal3 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal3}></div>
                                    <div className='contentP'>
                                        Artikulacija je jasno i razgovetno izgovaranje glasova i 
                                        glasovnih sklopova (slogova i reči). Pokreti govornih organa
                                        (jezika, usana, glasnih žica) koji proizvode, uobličavaju i 
                                        omogućavaju takav izgovor. Greške koje prave deca, kada uopšteno 
                                        govorimo o artikulaciji, mogu se podeliti na distorzije, supstitucije i
                                         omisije. Distorzovan izgovor znači da dete izmenjeno izgovara određeni 
                                         glas (npr. umekšava). Supstitucija podrazumeva da dete određeni glas 
                                         zamenjuje nekim drugim glasom (r-l, lj-j), a omisija podrazumeva 
                                         izostavljanje glasa u reči. Glasovi koje deca najčešće neadekvatno 
                                         artikulišu ili ne izgovaraju su: Č, Ž, Š, DŽ, R, L, S, Z, C, LJ.

                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon1'><img className="por" src={disfazija} alt="" /></div>
                            <div className='por_naziv'>Disfazija</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon1'><img className="por" src={disfazija} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Disfazija</div>
                                    <button className="poremecaj_icon" onClick={toggleModal4}>
                                        {icon4 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal4 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal4}></div>
                                    <div className='contentP'>
                                    Disfazija je razvojni jezički poremećaj koji se ispoljava u vidu nemogućnosti razvoja 
                                    govora i jezika, dete ne govori ili su u govoru prisutne izrazite nepravilnosti 
                                    (ekspresivni tip) i nemogućnosti razumevanja jezika (receptivni tip), dete ne razume govor
                                     i nije u mogućnosti da ga produkuje. Dete sa disfazijom zaostaje samo u razvoju jezičkih 
                                     sposobnosti u odnosu na decu tipičnih sposobnosti. Kao uzrok razvojnog jezičkog poremećaja 
                                     navodi se odloženo sazrevanje centralnog nervnog sistema koji uzrokuje smetnje u razvoju 
                                     jezičkih sposobnosti, auditivnom procesiranju a koji dalje onemogućavaju razvoj govora i jezika.
                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                    </div>

                    <div className="poremecaji">
                        <div className="poremecaj">
                            {/* <div className='por_icon2'><img className="por" src={disgrafija} alt="" /></div>
                            <div className='por_naziv'>Disgrafija</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon2'><img className="por" src={disgrafija} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Disgrafija</div>
                                    <button className="poremecaj_icon" onClick={toggleModal5}>
                                        {icon5 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal5 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal5}></div>
                                    <div className='contentP'>
                                    Disgrafija je nesposobnost ili oštećena sposobnost pisanja, koja je 
                                    najzastupljenija u dečijem uzrastu. Nesposobnost deteta da savlada 
                                    veštinu pisanja (prema pravopisnim načelima određenog jezika), ogleda 
                                    se u mnogobrojnim, trajnim i tipičnim greškama. Ove greške nisu povezane 
                                    sa neznanjem pravopisa, i trajno se javljaju, bez obzira na dostignut 
                                    zadovoljavajući nivo intelektualnog i govornog razvoja, normalnog stanja 
                                    čula vida i sluha i redovno školovanje.
                                    </div>
                                    </div>
                                )}
                                </div>

                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon3'><img className="por" src={egzek_fje} alt="" /></div>
                            <div className='por_naziv'>Egzekutivne funkcije</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon3'><img className="por" src={egzek_fje} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Egzekutivne funkcije</div>
                                    <button className="poremecaj_icon" onClick={toggleModal6}>
                                        {icon6 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal6 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal6}></div>
                                    <div className='contentP'>
                                    Egzekutivne funkcije (EF) podpadaju pod kognitivne funkcije i smatraju se za najsloženije. 
                                    EF je sistem samoregulacije koji ima veliki značaj u razvoju govora, samokontrole i u 
                                    razvoju soijalnih i akademskih veština. Egzekutivne odnosno izvršne funkcije se odvijaju u 
                                    predfrontalnom korteksu, čeonom režnju. Lezakova definiše EF kao kapacitet koji omogućava 
                                    osobi da uspešno organizuje samostalno i svrsishodno ponašanje usmereno ka cilju.
                                    Kada se dogodi da dete kasni u razvoju EF dešava se da prebrzo odustaje od ostvarivanja cilja,
                                    dostizanja objekta, takođe se uočava čest pad motivacije i povećanje frustracije tj. negativne 
                                    reakcije ka odgovor na poteškoće.
                                    </div>
                                    </div>
                                )}
                                </div>

                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon1'><img className="por" src={disleksija} alt="" /></div>
                            <div className='por_naziv'>Disleksija</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon1'><img className="por" src={disleksija} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Disleksija</div>
                                    <button className="poremecaj_icon" onClick={toggleModal7}>
                                        {icon7 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal7 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal7}></div>
                                    <div className='contentP'>
                                    Disleksija je poremećaj sposobnosti čitanja ili razumevanja pročitanog,
                                     uz očuvanu senzornu i opštu sposobnost. Poremećaj veština čitanja i 
                                     pisanja, često sa tendencijom da se izokreću slova ili reči dok se 
                                     čita ili piše ili da se ne primećuju određena slova ili reči. 
                                     Disleksija može da bude nasledna ali i ne mora biti. 
                                     Takođe može da se javi i u svim nivoima inteligencije.
                                    </div>
                                    </div>
                                )}
                                </div>

                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon2'><img className="por" src={mucanje} alt="" /></div>
                            <div className='por_naziv'>Fluentnost govora - mucanje</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon2'><img className="por" src={mucanje} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Fluentnost govora - mucanje</div>
                                    <button className="poremecaj_icon" onClick={toggleModal8}>
                                        {icon8 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal8 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal8}></div>
                                    <div className='contentP'>
                                    Mucanje je poremećaj fluentnosti govora koji onemogućava normalan tok govora. 
                                    To je najevidentniji govorni poremećaj i ujedno kompleksan poremećaj koji se manifestuje 
                                    velikim brojem govornih disfluentnosti, a može uključivati i niz dodatnih komunikativnih, 
                                    emocionalnih i poremećaja u ponašanju. Prema tome, mucanje je višedimenzionalni problem 
                                    koji utiče na osobu kao celinu i koji pored manifestnih govornih poteškoća, često uključuje i 
                                    negativna osećanja, strah od govorenja, poniženje, stid, osećaj krivice, anksioznost, 
                                    frustriranost, nedostatak samopouzdanja i osećaj niže vrednosti. 
                                    </div>
                                    </div>
                                )}
                                </div>

                        </div>
                    </div>

                    <div className="poremecaji">
                        <div className="poremecaj">
                            {/* <div className='por_icon3'><img className="por" src={grafmot_spos} alt="" /></div>
                            <div className='por_naziv'>Razvoj grafomotorickih sposobnosti</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon3'><img className="por" src={grafmot_spos} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Razvoj grafomotoričkih sposobnosti</div>
                                    <button className="poremecaj_icon" onClick={toggleModal9}>
                                        {icon9 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal9 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal9}></div>
                                    <div className='contentP'>
                                    Grafomotorika se u školi samo usavršava, a do polaska u školu bi trebalo utemeljiti 
                                    osnovne grafomotoričke sposobnosti kod dece. Grafomotorika je motorička sposobnost 
                                    pisanja, odnosno sposobnost držanja olovke i pisanja. Iako se ova tema najčešće 
                                    spominje neposredno prije djetetovog polaska u školu, njezin razvoj započinje od 
                                    samog rođenja. Motorika za decu se može podeliti na razvoj fine motorike i na razvoj grube motorike.
                                    Razvoj grube motorike podrazumeva kontrolu pokreta koji detetu omogućuju kretanje u okolini 
                                    (npr. puzanje, stajanje i hodanje). Razvoj fine motorike obuhvata manje i preciznije pokrete 
                                    (npr. hvatanje), a obuhvata grafomotoriku.
                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon1'><img className="por" src={agramatizam} alt="" /></div>
                            <div className='por_naziv'>Agramatizam</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon1'><img className="por" src={agramatizam} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Agramatizam</div>
                                    <button className="poremecaj_icon" onClick={toggleModal10}>
                                        {icon10 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal10 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal10}></div>
                                    <div className='contentP'>
                                    Agramatizam predstavlja poremećaj gramatičke strukture usled oštećenja dominantne hemisfere mozga.
                                    To predstavlja oštećenje ili gubljenje sposobnosti govora ili pisanja u skladu sa gramatičkom i 
                                    logičkom strukturom odgovarajućeg jezika. Kod dece se može javiti u blažim oblicima tokom jezičkog 
                                    razvoja, naročito u slučaju oštećenja sluha, što se ne smatrana posledicom oštećenja mozga. 
                                    
                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon2'><img className="por" src={verbalna_mem} alt="" /></div>
                            <div className='por_naziv'>Razvoj verbalne memorije</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon2'><img className="por" src={verbalna_mem} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Razvoj auditivne (radne) memorije</div>
                                    <button className="poremecaj_icon" onClick={toggleModal11}>
                                        {icon11 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal11 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal11}></div>
                                    <div className='contentP'>
                                        Auditivna memorija (radna memorija) je vrsta senzorne 
                                        memorije koja je zadužena za sve kratkoročne auditivne informacije koje primamo 
                                        iz svog okruženja. 
                                        Auditivna memorija je skladište velikog broja kratkotrajnih informacija. 
                                        Deca sa malim opsegom auditivne memorije (nedovoljno razvijenom auditivnom memorijom) mogu imati neki od sledećih problema:
                                        problem u rešavanju tekstualnih zadataka,  
                                        problem u rešavanju zadataka koji imaju više delova,  
                                        potrebno im je više vremena da obrade informacije koje su verbalno izložene, 
                                        problem pri prepisivanju, 
                                        problem pri pisanju diktata, 
                                        problem u pamćenju lekcija, tekstova, pesmica, priča i sl.,
                                        problem sa govorom i jezikom što se često ogleda u siromašnijem rečniku, teškoćama u učenju stranog jezika i sl.,
                                        zbog frustracije usled neuspeha u rešavanju zadataka, a samim tim i lošijeg uspeha u školi, ova deca su šesto 
                                        frustrirana što utiče na njihovo emotivno stanje kao i na vladanje u školi i vršnjačke odnose.
                                    </div>
                                    </div>
                                )}
                                </div>

                        </div>
                        <div className="poremecaj">
                            {/* <div className='por_icon3'><img className="por" src={skola} alt="" /></div>
                            <div className='por_naziv'>Savladavanje školskog gradiva</div> */}
                            <div className="poremecaj_prvideo">
                                <div className='por_icon3'><img className="por" src={skola} alt="" /></div>
                                <div className="poremecaj_naziv">
                                    <div className='por_naziv'>Savladavanje školskog gradiva</div>
                                    <button className="poremecaj_icon" onClick={toggleModal12}>
                                        {icon12 ? 
                                        (<img className="poremecaj_iconica" src={up} alt=""/>) 
                                        : 
                                        (<img className="poremecaj_iconica" src={down} alt=""/>)
                                        }
                                    </button>
                                </div>
                            </div>
                                <div className="por_modal">
                                {modal12 && (
                                    <div className='modalP'>
                                    <div className='overlayP' onClick={toggleModal12}></div>
                                    <div className='contentP'>
                                        U okviru naših tretmana, Vašem detetu pomažemo da uz korišćenje
                                        različitih metoda i tehnika prevaziđe poteškoće koje ima u savladavanju
                                        školskog gradiva. 
                                    </div>
                                    </div>
                                )}
                                </div>
                        </div>
                    </div> 

                </div>

        {/* </section> */}
            </div>
            <Footer/>
        </div>
    )
}

export default Usluge;