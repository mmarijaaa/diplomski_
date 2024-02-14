import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
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

    function tretmaniPaketaPacijenta(e) {

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
         
        }

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


      
  
    return (
        <div className='lista_tretmana_pacijenta'>
                    <div className='back'>
                      <Link to="/logoped/listaPacijenata" ><img className="arrow_back" src={arrow} alt="" /></Link> 
                      <div id="back_povratak"><b>Povratak na listu pacijenata</b></div>
                    </div>
 
                    <div className="tretman_pac">
                      <div id='tret_pac'>Pacijent {ime} {prezime}</div>
                    </div>

                    <div className="lista_paketa_pacijenta">
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
                    </div>
                    
                  <div className="tretmani_svi">
                      
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
                  </div>
        </div>
    )

}

export default ListaTretmanaPacijenta;