import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete from './TretmanDete';
import TretmaniLogopeda from './TretmaniLogopeda';
import Swal from 'sweetalert2';
import moment from 'moment';

const PacijentRoditelj = ({pacijent}) => {

  let id_logopeda = pacijent.id_logopeda; 

    const [pacijentData, setPacijentData] = useState({
        ime: pacijent.ime,
        prezime: pacijent.prezime,
        uzrast: pacijent.uzrast,
        poremecaj: pacijent.poremecaj, 
        //paket: pacijent.id_paketa.naziv_paketa,
      });


    /*ZAUZETI TRETMANI*/
    const [tretmani4, setTretmani4] = useState();
    const[modal4, setModal4] = useState(false);
    function toggleModal4() {
      setModal4(!modal4);
      //lista tretmana logopeda
      if(tretmani4 == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaLogoped/' + id_logopeda,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmani4,
          };
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista tretmana LOGOPEDA prikazana");
            setTretmani4(response.data.tretmani); 
            //console.log(tretmaniLogopeda); UNDEFINED
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista tretmana LOGOPEDA NIJE prikazana");
        });
        }
    }
    if(modal4) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }
    


    //MODAL1 - zakazi tretman 
    const[modal, setModal] = useState(false);

    const [paket, setPaket] = useState();
    const [nazivPaketa, setNazivPaketa] = useState();
    const [brojTretmanaPaketa, setBrojTretmanaPaketa] = useState();

    const[tretmaniLogopeda, setTretmaniLogopeda] = useState();
    const[tretmaniPac, setTretmaniPac] = useState();

    let duzina_svih;

    function toggleModal() {
        setModal(!modal);
         //paket
         let id_paketa_pacijenta = pacijent.id_paketa;
         var config = {
             method: 'get',
             url: 'http://127.0.0.1:8000/api/paketPacijenta/' + id_paketa_pacijenta,
             headers: { 
               'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
             },
             data : paket,
           };
         axios(config)
         .then((response) => {
             console.log(JSON.stringify(response.data)); 
             setBrojTretmanaPaketa(response.data.paket[0].broj_tretmana);
             console.log("Paket JESTE prikazan"); 
         })
         .catch((error) => {
               console.log(error);
               console.log("Paket NIJE prikazan");
         }); 

         //lista tretmana logopeda
         if(tretmaniLogopeda == null) {
          var config = {
              method: 'get',
              url: 'http://127.0.0.1:8000/api/listaTretmanaLogoped/' + id_logopeda,
              headers: { 
                'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
              },
              data : tretmaniLogopeda,
            };
          axios(config)
          .then((response) => {
              console.log(JSON.stringify(response.data));
              console.log("Lista tretmana LOGOPEDA prikazana");
              setTretmaniLogopeda(response.data.tretmani); 
              
          })
          .catch((error) => {
              console.log(error);
              console.log("Lista tretmana LOGOPEDA NIJE prikazana");
          });
          }

        //lista svih tretmana
        let id_pacijenta_1 = pacijent.id;
        if(tretmaniPac == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmana/' + id_pacijenta_1,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmaniPac, 
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista SVIH TRETMANA prikazana");
            setTretmaniPac(response.data.tretmani);   
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista TRETMANA NIJE prikazana"); 
        });
        }
    }

    if(modal) {
        document.body.classList.add('active-modal')
    }else {
        document.body.classList.remove('active-modal')
    }

    //MODAL2 - lista zakazanih tretmana
    const[modal2, setModal2] = useState(false);

    // function toggleModal2() {
    // setModal2(!modal2);
    // }

    if(modal2) {
        document.body.classList.add('active-modal')
    }else {
        document.body.classList.remove('active-modal')
    }

    //MODAL3 - lista odradjenih tretmana
    const[modal3, setModal3] = useState(false);

    // function toggleModal3() {
    // setModal3(!modal3);
    // }

    if(modal3) {
        document.body.classList.add('active-modal')
    }else {
        document.body.classList.remove('active-modal')
    }

    //************************************************************************************************************* 
    //PAKETI PACIJENATA - DECE

    useEffect(() => {
    let id_paketa_pacijenta = pacijent.id_paketa;
         var config = {
             method: 'get',
             url: 'http://127.0.0.1:8000/api/paketPacijenta/' + id_paketa_pacijenta,
             headers: { 
               'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
             },
             data : paket,
           };
         axios(config)
         .then((response) => {
             console.log(JSON.stringify(response.data)); 
             setNazivPaketa(response.data.paket[0].naziv_paketa);
             setBrojTretmanaPaketa(response.data.paket[0].broj_tretmana);
             console.log("Paket JESTE prikazan"); 
         })
         .catch((error) => {
               console.log(error);
               console.log("Paket NIJE prikazan");
         }); 
    }, []);


    //****************************************************************************************************
    //LISTA SVIH TRETMANA - kako da stavim da ne bude preko useEffecta nego samo da bude funkcija ???????
    const [tretmaniSvi, setTretmaniSvi] = useState();

    useEffect(() => {
        let id_pacijenta = pacijent.id;
        if(tretmaniSvi == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmana/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmaniSvi,
          };
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista SVIH tretmana prikazana");
            setTretmaniSvi(response.data.tretmani); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista SVIH tretmana NIJE prikazana");
        });
        }
    }, [tretmaniSvi]);

    //****************************************************************************************************************************
    //KREIRANJE TRETMANA
    
    const [tretmanData, setTretmanData] = useState({
        datum_tretmana:"",
        vreme_tretmana:"",
        //naziv_tretmana: "",
        redni_broj_tretmana: "", 
        //sadrzaj_tretmana: "",
        id_pacijenta: "",
        id_logopeda: "",
        id_paketa: "",
    });

    let datum;
    let dan;
    let vreme_tret;

    function handleInput(e) {
        let newTretmanData = tretmanData;
        newTretmanData[e.target.name] = e.target.value;

        if(e.target.name == 'datum_tretmana') {
          datum = e.target.value;
        }

        if(e.target.name == 'vreme_tretmana') {
          vreme_tret = e.target.value;
        }

        //izvlacenje odabranog datuma
        dan = moment(datum).format('dddd'); //dan u nedelji
        console.log(datum);
        const month1 = moment(datum).format('M');
        const year1 = moment(datum).format('YYYY');
        const date1 = moment(datum).format('D');
        //const datum_novi = year1 + "-" + month1 + "-" + date1;
        let datum_novi;
        // console.log(datum_novi); 
        console.log(vreme_tret);

        //izvlacenje danasnjeg datuma
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        //const currentDate = year + "-" + month + "-" + date;
        // let currentDate;
        // if(date<10) {
        //   currentDate = year + "-" + month + "-" + "0" + date;
        // } else {
        //   currentDate = year + "-" + month + "-" + date;
        // }

        const currentDate = moment(today).format('L'); //12/04/2023 
        datum_novi = moment(datum).format('L');     

        console.log(datum_novi);
        console.log(currentDate);
        console.log(dan);     
        
        let date1_num = Number(date1);
        let date_num = Number(date);

        //ordinacija ne radi vikendom 
        if(dan == "Sunday" || dan == "Saturday") {
          console.log("Ne radimo vikendom!");
          Swal.fire({
            title: 'Ne radimo vikendom!',
          })
        }

        //1 je za odabrani datum
        else if (year1 == year) {

          if(month1 == month) {

              if(date1_num == date_num) {
                console.log("DANAS NEMA ZAKAZIVANJA !!!");
                Swal.fire({
                  title: 'Danas ne može da se zakaže tretman!', 
                })
              } 
              else if(date_num > date1_num) {
                console.log("DATUM JE PROSAO !!!");
                Swal.fire({
                  title: 'Datum je prošao!', 
                })
              }
              else {
                console.log("MOZE DA SE ZAKAZE !!!");
              }

          } 
          else if(month > month1) {
              console.log("DATUM JE PROSAO !!!");
              Swal.fire({
                title: 'Datum je prošao!', 
              })
          }
          else {
              console.log("MOZE DA SE ZAKAZE !!!");
          }

        }
        else if (year < year1) {
          console.log("MOZE DA SE ZAKAZE !!!");
        } 
        else if (year > year1){
          console.log("DATUM JE PROSAO !!!");
          Swal.fire({
            title: 'Datum je prošao!', 
          })
        }


        //ne zakazuju se datumi koji su vec prosli
        // } else if(datum_novi < currentDate){ 
        //   console.log("Datum je vec prosao!");
        //   Swal.fire({
        //     title: 'Datum je vec prosao!',
        //   })  

        //ako roditelj zeli da zakaze danas tretman to nije moguce
        // } else if(datum_novi == currentDate) {
        //   console.log("Danas nije moguce zakazati tretman!");
        //   Swal.fire({
        //     title: 'Danas nije moguce zakazati tretman!',
        //   })
        // } 

        //ukoliko su svi uslovi ispunjeni moguce je zakazati tretman
        else {
          setTretmanData(newTretmanData); 
        }

        // setTretmanData(newTretmanData); 

        //provera da li je datum pre datuma poslednje zakazanog tretmana
        duzina_svih = tretmaniPac.length; 
        console.log(duzina_svih); 
        console.log(tretmaniPac[duzina_svih-1].datum_tretmana);        

        let poslednji_tretman_datum = tretmaniPac[duzina_svih-1].datum_tretmana;
        let pt_dan = moment(poslednji_tretman_datum).format('D');
        let pt_mesec = moment(poslednji_tretman_datum).format('M'); 
        let pt_godina = moment(poslednji_tretman_datum).format('YYYY'); 

        console.log(date1);
        console.log(pt_dan);
        let d1 = Number(date1);
        let ptd = Number(pt_dan);
        console.log(d1);
        console.log(ptd);
        if(d1< ptd) { 
          console.log("DOBRO JE");
        } else {
          console.log("NIJE DOBRO"); 
        }

        if(pt_godina == year1) {
          
          if(pt_mesec == month1) {

            //ako je odabran datum istog meseca manji od poslednje zakazanog
            if(d1 < ptd) {
              console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
              Swal.fire({
                title: 'Odabrani datum nije moguće zakazati, jer je pre poslednje zakazanog tretmana!', 
              })
            } 
            else if (d1 > ptd){ 
              console.log("MOZE TAJ DATUM"); 
            } 
            else {
              console.log("VEC IMATE ZAKAZAN TRETMAN TOG DANA"); 
              Swal.fire({
                title: 'Već imate zakazan tretman tog datuma!',  
              })
            }
          }
          else if(pt_mesec < month1) {
            console.log("MOZE TAJ DATUM"); 
          } 
          else {
            console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
            // Swal.fire({
            //   title: 'Odabrani datum nije moguće zakazati, jer je pre poslednje zakazanog tretmana!', 
            // })
          }
        }
        else if (pt_godina < year1) {
          console.log("MOZE TAJ DATUM");
        } 
        else if (pt_godina > year1){
          console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
        }

    }
    let zakazi;
    
    function handleKreirajTretman(e) {

        e.preventDefault();
        let redni_broj_tretmana;
        let duzina = tretmaniSvi.length;
        console.log(duzina);
        console.log(brojTretmanaPaketa);

        let id_paketa_pacijenta2;
        let id_pacijenta2 = pacijent.id;

        //PROVERA DA LI TRETMAN VEC POSTOJI
        let odabran_datum;
        odabran_datum = moment(datum).format('dddd'); //dan u nedelji 
        const mesec_odabran = moment(datum).format('M'); 
        const godina_odabran = moment(datum).format('YYYY');
        const dan_odabran = moment(datum).format('D');
        const odabran_datum_tretmana = godina_odabran + "-" + mesec_odabran + "-" + dan_odabran;
        console.log(odabran_datum_tretmana);

        //proci kroz listu tretmaniLogopeda, uzeti datum tretmana i vreme tretmana
        //uzeti dan, mesec, godinu od datuma tretmana i uporediti sa odabranim datumom tretmana
        //uzeti vreme tretmana i uporediti sa odabranim vremenom tretmana
        let duzina_tret = tretmaniLogopeda.length;
        let datum_liste;
        let vreme_liste;

        for(let i=0; i<duzina_tret; i++) {
            datum_liste = tretmaniLogopeda[i].datum_tretmana;
            vreme_liste = tretmaniLogopeda[i].vreme_tretmana;
            const mesec_liste = moment(datum_liste).format('M'); 
            const godina_liste = moment(datum_liste).format('YYYY');
            const dan_liste = moment(datum_liste).format('D');
            console.log(dan_liste);
            console.log(dan_odabran);

            if(dan_odabran == dan_liste && 
              mesec_odabran == mesec_liste && 
              godina_odabran == godina_liste &&
              vreme_tret == vreme_liste) 
            {
              console.log("TRETMAN JE ZAUZET !!!!!!!");
              zakazi = false;
              break;
            } 
            else {
              zakazi = true;
            }
        }

      //PROVERA DA DATUM TRETMANA NE BUDE PRE POSLEDNJE ZAKAZANOG
      //proci kroz listu zakazanih tretmana 
      //izabrati poslednji clan liste lista[duzina_niza]
      //uporediti datume ako je odabrani datu pre tog poslednjeg clana liste 
      //na dugme kada se zakazuje tretman ispisati listu zakazanih
      //napraviti novi const za zakazane const[tretZ, setTretZ] = useState();
      // let duzina_zakazanih = tretmaniZak.length;
      // let poslednji_tretman_datum = tretmaniZak[duzina_zakazanih].datum_tretmana; 
      // let pt_dan = moment(poslednji_tretman_datum).format('D');
      // let pt_mesec = moment(poslednji_tretman_datum).format('M'); 
      // let pt_godina = moment(poslednji_tretman_datum).format('YYYY'); 

      
      

        //STAVITI DA IDE DO BROJA TRETMANA 
        for(let i=0; i<=duzina; i++) {
            //if(duzina < 8) {  
            if(duzina < brojTretmanaPaketa) {  
                if(i < duzina) {
                    continue;
                } else {
                    redni_broj_tretmana = i+1;
                }               

            } else {
                console.log("Broj tretmana potrosen!!!");
                Swal.fire({
                  title: 'Broj tretmana je potrošen!',
                  text: 'Kontaktirajte Vašeg logopeda kako biste započeli novi paket tretmana!',
                })
                // Swal.fire({
                //     title: 'Broj tretmana protosen!',
                //     text: 'Da li zelite da nastavite sa tretmanima?',
                //     showDenyButton: true,
                //     confirmButtonText: 'DA',
                //     denyButtonText: 'NE',
                //   }).then((result) => {
                //     if (result.isConfirmed) {
                //       Swal.fire({
                //         title: 'Odaberite paket',
                //         input: 'select',
                //         inputOptions: {
                //         '1': 'Paket1',
                //         '2': 'Paket2',
                //         '3': 'Paket3',
                //         '4': 'Paket4',
                //         '5': 'Paket5',
                //         },
                //         confirmButtonText: 'Odaberite',
                //         }).then((result) => {
                //             if (result.isConfirmed) {
                //                 Swal.fire({
                //                     title: `Nov paket odabran! ${result.value}`,  
                //                   }).then(function(){
                //                     id_paketa_pacijenta2 = result.value; 
                                    
                //                     //IZMENA PAKETA DETETA - pocetak  novog paketa 
                //                     var config = {
                //                         method: 'put',
                //                         url: 'http://127.0.0.1:8000/api/izmenaPaketaPacijenta/' + id_pacijenta2 + '/' +id_paketa_pacijenta2,
                //                         headers: { 
                //                           'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),  
                //                         },
                //                         data : pacijentData
                //                       };
                              
                //                       axios.request(config)
                //                       .then((response) => {
                //                         console.log(JSON.stringify(response.data));
                //                         console.log("Paket pacijenta uspesno izmenjen.");
                //                         setPacijentData(response.data.pacijent);
                //                       })
                //                       .catch((error) => {
                //                         console.log(error);
                //                         console.log("Paket pacijenta NIJE uspesno izmenjen."); 
                //                       }); 

                //                       //KOD ZA BRISANJE TRETMANA KOJI PRIPADAJU TOM PACIJENTU

                //                       // var config = {
                //                       //   method: 'delete',
                //                       //   url: 'http://127.0.0.1:8000/api/brisanjeTretmana/' + id_pacijenta2,
                //                       //   headers: { 
                //                       //     'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),  
                //                       //   },
                //                       // };
                                      
                //                       // axios.request(config)
                //                       // .then((response) => {
                //                       //   console.log(JSON.stringify(response.data));
                //                       //   console.log("Tretmani obrisani."); 
                //                       // })
                //                       // .catch((error) => {
                //                       //   console.log(error);
                //                       // });

                //                     window.location.reload(); 
                //                 });
                //               }
                //             })

                //     } else if (result.isDenied) {
                //       Swal.fire('Hvala na ukazanom poverenju!')
                //     }
                //   })
            }
        }
        console.log(redni_broj_tretmana);

        // let id_logopeda = pacijent.id_logopeda; 
        let id_pacijenta = pacijent.id;
        let id_paketa = pacijent.id_paketa; 
        //let redni_broj_tretmana = 4;

      if(zakazi == true) {

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_pacijenta + '/' + id_paketa + '/' + redni_broj_tretmana,
            headers: { 
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
            },
            data: tretmanData,
        }

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Tretman kreiran!");
            Swal.fire({
              title: 'Uspešno zakazan tretman!',
            }).then(function(){
              window.location.reload();
            });
            
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

    function sacuvajIdPacijenta() {
        window.sessionStorage.setItem("id_pacijenta", pacijent.id);
    }


    //******************************************************************************************************************************** 
    //MODAL 2 - LISTA TRETMANA ODRADJENIH
    const [tretmani, setTretmani] = useState();

    function toggleModal2() {
        setModal2(!modal2);

        let id_pacijenta = pacijent.id;

        if(tretmani == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmani,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ODRADJENIH tretmana prikazana");
            setTretmani(response.data.tretmani); 
        })
        .catch((error) => {
            console.log(error); 
            console.log("Lista tretmana NIJE prikazana");
        });
        }
    }

    //******************************************************************************************************************************** 
    //MODAL 3 - LISTA TRETMANA ZAKAZANIH 
    const [tretmani2, setTretmani2] = useState();

    function toggleModal3() {
        setModal3(!modal3); 

        let id_pacijenta = pacijent.id;

        if(tretmani2 == null) {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaZakazanih/' + id_pacijenta,
            headers: { 
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"),
            },
            data : tretmani2,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista ZAKAZANIH tretmana prikazana");
            setTretmani2(response.data.tretmani); 
        })
        .catch((error) => {
            console.log(error);
            console.log("Lista tretmana NIJE prikazana");
        });
        }
    }

    
    

      return (
        <div className="pacijent_roditelj"> 

            <div className="dete_detalji">
                <div className='polje'>
                <p id='ime_prezime'>{pacijent.ime} {pacijent.prezime}</p> 
                </div>
                <div className="polje">
                <p><b>Poremecaj:</b> {pacijent.poremecaj} </p>
                </div>
                <div className="polje">
                <p><b>Paket:</b> {nazivPaketa} </p> 
                </div>
                <div className="polje">
                <p><b>Tretmana:</b> {brojTretmanaPaketa} </p> 
                </div>
            </div>

              <div className="dete_dugmad"> 

                <button className='dugme' onClick={toggleModal}>
                ZAKAŽITE TRETMAN
                </button>
                <button className='dugme' onClick={toggleModal2}>
                ODRAĐENI TRETMANI
                </button>
                <button className='dugme' onClick={toggleModal3}>
                ZAKAZANI TRETMANI
                </button>
                <button className='dugme' onClick={toggleModal4}>
                ZAUZETI TERMINI LOGOPEDA
                </button>
                
              </div>

              <div className="modalii">

              <div className="modali1">
                {modal && (
                <div className='modalR'>
                <div className='overlayR' onClick={toggleModal}></div>
                <div className='contentR'>
                  <p className='dete_naslov'>ZAKAŽITE TRETMAN: </p>

                  <div className="tretman_zakazi">
                    <input 
                        type="date"
                        id="datum_tretmana"
                        className="polje"
                        placeholder="Unesite datum..."
                        onInput={handleInput}
                        name="datum_tretmana"
                    />
                    <select name="vreme_tretmana" id="vreme_tretmana" onChange={handleInput}>
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
                    <button onClick={handleKreirajTretman}>
                        ZAKAŽITE
                    </button>
                    </div>
                </div>
                </div>
                )}

                {modal2 && (
                <div className='modalR'>
                <div className='overlayR' onClick={toggleModal2}></div>
                <div className='contentR'>
                    <p className='dete_naslov'>ODRAĐENI TRETMANI: </p> 
                { 
                    tretmani == null 
                    ? (<></>)
                    : (tretmani.map((tretman) => <TretmanDete tretman={tretman} key={tretman.id}/>))
                }
                </div>
                </div>
                )}

                {modal3 && (
                <div className='modalR'>
                <div className='overlayR' onClick={toggleModal3}></div>
                <div className='contentR'>
                    <p className='dete_naslov'>ZAKAZANI TRETMANI: </p>
                { 
                    tretmani2 == null 
                    ? (<></>)
                    : (tretmani2.map((tretman) => <TretmanDete tretman={tretman} key={tretman.id}/>))
                }
                </div>
                </div>
                )}

            </div>
            <div className="modali2">
                {modal4 && (
                <div className='modalR'>
                <div className='overlayR' onClick={toggleModal4}></div>
                <div className='contentR'>
                    <p className='dete_naslov'>ZAUZETI TERMINI: </p>
                
                {/*NA DUGME ODRADITI LISTA TRETMANA LOGOPEDA
                KREIRATI NOVI JSX FAJL ZA DATUM I VREME TRETMANA
                UBACITI MAPIRANJE TIH TRETMANA
                */}
                <div className="tretmani_header">
                  <p id='datum_kolona'>DATUM</p>
                  <p id='vreme_kolona'>VREME</p>
                </div>
                <div className="tretmani_logopeda">
                { 
                    tretmani4 == null 
                    ? (<></>)
                    : (tretmani4.map((tretman) => <TretmaniLogopeda tretman={tretman} key={tretman.id}/>))
                }</div>
                </div>
                </div>
                )}
            </div>

            </div>

            
            <Outlet/>
        </div>
      );

}

export default PacijentRoditelj;