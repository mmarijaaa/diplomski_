import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete from './TretmanDete';
import moment from 'moment';

const TrenutniPaket = () => {

    //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
    const[paketiPac, setPaketiPac] = useState();
    const[paketNaziv, setPaketNaziv] = useState();
    const[paketDatOd, setPaketDatOd] = useState();
    const[paketDatDo, setPaketDatDo] = useState();
    const[paketID, setPaketID] = useState();
    var id_dete = window.sessionStorage.getItem("iddete");
    var idp;
    
    //PROMENLJIVE ZA TRETMANE
    const [tretmani3, setTretmani3] = useState();
    const [tretmani4, setTretmani4] = useState();
    
    //USE EFFECT ZA AUTOMATSKO UCITAVANJE TRENUTNOG PAKETA
    useEffect(() => {
        console.log(id_dete);
        console.log(paketID);
 
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_dete,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
              
            },
            data : paketiPac
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



                          //odradjeni tretmani
                      var config = {
                        method: 'get',
                        url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_dete + "/" + response.data.data[0].id,
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
                          url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_dete + "/" + response.data.data[0].id,
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

    return (
        <div className="prethodni_paketi">
            <div className='naslovi_dugmica'>TRENUTNI PAKET</div>

            <div className="trenutni_paket">
                <div className="tr1">{paketNaziv}  </div>
                <div className="tr2">{moment(paketDatOd).local().format('ll')} - {moment(paketDatDo).local().format('ll')} </div>
            </div>

            <div className="paket_tretmani">
                <div className="paketi_tretmani_zakazani">
                    <div className='naslovi_tretmana'>ZAKAZANI TRETMANI:</div>
                        { 
                            tretmani4 == null  
                            ? (<></>)
                            : (tretmani4
                              .slice(0)
                              .reverse()
                              .map((tretman) => <TretmanDete tretman={tretman} key={tretman.id}/>))
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
                              .map((tretman) => <TretmanDete tretman={tretman} key={tretman.id}/>))
                        }
                </div>
            </div>
        </div>
    );
}

export default TrenutniPaket;