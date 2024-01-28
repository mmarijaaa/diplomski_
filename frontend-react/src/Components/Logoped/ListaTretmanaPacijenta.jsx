import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanPacijent from './TretmanPacijent';
import Swal from 'sweetalert2';
import arrow from '../Slike/arrow_back.png'; 

const ListaTretmanaPacijenta = () => {

    //MODAL 3 - ODRADJENI TRETMANI I ZAKAZANI TRETMANI
    const[modal3, setModal3] = useState(false);
    const [tretmani3, setTretmani3] = useState();
    const [tretmani4, setTretmani4] = useState();

    let ime = window.sessionStorage.getItem("ime_pac");
    let prezime = window.sessionStorage.getItem("prezime_pac");
    useEffect(() => {
      let id_pacijenta = window.sessionStorage.getItem("id_pacijenta_logoped");

        //odradjeni tretmani
        if(tretmani3 == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
            },
            data : tretmani3,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ODRADJENIH tretmana prikazana");
            setTretmani3(response.data.tretmani); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
        });
        }

        //zakazani tretmani
        if(tretmani4 == null) {
          var config = {
              method: 'get',
              url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_pacijenta,
              headers: { 
                'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
              },
              data : tretmani4,
            };
  
          axios(config)
          .then((response) => {
              console.log(JSON.stringify(response.data));
              console.log("Lista ZAKAZANIH tretmana prikazana");
              setTretmani4(response.data.tretmani); 
          })
          .catch((error) => {
              console.log(error);
              console.log("Lista tretmana NIJE prikazana");
          });
          }
    
        }, []);

    return (
        <div className='lista_tretmana_pacijenta'>
                    <div className='back'>
                      <Link to="/logoped/listaPacijenata" ><img className="arrow_back" src={arrow} alt="" /></Link> 
                      <div id="back_povratak">Povratak na listu pacijenata</div>
                    </div>

                    <div className="tretman_pac">
                      <div id='tret_pac'>Pacijent {ime} {prezime}</div>
                    </div>
                    
                  <div className="tretmani_svi">
                      
                      <div className="tretmani_odr">
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