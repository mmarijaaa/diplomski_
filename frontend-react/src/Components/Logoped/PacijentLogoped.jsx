import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanPacijent from './TretmanPacijent';
import Swal from 'sweetalert2';

const PacijentLogoped = ({pacijent}) => {

    const [pacijentData, setPacijentData] = useState({
        ime: pacijent.ime,
        prezime: pacijent.prezime,
        uzrast: pacijent.uzrast,
        poremecaj: pacijent.poremecaj, 
        //paket: pacijent.id_paketa.naziv_paketa,
      });

      let navigate = useNavigate();

      function handleInput(e) {
        let newPacijentData = pacijentData;
        newPacijentData[e.target.name] = e.target.value;
        setPacijentData(newPacijentData);
      } 


      //IZMENA PODATAKA O PACIJENTU
      const [imeP, setImeP] = useState();
      const [prezimeP, setPrezimeP] = useState();
      const [uzrastP, setUzrastP] = useState();
      const [poremecajP, setPoremecajP] = useState();

      function handleIzmenaPacijenta() {
        let id_pacijenta = pacijent.id;
        var config = {
          method: 'put',
          url: 'http://127.0.0.1:8000/api/izmenaPacijenta/' + id_pacijenta,
          headers: { 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),  
          },
          data : pacijentData
        };

        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("Pacijent uspesno izmenjen.");
          console.log(response.data.pacijent.ime);
          setPacijentData(response.data.pacijent);
          setImeP(response.data.pacijent.ime);
          setPrezimeP(response.data.pacijent.prezime);
          setUzrastP(response.data.pacijent.uzrast);
          setPoremecajP(response.data.pacijent.poremecaj);
          Swal.fire({
            title: 'Pacijent uspesno izmenjen!', 
          })
        })
        .catch((error) => {
          console.log(error);
          console.log("Pacijent NIJE uspesno izmenjen."); 
        });
      }

      //BRISANJE PACIJENTA
      const [pacijents, setPacijents] = useState();
      let id_logopeda = window.sessionStorage.getItem("user_id");
      
      function handleBrisanjePacijenta() {

        Swal.fire({
          title: "Da li sigurno želite da obrišete pacijenta?",
          // showDenyButton: true,
          confirmButtonText: "DA",
          showCancelButton: true,
          // denyButtonText: `NE`
        }).then((result) => {
          if (result.isConfirmed) {

        let id_pacijenta = pacijent.id;
        var config = {
          method: 'delete',
          url: 'http://127.0.0.1:8000/api/brisanjePacijenta/' + id_pacijenta,
          headers: { 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),  
          },
          
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("Pacijent obrisan.");
          // window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
        });

        Swal.fire("Pacijent obrisan.").then(function(){
          window.location.reload();
        });

          }  
          // else {
          // Swal.fire("Pacijent NIJE obrisan");
          // }
        });
      }

      //MODAL - IZMENA PACIJENTA 
      const[modal, setModal] = useState(false);

      function toggleModal() {
        setModal(!modal);
      }

      if(modal) {
        document.body.classList.add('active-modal')
      }else {
        document.body.classList.remove('active-modal')
      }

      //MODAL 2 - DETALJI PACIJENTA 
      const[modal2, setModal2] = useState(false);

      const [roditelj, setRoditelj] = useState();
      const [ime, setIme] = useState();
      const [prezime, setPrezime] = useState(); 
      
      const [paket, setPaket] = useState();
      const [nazivPaketa, setNazivPaketa] = useState();
      const [brojTretmanaPaketa, setBrojTretmanaPaketa] = useState(); 

      function toggleModal2() {
        //setModal2(!modal2);

      let id_roditelja_pacijenta = pacijent.id_roditelja;
      let id_paketa_pacijenta = pacijent.id_paketa;

      //roditelj
      var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/roditeljPacijenta/' + id_roditelja_pacijenta,
          headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
          },
          data : roditelj,
        };
        axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("PROBLEM???"); 
          console.log(response.data.roditelj);
          setIme(response.data.roditelj[0].ime);
          setPrezime(response.data.roditelj[0].prezime);
          console.log("Roditelj JESTE prikazan"); 
          setRoditelj(response.data.roditelj);  
        })
        .catch((error) => {
            console.log(error);
            console.log("Roditelj NIJE prikazan");
        }); 

        //paket
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/paketPacijenta/' + id_paketa_pacijenta,
          headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token"),
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


        setModal2(!modal2);
      }

      if(modal2) {
        document.body.classList.add('active-modal')
      }else {
        document.body.classList.remove('active-modal')
      }

    //MODAL 3 - ODRADJENI TRETMANI I ZAKAZANI TRETMANI
    const[modal3, setModal3] = useState(false);
    const [tretmani3, setTretmani3] = useState();
    const [tretmani4, setTretmani4] = useState();

    function toggleModal3() {
      setModal3(!modal3);
      let id_pacijenta = pacijent.id;

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
    
    }

    if(modal3) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    //MODAL 4 - ZAKAZANI TRETMANI
    const[modal4, setModal4] = useState(false);
    // const [tretmani4, setTretmani4] = useState();

    function toggleModal4() {
      setModal4(!modal4);
      let id_pacijenta = pacijent.id;

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
    }

    if(modal4) {
      document.body.classList.add('active-modal')
    }else {
      document.body.classList.remove('active-modal')
    }

    //MODAL 5 - LISTA DANASNJIH TRETMANA
     const[modal5, setModal5] = useState(false);
     const [tretmani5, setTretmani5] = useState();
 
     function toggleModal5() {
      setModal5(!modal5);
       let id_pacijenta = pacijent.id;
 
         if(tretmani5 == null) {
         var config = {
             method: 'get',
             url: 'http://127.0.0.1:8000/api/listaTretmanaDanasnjih/' + id_pacijenta,
             headers: { 
               'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
             },
             data : tretmani5,
           };
 
         axios(config)
         .then((response) => {
             console.log(JSON.stringify(response.data));
             console.log("Lista DANASNJIH tretmana prikazana"); 
             setTretmani5(response.data.tretmani); 
         })
         .catch((error) => {
             console.log(error);
             console.log("Lista tretmana NIJE prikazana");
         });
         }

         
     }
 
     if(modal5) {
       document.body.classList.add('active-modal')
     }else {
       document.body.classList.remove('active-modal')
     }
 
     function tretmaniPacijenta() {
        window.sessionStorage.setItem("id_pacijenta_logoped", pacijent.id);
        window.sessionStorage.setItem("ime_pac", pacijent.ime);
        window.sessionStorage.setItem("prezime_pac", pacijent.prezime); 
        navigate('/logoped/listaTretmanaPacijenta');
     }

      return (
        <div className="pacijenti">

            <div className="pacijent">
                <div className='pacijent_info'>
                  <div className="pac1">{pacijentData.ime} {pacijentData.prezime}</div> 
                  <div className="pac2">{pacijentData.uzrast} godina/e</div>
                  <div className="pac3">{pacijentData.poremecaj}</div>
                </div>
                <div className="pacijent_dugmad">
                
                    <button className="dugme" onClick={toggleModal2}>
                      DETALJI
                    </button>

                    <button  className="dugme" onClick={toggleModal}>
                      IZMENI
                    </button>

                    {/* <button className="dugme" onClick={toggleModal3}>
                      TRETMANI
                    </button> */}

                    <button className="dugme" onClick={tretmaniPacijenta}>
                      TRETMANI
                    </button>

                    <button className="dugme" onClick={handleBrisanjePacijenta}>
                      OBRIŠI 
                    </button>
                </div>
            </div>

            <div className="modali">

            {modal && (
                <div className='modal'>
                <div className='overlay' onClick={toggleModal}></div>
                <div className='content3'>

                    <p id='izm'>IZMENA PACIJENTA</p>

                    <div className='modalpolje'>
                    <input type="hidden" onInput={handleInput} name="id" value={pacijentData.id}/>
                    </div>
                    <div className='modalpolje'>
                    
                    <input type="text"  
                          name="ime" 
                          onInput={handleInput} 
                          defaultValue={pacijentData.ime} 
                           />
                    </div>
                    <div className="modalpolje">  
                    
                    <input type="text"  
                          name="prezime" 
                          onInput={handleInput} 
                          defaultValue={pacijentData.prezime}
                          />
                    </div>
                    <div className="modalpolje">
                    
                    <input type="text"  
                          name="uzrast" 
                          onInput={handleInput} 
                          defaultValue={pacijentData.uzrast}
                          /> 
                    </div>
                    
                    
                    <select name="poremecaj" onChange={handleInput} defaultValue={pacijentData.poremecaj} > 
                        <option value="Pervazivni razvojni poremecaji - autizam">Pervazivni razvojni poremecaji - autizam</option>
                        <option value="Afazija">Afazija</option>
                        <option value="Artikulacija">Artikulacija</option>
                        <option value="Disfazija">Disfazija</option>
                        <option value="Disgrafija">Disgrafija</option>
                        <option value="Egzekutivne funkcije">Egzekutivne funkcije</option>
                        <option value="Disleksija">Disleksija</option>
                        <option value="Fluentnost govora - mucanje">Fluentnost govora - mucanje</option>
                        <option value="Razvoj gradomotorickih sposobnosti">Razvoj gradomotorickih sposobnosti</option>
                        <option value="Agramatizam">Agramatizam</option>
                        <option value="Razvoj verbalne memorije">Razvoj verbalne memorije</option>
                    </select>
                    
                    <br></br>
              
                <div className='id_logopeda'>
                  <input type="hidden" onInput={handleInput} value={pacijentData.id_logopeda}/>
                </div>
                
                <div className="dgm">
                  <button className="dugme_izmena" onClick={handleIzmenaPacijenta}>
                    IZMENI
                  </button>
                </div>
              </div>
              </div>
              )}

              {modal2 && (
                <div className='modal'>
                <div className='overlay' onClick={toggleModal2}></div>
                <div className='content1'>

                <p id='izm'>DETALJI PACIJENTA</p>

                  <div className="pac_det">

                    <div className='polje'>
                    <p className='ppp'>Ime: </p> <p className='pp'>{pacijentData.ime}</p>
                    </div>
                    <div className="polje">
                    <p className='ppp'>Prezime: </p> <p className='pp'>{pacijentData.prezime}</p>
                    </div>
                    <div className="polje">
                    <p className='ppp'>Uzrast: </p> <p className='pp'>{pacijentData.uzrast} godina/e</p>
                    </div>
                    <div className="polje">
                    <p className='ppp'>Poremećaj: </p> <p className='pp'>{pacijentData.poremecaj}</p>
                    </div>
                    <div className="polje">
                    <p className='ppp'>Paket: </p> <p className='pp'>{nazivPaketa}, tretmana: {brojTretmanaPaketa}</p>
                    </div>
                    <div className="polje">
                    <p className='ppp'>Roditelj: </p> <p className='pp'>{ime} {prezime} </p>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {modal3 && (
                <div className='modal'>
                <div className='overlay' onClick={toggleModal3}></div>
                <div className='content2'>
                    <div className="tretman_pac">
                      <div id='tret_pac'>{pacijentData.ime} {pacijentData.prezime}</div>
                    </div>
                    
                  <div className="tretmani_svi">
                      
                      <div className="tretmani_odr">
                            <p id='izm'>ODRAĐENI TRETMANI:</p>
                            { 
                                tretmani3 == null 
                                ? (<></>)
                                : (tretmani3.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                            }
                      </div>
                      <div className="tretmani_zak">
                            <p id='izm'>ZAKAZANI TRETMANI:</p>
                            { 
                                tretmani4 == null  
                                ? (<></>)
                                : (tretmani4.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                            }
                      </div>
                  </div>
                </div>
                </div>
                )}

              {modal5 && (
                <div className='modal'>
                <div className='overlay' onClick={toggleModal5}></div>
                <div className='content'>
                    <p>Lista danasnjih tretmana: </p> 
                { 
                    tretmani5 == null 
                    ? (<></>)
                    : (tretmani5.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                }
                </div>
                </div>
                )}

              {modal4 && (
                <div className='modal'>
                <div className='overlay' onClick={toggleModal4}></div>
                <div className='content'>
                    <p>Lista zakazanih tretmana: </p>
                { 
                    tretmani4 == null 
                    ? (<></>)
                    : (tretmani4.map((tretman) => <TretmanPacijent tretman={tretman} key={tretman.id}/>))
                }
                </div>
                </div>
                )}

              </div>
             
        </div>
      );

}

export default PacijentLogoped;