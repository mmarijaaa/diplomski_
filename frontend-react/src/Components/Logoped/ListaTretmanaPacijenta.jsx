import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanPacijent from './TretmanPacijent';
import TretmanPacijent3 from './TretmanPacijent3';
import Swal from 'sweetalert2';
import arrow from '../Slike/arrow_back.png';
import moment from 'moment';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const ListaTretmanaPacijenta = () => {

  //LOADING
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  //MODAL 3 - ODRADJENI TRETMANI I ZAKAZANI TRETMANI
  const [modal3, setModal3] = useState(false);
  const [tretmani3, setTretmani3] = useState();
  const [tretmani4, setTretmani4] = useState();

  let ime = window.sessionStorage.getItem("ime_pac");
  let prezime = window.sessionStorage.getItem("prezime_pac");
  let id_pacijenta = window.sessionStorage.getItem("id_pacijenta_logoped");
  let id_paket_pacijenta;
  let id_paket;

  /*function tretmaniPaketaPacijenta(e) {

    id_pak_pac = e.target.value;
    console.log(id_pak_pac);
    console.log(id_pacijenta);
    
      //odradjeni tretmani
     
      var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_pacijenta + "/" + id_pak_pac,
          headers: { 
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
          },
          data : tretmani3,
        };

      axios(config)
      .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("Lista ODRADJENIH tretmana prikazana");
          setTretmani3(response.data.data); 
      })
      .catch((error) => {
          console.log(error);
          console.log("Lista tretmana NIJE prikazana");
      });
      
    
      //zakazani tretmani
    
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_pacijenta+ "/" + id_pak_pac,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            },
            data : tretmani4,
          };
 
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ZAKAZANIH tretmana prikazana");
            setTretmani4(response.data.data); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
        });
       
      }*/

  //PAKETI PACIJENTA
  const [paketiPac, setPaketiPac] = useState();

  useEffect(() => {
    if (paketiPac == null) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/paketiPacijentaLogoped/' + id_pacijenta,
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),

        },
        data: paketiPac
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPaketiPac(response.data.data);
          setLoading2(true);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }, []);

  //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
  const [paketNaziv, setPaketNaziv] = useState();
  const [paketDatOd, setPaketDatOd] = useState();
  const [paketDatDo, setPaketDatDo] = useState();
  const [paketID, setPaketID] = useState();

  //USEEFFECT ZA TRENUTNI PAKET I NJEGOVE TRETMANE
  useEffect(() => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_pacijenta,
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),

      },
      data: paketiPac
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPaketiPac(response.data.data);
        setPaketID(response.data.data[0].id);
        window.sessionStorage.setItem("id_trenutnog_paketa", response.data.data[0].id);
        setPaketNaziv(response.data.data[0].naziv_paketa);
        window.sessionStorage.setItem("id_paketa", response.data.data[0].naziv_paketa.slice(6, 8).trim());
        setPaketDatOd(response.data.data[0].datum_od);
        setPaketDatDo(response.data.data[0].datum_do);

        //odradjeni tretmani
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_pacijenta + "/" + response.data.data[0].id,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
          },
          data: tretmani3,
        };

        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ODRADJENIH tretmana prikazana");
            setTretmani3(response.data.data);
            setLoading(true);
          })
          .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
          });


        //zakazani tretmani
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_pacijenta + "/" + response.data.data[0].id,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
          },
          data: tretmani4,
        };

        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ZAKAZANIH tretmana prikazana");
            setTretmani4(response.data.data);
            setLoading(true);
          })
          .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
          });




      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let navigate = useNavigate();

  function prethodniPaketi() {
    navigate('/logoped/prethodniPaketiPacijenta');
  }

  //*****************KRERIANJE TRETMANA************************

  const [tretmanData, setTretmanData] = useState({
    datum_tretmana: "",
    vreme_tretmana: "",
    redni_broj_tretmana: "",
    id_pacijenta: "",
    id_logopeda: "",
    id_paketa: "",
  });

  const [pacijenti, setPacijenti] = useState();
  const [pacIdPaketa, setPacIdPaketa] = useState();
  const [pacIdPakPac, setPacIdPakPac] = useState();
  const [paketTrenutni, setPaketTrenutni] = useState();
  const [zakaziTret, setZakaziTret] = useState();
  const [zakazaniTretmaniLogoped, setZakazaniTretmaniLogoped] = useState();

  var id_logopeda = window.sessionStorage.getItem("user_id");
  var duzina_liste_zak_log;
  var datum_liste;
  var vreme_liste;
  var dan_num;
  var datum_odabran;
  var vreme_odabrano;
  var zakazi;

  function kreirajTretman() {

    setZakaziTret(!zakaziTret);
    id_paket_pacijenta = window.sessionStorage.getItem("id_trenutnog_paketa");
    id_paket = window.sessionStorage.getItem("id_paketa");
    console.log("id paketa: " + id_paket);
    console.log("id paketa pacijenta: " + id_paket_pacijenta);

    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/listaTretmanaLog/' + id_logopeda,
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
      },
      data: zakazaniTretmaniLogoped,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Lista ZAKAZANIH tretmana LOGOPEDA");
        setZakazaniTretmaniLogoped(response.data.data);
        setLoading3(true);
      })
      .catch((error) => {
        console.log(error);
        console.log("Lista tretmana LOGOPEDA NIJE");
      });
  }

  function handleInput(e) {
    let newTretmanData = tretmanData;
    newTretmanData[e.target.name] = e.target.value;

    //uzimanje odabranih vrednosti za datum i vreme
    //dodavanje promenljivima radi dalje provere
    if (e.target.name == 'datum_tretmana') {
      datum_odabran = e.target.value;
    }
    if (e.target.name == 'vreme_tretmana') {
      vreme_odabrano = e.target.value;
    }

    setTretmanData(newTretmanData);
  }

  function handleKreirajTretman() {

    console.log("kreira se tretam");
    console.log("logoped: " + id_logopeda);
    console.log("pacijent: " + id_pacijenta);
    console.log("paket: " + window.sessionStorage.getItem("id_paketa"));
    console.log("paket pacijenta: " + window.sessionStorage.getItem("id_trenutnog_paketa"));

    //PROVERA DA LI JE TRETMAN ZAUZET

    //izvlacenje dana, meseca i godine iz odabranog datuma
    const dan = moment(datum_odabran).format('D');
    const mesec = moment(datum_odabran).format('M');
    const godina = moment(datum_odabran).format('YYYY');
    const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 

    duzina_liste_zak_log = zakazaniTretmaniLogoped.length;
    dan_num = Number(dan);

    //uporedjivanje odabranog datuma i svakog datuma iz liste 
    if (duzina_liste_zak_log != 0) {

      for (let i = 0; i < duzina_liste_zak_log; i++) {

        datum_liste = zakazaniTretmaniLogoped[i].datum_tretmana;
        vreme_liste = zakazaniTretmaniLogoped[i].vreme_tretmana;
        const mesec_liste = moment(datum_liste).format('M');
        const godina_liste = moment(datum_liste).format('YYYY');
        const dan_liste = moment(datum_liste).format('D');

        if (dan_num == dan_liste &&
          mesec == mesec_liste &&
          godina == godina_liste &&
          vreme_odabrano == vreme_liste) {
          console.log("TRETMAN JE ZAUZET !!!");
          zakazi = false;
          break;
        }
        else {
          zakazi = true;
          console.log("MOZE MOZE");
        }
      }
    } else {
      zakazi = true;
    }

    //ukoliko se datum ne poklapa moze da se kreira tretman
    if (zakazi == true) {

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_pacijenta + '/' + window.sessionStorage.getItem("id_paketa") + '/' + 0 + '/' + window.sessionStorage.getItem("id_trenutnog_paketa"),
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
        },
        data: tretmanData,
      }
      axios.request(config)
        .then((response) => {
          if (response.data.success == true) {
            console.log(JSON.stringify(response.data.success));
            console.log("Tretman kreiran!");
            Swal.fire({
              title: 'Uspešno zakazan tretman!',
            }).then(function () {
              window.location.reload(false);
            });
          } else {
            Swal.fire({
              title: 'Odaberite i datum i vreme!',
            })
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Tretman NIJE kreiran.");
        });

    } else {
      Swal.fire({
        title: 'Tretman je zauzet!',
      })

    }
  }

  var rbr = 1;

  return (
    <div className='lista_tretmana_pacijenta'>
      <div className='back'>
        <Link to="/logoped/listaPacijenata" ><img className="arrow_back" src={arrow} alt="" /></Link>
        <div id="back_povratak"><b>Povratak na listu pacijenata</b></div>
      </div>

      <div className="tretman_pac">
        <div id='tret_pac'>Pacijent: {ime} {prezime}</div>
      </div>


      {loading2 ? (
        <div className="trenutni_paket_logoped">
          <div className="tr1">{paketNaziv}  </div>
          <div className="tr2">{moment(paketDatOd).local().format('ll')} - {moment(paketDatDo).local().format('ll')} </div>
        </div>
      )
        : (<Loading2 />)
      }


      <div className="tretman_dugmad_logoped">
        <button className="tretman_dugme_logoped" onClick={prethodniPaketi}>PRETHODNI PAKETI</button>
        <button className="tretman_dugme_logoped" onClick={kreirajTretman}>KREIRAJ TRETMAN</button>
      </div>

      <div className="paket_tretmaniL">

        <div className="paketi_tretmani_odradjeniL">
          <div className='naslovi_tretmana'>ODRAĐENI TRETMANI:</div>
          {
            loading ? (
              tretmani3 == null
                ? (<></>)
                : (tretmani3
                  .slice(0)
                  .reverse()
                  .slice()
                  .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
                  .map((tretman) =>
                    <div className="ceo_tret_log">
                      <div className="tret_rbr_log">{rbr++}</div>
                      <TretmanPacijent3 tretman={tretman} key={tretman.id} />
                    </div>))
            )
              : (<Loading />)
          }
        </div>

        <div className="paketi_tretmani_zakazaniL">
          <div className='naslovi_tretmana'>ZAKAZANI TRETMANI:</div>
          {
            loading ? (
              tretmani4 == null
                ? (<></>)
                : (tretmani4
                  .slice(0)
                  .reverse()
                  .slice()
                  .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
                  .map((tretman) => 
                  <div className="ceo_tret_log">
                      <div className="tret_rbr_log">{rbr++}</div>
                      <TretmanPacijent tretman={tretman} key={tretman.id} />
                    </div>))
            )
              : (<Loading />)
          }
        </div>
      </div>

      {zakaziTret && (
        <div className='omodal'>
          <div className='ooverlay' onClick={kreirajTretman}></div>
          <div className='ocontent'>
            <div className="kreiraj_tretman_logoped">
              <input
                type="date"
                id="datum_tretmana"
                className="polje"
                placeholder="Unesite datum..."
                onInput={handleInput}
                name="datum_tretmana"
              />
              <select name="vreme_tretmana" className="vreme_tretmana2" onChange={handleInput}>
                <option>Vreme</option>
                <option value="12h">12h</option>
                <option value="13h">13h</option>
                <option value="14h">14h</option>
                <option value="15h">15h</option>
                <option value="16h">16h</option>
                <option value="17h">17h</option>
                <option value="18h">18h</option>
                <option value="19h">19h</option>
                <option value="20h">20h</option>
              </select>
              {loading3 ? (
                <button className="dugme1" onClick={handleKreirajTretman}>
                  ZAKAŽI TRETMAN
                </button>)
                : (<Loading2 />)
              }
            </div>
          </div>
        </div>
      )}


    </div>
  )

}

export default ListaTretmanaPacijenta;