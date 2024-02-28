import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {Navigate, useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanPacijent from './TretmanPacijent';
import Swal from 'sweetalert2';
import arrow from '../Slike/arrow_back.png'; 
import moment from 'moment';

const ListaTretmanaPacijenta = () => {

    //MODAL 3 - ODRADJENI TRETMANI I ZAKAZANI TRETMANI
    const[modal3, setModal3] = useState(false);
    const [tretmani3, setTretmani3] = useState();
    const [tretmani4, setTretmani4] = useState();

    let ime = window.sessionStorage.getItem("ime_pac");
    let prezime = window.sessionStorage.getItem("prezime_pac");
    let id_pacijenta = window.sessionStorage.getItem("id_pacijenta_logoped");
    let id_pak_pac;

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
      const[paketiPac, setPaketiPac] = useState();

      useEffect(() => {
        if(paketiPac == null) {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketiPacijentaLogoped/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
              
            },
            data : paketiPac
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setPaketiPac(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });

        }
      }, []);

    //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
    const[paketNaziv, setPaketNaziv] = useState();
    const[paketDatOd, setPaketDatOd] = useState();
    const[paketDatDo, setPaketDatDo] = useState();
    const[paketID, setPaketID] = useState();

    //USEEFFECT ZA TRENUTNI PAKET I NJEGOVE TRETMANE
    useEffect(() => {
      var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_pacijenta,
          headers: { 
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            
          },
          data : paketiPac
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPaketiPac(response.data.data);
          setPaketID(response.data.data[0].id);
          setPaketNaziv(response.data.data[0].naziv_paketa);
          setPaketDatOd(response.data.data[0].datum_od);
          setPaketDatDo(response.data.data[0].datum_do);

                  //odradjeni tretmani
                  var config = {
                    method: 'get',
                    url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_pacijenta + "/" + response.data.data[0].id,
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
                      url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_pacijenta + "/" + response.data.data[0].id,
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




        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  let navigate = useNavigate();
  function prethodniPaketi() {
    //navigate('/logoped/kreirajZahtev');
  }
      
  
    return (
        <div className='lista_tretmana_pacijenta'>
                    <div className='back'>
                      <Link to="/logoped/listaPacijenata" ><img className="arrow_back" src={arrow} alt="" /></Link> 
                      <div id="back_povratak"><b>Povratak na listu pacijenata</b></div>
                    </div>
 
                    <div className="tretman_pac">
                      <div id='tret_pac'>Pacijent: {ime} {prezime}</div>
                    </div>

                  <div className="trenutni_paket_logoped">
                    <div className="tr1">{paketNaziv}  </div>
                    <div className="tr2">{moment(paketDatOd).local().format('ll')} - {moment(paketDatDo).local().format('ll')} </div>
                  </div>

                  <button onClick={prethodniPaketi}>PRETHODNI PAKETI</button>

                  <div className="paket_tretmani">
                <div className="paketi_tretmani_zakazani">
                    <div className='naslovi_tretmana'>ZAKAZANI TRETMANI:</div>
                        { 
                            tretmani4 == null  
                            ? (<></>)
                            : (tretmani4
                              .slice(0)
                              .reverse()
                              .map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                        }
                </div>
                <div className="paketi_tretmani_odradjeni">
                    <div className='naslovi_tretmana'>ODRAĐENI TRETMANI:</div>
                        { 
                            tretmani3 == null 
                            ? (<></>)
                            : (tretmani3
                              .slice(0)
                              .reverse()
                              .map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                        }
                </div>
            </div>






                    {/* <div className="lista_paketa_pacijenta">
                      <select 
                      name="id_paketa_pacijenta" 
                      id="id_paketa_pacijenta" 
                      onChange={tretmaniPaketaPacijenta}
                      defaultValue={"placeholder"}
                      > 
                          <option value={"placeholder"}>Izaberi paket</option>
                          {paketiPac == null 
                              ? (<></>)
                              :
                          (paketiPac.map(({id, naziv_paketa, datum_od, datum_do, id_pacijenta, id_logopeda, created_at, updated_at} )=> <option value={id} >{naziv_paketa} ~ {moment(datum_od).local().format('ll')} - {moment(datum_do).local().format('ll')}</option>))} 
                      </select>
                    </div> */}
                    
                  {/* <div className="tretmani_svi">
                      
                      <div className="tretmani_odr" id="odr">
                            <p id='izm'><b>ODRAĐENI TRETMANI:</b></p>
                            { 
                                tretmani3 == null 
                                ? (<></>)
                                : (tretmani3.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                            }
                      </div>
                      <div className="tretmani_zak">
                            <p id='izm'><b>ZAKAZANI TRETMANI:</b></p>
                            { 
                                tretmani4 == null  
                                ? (<></>)
                                : (tretmani4.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                            }
                      </div>
                  </div> */}

                 
        </div>
    )

}

export default ListaTretmanaPacijenta;