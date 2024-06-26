import React, { useTransition } from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import PacijentRoditelj2 from './PacijentRoditelj2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import logout from '../Slike/logout.png';
import user from '../Slike/user.png';
import lista from '../Slike/checklist.png';
import phone from '../Slike/phone.png';
import Deca from './Deca';
import roditeljIcon from '../Slike/roditelj.png';
import email from '../Slike/envelope.png';
import phonel from '../Slike/phone-call.png';
import logopedIcon from '../Slike/logoped.png';
import link from '../Slike/share.png';
import moment from 'moment';
import TretmanDete from './TretmanDete';
import { useNavigate } from 'react-router-dom';
import PrethodniPaketi from './PrethodniPaketi';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const PocetnaRoditelj = () => {

  //LOADING
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //*****ALERT ZA ODOBREN ZAHTEV

  const [zahtevNepreg, setZahtevNepreg] = useState();
  const [zahtevPreg, setZahtevPreg] = useState();
  const [zahtevID, setZahtevID] = useState();
  var ima_zahtev;
  var id_zahteva;

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/zahtevNepregledan/' + id_roditelja,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
      },
      data: zahtevNepreg
    };
    axios.request(config)
      .then((response) => {
        if (response.data.success == true) {
          ima_zahtev = true;
          console.log("NEPREGLEDAN ZAHTEV");
          console.log(response.data.success);
          console.log(response.data[0]);
          id_zahteva = response.data[0][0].id;
          if (response.data[0][0].pregledan == 0) {
            Swal.fire({
              title: "Zahtev za obnovu paketa za dete "+response.data[0][0].pacijent.ime+" "+response.data[0][0].pacijent.prezime+" je odobren!",
              confirmButtonText: 'PRIHVATITE ZAHTEV',
            }).then((result) => {
              if (result.isConfirmed) {
                var config = {
                  method: 'put',
                  url: 'http://127.0.0.1:8000/api/zahtevPregledan/' + id_zahteva,
                  headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
                  },
                  data: zahtevPreg
                };
                axios.request(config)
                  .then((response) => {
                    if (response.data.success == true) {
                      console.log("pregledan zahtev !!!");
                      setZahtevPreg(response.data.data);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }

            })
          }

        }
      })
      .catch((error) => {
        console.log(error);
        ima_zahtev = false;
      });
  }, []);



  let navigate = useNavigate();

  const [deca, setDeca] = useState();
  const [logoped, setLogoped] = useState();
  const [logopedIme, setLogopedIme] = useState();
  const [logopedPrezime, setLogopedPrezime] = useState();
  const [logopedID, setLogopedID] = useState();
  const [logopedTel, setLogopedTel] = useState();

  let id_roditelja = window.localStorage.getItem("roditelj_user_id");

  //LISTA DECE RODITELJA
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/listaDece/' + id_roditelja,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
      },
      data: deca,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Lista dece prikazana");
        window.localStorage.setItem("id_logopeda_pacijenta_roditelj", response.data.deca[0].id_logopeda);
        setDeca(response.data.deca);
        setLoading2(true);

        if (deca.length == 1) {
          var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketTrenutni/' + window.localStorage.getItem("iddete"),
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),

            },
            data: paketTrenutni2
          };
          axios.request(config)
            .then((response) => {
              window.localStorage.setItem("id_trenutnog_paketa_roditelj", response.data.data[0].id);
              window.localStorage.setItem("id_paketa_roditelj", response.data.data[0].naziv_paketa.slice(6,8)); 
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Lista dece NIJE prikazana");
      });

  }, []);


  //ODJAVA RODITELJA
  function handleLogout() {
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/logoutRoditelja',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.localStorage.setItem("auth_token2", null);
        window.localStorage.setItem("roditelj_user_id", null);
        console.log("Uspesno ste se izlogovali");
      })
      .catch((error) => {
        console.log(error);
      });

  }

  //RODITELJ INFORMACIJE
  const [roditelj, setRoditelj] = useState();
  const [imeR, setImeR] = useState();
  const [prezimeR, setPrezimeR] = useState();
  let id_logopeda;

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/sviRoditelji/' + id_roditelja,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
      },
      data: roditelj,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log('Roditelj');
        setImeR(response.data[0].ime);
        setPrezimeR(response.data[0].prezime);
        setLogopedIme(response.data[0].logoped.ime);
        setLogopedPrezime(response.data[0].logoped.prezime);
        setLogopedTel(response.data[0].logoped.broj_telefona);
        setLogopedID(response.data[0].logoped.id);
        console.log('id logopeda: ' + logopedID);
        
      })
      .catch((error) => {
        console.log(error);
        console.log("Roditelj NIJE prikazan");
      });
  }, []);


  var idj;
  const [deteIme, setDeteIme] = useState();
  const [detePrezime, setDetePrezime] = useState();
  const [deteID, setDeteID] = useState();
  const [paketiPac, setPaketiPac] = useState();
  var iddete;

  //FUNKCIJA PRIKAZA TRETMANA ODREDJENOG PACIJENTA I PAKETA PACIJENTA
  const [tretmani3, setTretmani3] = useState();
  const [tretmani4, setTretmani4] = useState();
  const [idpakpac, setidpakpac] = useState();
  var id_pak_pac;

  //FUNCKIJA ZA ODLAZAK NA STRANICU PRETHODNIH PAKETA
  function prethodniPaketi() {
    navigate('/roditelj/prethodniPaketi');
  }

  const [paketTrenutni, setPaketTrenutni] = useState();
  const [paketTrenutni2, setPaketTrenutni2] = useState();

  var br_tret;
  function zakazivanjeTretmana() {
    //uzimanje idja trenutnog paketa kako bi se za njega zakzao tretman
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/paketTrenutni/' + window.localStorage.getItem("iddete"),
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),

      },
      data: paketTrenutni
    };

    axios.request(config)
      .then((response) => {
        window.localStorage.setItem("id_trenutnog_paketa_roditelj", response.data.data[0].id);
        window.localStorage.setItem("datum_do", response.data.data[0].datum_do);
        br_tret = response.data.data[0].naziv_paketa.slice(10, 12).trim();
        window.localStorage.setItem("broj_tretmana_roditelj", br_tret);
        console.log(response.data.data[0].id);
        console.log(br_tret);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate('/roditelj/zakazivanjeTretmana');
  }

  function trenutniPaket() {
    navigate('/roditelj/trenutniPaket');
  }

  function ip2() {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/paketTrenutni/' + window.localStorage.getItem("iddete"),
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),

      },
      data: paketTrenutni2
    };
    axios.request(config)
      .then((response) => {
        window.localStorage.setItem("id_trenutnog_paketa_roditelj", response.data.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function t2() {
    //console.log("t2");
  }
  const [izaberi, setIzaberi] = useState("Izaberite...");
  var odabir = "Izaberite";

  //VARIJABLE UKOLIKO RODITELJ IMA JEDNO DETE
  var imej;
  var prezimej;
  var jedno = false; //za proveru ukoliko je jedno prikazuje se odmah ime i prezime




  return (
    <div className='log_profil'>
      <div className="log_logoped">

        <div className="log_info">
          <img className="log_icon" src={roditeljIcon} alt="" />
          <p>{imeR} {prezimeR}</p>
        </div>

        <div className='log_linkovi'>

          <div className="kontakt_logopeda">
            <div className='kont_info'>
              <img className="log_icon" src={logopedIcon} alt="" />
              <div className="knt">
                <b>Logoped:</b> <br></br>
                {logopedIme} {logopedPrezime}
              </div>
            </div>

            <div className='kont_info'>
              <img className="log_icon" src={phonel} alt="" />
              <div className="knt">
                <b>Broj telefona:</b> <br></br>
                {logopedTel}
              </div>
            </div>

            <div className='kont_info'>
              <img className="log_icon" src={email} alt="" />
              <div className="knt">
                <b>E-mail:</b> <br></br>
                <div id='kont_email_log'>{logopedIme}.{logopedPrezime}@gmail.com</div>
              </div>
            </div>

            {/* <div className='kont_info'>
              <img className="log_icon" src={link} alt="" />
              <div className="knt">
                <b>Link ka početnoj:</b> <br></br>
                <div id='kont_link'>
                  <a href="http://localhost:3000/ " target="_blank" rel="noreferrer">L.C. Kovačev</a>
                </div>
              </div>
            </div> */}

          </div>



        </div>


        <div className="log_odjava">
          <div className="log_link_red">
            <img className="log_icon" src={logout} alt="" />
            <Link to='/prijava/prijavaRoditelja' onClick={handleLogout} className='log_link'>Odjava</Link>

          </div>
        </div>



      </div>

      <div className="log_outlet">

        {loading2 ? (

          <div className="deca_links">
            {deca == null
              ? (<></>)
              :
              (deca.map(({ id, ime, prezime, uzrast, poremecaj, id_roditelja, id_logopeda, id_paketa,
                created_at, updated_at }) =>

                <div className="dete_dugme">

                  {deca.length == 1
                    ? <div hidden>{imej = ime}
                      {prezimej = prezime}
                      {jedno = true}
                      {idj = id}
                    </div> 
                    : <div></div>
                  }

                  {deca.length == 1
                    ? <div>
                      {window.localStorage.setItem("broj_dece", "jedno")}
                      {window.localStorage.setItem("iddete", id)}
                    </div>

                    : window.localStorage.setItem("broj_dece", "vise")
                  }

                  {/*SVAKO DETE JE DUGME ZA SEBE I VRSI FUNKCIJU SETOVANJA PODATAKA*/}
                  {deca.length == 1
                    ? <div></div>
                    :
                    <button
                      onClick={function ip() {
                        console.log(ime);
                        console.log(prezime);
                        setDeteIme(ime);
                        setDetePrezime(prezime);
                        setDeteID(id);
                        iddete = id;
                        console.log(iddete);
                        window.localStorage.setItem("iddete", iddete);
                        window.localStorage.setItem("id_paketa_roditelj", id_paketa);
                        setIzaberi("Izaberite...");
                        odabir = "Izaberite";
                        setTretmani3([]);
                        setTretmani4([]);
                        ip2();
                        navigate('/roditelj');
                      }}
                    >
                      {ime} {prezime}
                    </button>
                  }
                </div>



              ))}
          </div>
        )
          : (<Loading2 />) 
        }


        <div className="dete_sve">

          <div className="dete_informacije">

            <div className="dete_ime_prezime">
              <div id='dete_txt'>IME I PREZIME:</div>
              <div className="dete_ip">
                {jedno == true
                  ? <div>
                    {imej} {prezimej} <br></br>
                  </div>
                  : <div>{deteIme} {detePrezime}</div>
                }
              </div>
            </div>


            <div className="dete_dugmici">
              <button onClick={trenutniPaket}>TRENUTNI PAKET</button>
              <button onClick={zakazivanjeTretmana}>ZAKAŽITE TRETMAN</button>
              <button onClick={prethodniPaketi}>PRETHODNI PAKETI</button>
            </div>

          </div>

          
          {/*SVI TRETMANI DETETA NA OSNOVU ODABRANOG PAKETA*/}
          <div className="dete_tretmani">
            <div className="tretmani_odr" id="odr">
              {/* <p id='izm'><b>ODRAĐENI TRETMANI:</b></p> */}
              {
                tretmani3 == null
                  ? (<></>)
                  : (tretmani3.map((tretman) => <TretmanDete tretman={tretman} key={tretman.id} />))
              }
            </div>
            <div className="tretmani_zak">
              {/* <p id='izm'><b>ZAKAZANI TRETMANI:</b></p> */}
              {
                tretmani4 == null
                  ? (<></>)
                  : (tretmani4.map((tretman) => <TretmanDete tretman={tretman} key={tretman.id} />))
              }
            </div>

          </div>


        </div>



        <Outlet />
      </div>


    </div>
  );
};

export default PocetnaRoditelj;
