import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete from './TretmanDete';
import TretmanDete2 from './TretmanDete2';
import moment from 'moment';
import Swal from 'sweetalert2';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const TrenutniPaket = () => {

  //LOADING
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
  const [paketiPac, setPaketiPac] = useState();
  const [paketNaziv, setPaketNaziv] = useState();
  const [paketDatOd, setPaketDatOd] = useState();
  const [paketDatDo, setPaketDatDo] = useState();
  const [paketID, setPaketID] = useState();
  var id_dete = window.sessionStorage.getItem("iddete");
  var idp;

  //PROMENLJIVE ZA TRETMANE
  const [tretmani3, setTretmani3] = useState();
  const [tretmani4, setTretmani4] = useState();
  var tret3_br;
  var tret4_br;
  var tret3_trig;
  var tret4_trig;
  var rbr = 1;

  //USE EFFECT ZA AUTOMATSKO UCITAVANJE TRENUTNOG PAKETA
  useEffect(() => {
    console.log(id_dete);
    console.log(paketID);

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_dete,
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),

      },
      data: paketiPac
    };

    axios.request(config)
      .then((response) => {
        idp = response.data.data[0].id;
        console.log(idp);
        console.log(JSON.stringify(response.data));
        setPaketiPac(response.data.data);
        setPaketID(response.data.data[0].id);
        setPaketNaziv(response.data.data[0].naziv_paketa);
        setPaketDatOd(response.data.data[0].datum_od);
        setPaketDatDo(response.data.data[0].datum_do);
        setLoading2(true);
        //odradjeni tretmani
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_dete + "/" + response.data.data[0].id,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
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
          url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_dete + "/" + response.data.data[0].id,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
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

  //USE EFFECT ZA PRIKAZ SVIH TRETMANA
  /*useEffect(() => {
      console.log(idp); 
      //odradjeni tretmani
      var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_dete + "/" + paketID,
          headers: {  
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
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
            url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_dete + "/" + paketID,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
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
  }, []);*/

  //OBNOVA PAKETA 
  var zahtev_paket;
  var zahtev_poremecaj;
  var zahtev;
  var id_log = window.sessionStorage.getItem("id_logopeda_pacijenta");
  var id_rod = window.sessionStorage.getItem("roditelj_user_id");

  // const[zahtevObnova, setZahtevObnova] = useState({
  //     info_pacijenta: "",
  // });

  const [zahtevObnova, setZahtevObnova] = useState();

  function obnovaPaketa() {
    Swal.fire({
      title: 'Odaberite paket',
      input: 'select',
      inputOptions: {
        'Isti paket': 'Isti paket',
        'Paket 1 - 4 tretmana': 'Paket 1 - 4 tretmana',
        'Paket 2 - 8 tretmana': 'Paket 2 - 8 tretmana',
        'Paket 3 - 12 tretmana': 'Paket 3 - 12 tretmana',
        'Paket 4 - 18 tretmana': 'Paket 4 - 18 tretmana',
        'Paket 5 - 24 tretmana': 'Paket 5 - 24 tretmana',
      },
      confirmButtonText: 'Dalje',
      showCancelButton: true,
      cancelButtonText: "Nazad",
    }).then((result) => {
      if (result.isConfirmed) {
        zahtev = result.value;
        Swal.fire({
          title: 'Nakon što pošaljete zahtev, kada ga Vaš logoped odobri, dobićete poruku o odobrenom zahtevu i moći ćete da zakažete prvi tretman Vašeg deteta!',
          confirmButtonText: 'Pošaljite zahtev',
          showCancelButton: true,
          cancelButtonText: "Nazad",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(zahtev);

            //kreiranje zahteva
            var config = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/kreirajZahtevObnova/' + id_log + '/' + id_dete + '/' + id_rod + '/' + zahtev,
              headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
              },
              data: zahtevObnova,
            };

            axios(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                if (response.data.success == true) {
                  setZahtevObnova(response.data.data);
                  console.log("poslat zahtev")
                  Swal.fire({
                    title: "Zahtev je poslat!",
                  })
                }
                else {
                  console.log("Zahtev NIJE uspesno kreiran!");
                }
              })
              .catch((error) => {
                console.log(error);
              });

          }
        })
      }
    })
  }

  return (

    <div className="prethodni_paketi">

      <div className='naslovi_dugmica'>TRENUTNI PAKET</div>

      {loading2 ? (

        <div className="pakett">
          <div className="trenutni_paket">
            <div className="tr1">{paketNaziv}  </div>
            <div className="tr2">{moment(paketDatOd).local().format('ll')} - {moment(paketDatDo).local().format('ll')} </div>
          </div>
          <div className="obnovi_paket">
            <button onClick={obnovaPaketa}>
              OBNOVITE PAKET
            </button>
          </div>
        </div>

      )
        : (<Loading2 />)
      }

      <div className="paket_tretmani">
        <div className="paketi_tretmani_odradjeni">
          <div className='naslovi_tretmana'>ODRAĐENI TRETMANI:</div>
          {
            loading ? (
              tretmani3 == null
                ? (<></>)
                : (tretmani3
                  .map((tretman) =>
                    <div className="ceo_tret">
                      <div className="tret_rbr">{rbr++}</div>
                      <TretmanDete2 tretman={tretman} key={tretman.id} />
                    </div>))
            )
              : (<Loading />)
          }
        </div>
        <div className="paketi_tretmani_zakazani">
          <div className='naslovi_tretmana'>ZAKAZANI TRETMANI:</div>
          {
            loading ? (
              tretmani4 == null
                ? (<></>)
                : (tretmani4
                  .map((tretman) =>
                    <div className="ceo_tret">
                      <div className="tret_rbr">{rbr++}</div>
                      <TretmanDete tretman={tretman} key={tretman.id} />
                    </div>))
            )
              : (<Loading />)
          }
        </div>
      </div>


    </div>
  );
}

export default TrenutniPaket;