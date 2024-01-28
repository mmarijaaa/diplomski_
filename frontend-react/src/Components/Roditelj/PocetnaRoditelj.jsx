import React from 'react';
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

const PocetnaRoditelj = ({}) => {

    const[deca, setDeca] = useState();
    const[logoped,setLogoped] = useState();
    const[logopedIme,setLogopedIme] = useState();
    const[logopedPrezime,setLogopedPrezime] = useState();
    const[logopedID, setLogopedID] = useState();

    let id_roditelja = window.sessionStorage.getItem("roditelj_user_id");

    //LISTA DECE RODITELJA
    // useEffect(() => {
      useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaDece/' + id_roditelja,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
            },
            data : deca,
          };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Lista dece prikazana");
            window.sessionStorage.setItem("id_logopeda_pacijenta", response.data.deca[0].id_logopeda);
            setDeca(response.data.deca); 
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
            'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token2"), 
          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          window.sessionStorage.setItem("auth_token2",null);
          window.sessionStorage.setItem("roditelj_user_id",null);
          console.log("Uspesno ste se izlogovali");
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

    //RODITELJ INFORMACIJE
    const [roditelj, setRoditelj] = useState();
    const [ime, setIme] = useState();
    const [prezime, setPrezime] = useState(); 
    let id_logopeda;

    useEffect(() => {
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/roditelj/' + id_roditelja,
        headers: { 
          'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
        },
        data : roditelj,
      };
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data.roditelj);
        setIme(response.data.roditelj[0].ime);
        setPrezime(response.data.roditelj[0].prezime);

        setLogopedID(response.data.roditelj[0].id_logopeda);
        id_logopeda = response.data.roditelj[0].id_logopeda;
        console.log(id_logopeda);
        console.log("Roditelj JESTE prikazan"); 
        setRoditelj(response.data.roditelj);  

        //INFO LOGOPEDA U MENIJU
        if(logoped == null) { 
          var config = {
              method: 'get',
              url: 'http://127.0.0.1:8000/api/logoped/' + id_logopeda, 
              headers: { 
                'Authorization': 'Bearer '+window.sessionStorage.getItem("auth_token2"),
              },
              data : logoped,
            };
            axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLogopedIme(response.data.logoped[1].ime);  
                setLogopedPrezime(response.data.logoped[1].prezime);  
            })
            .catch((error) => {
                console.log(error);
                console.log("Logopeda NEMA");
            });
            }
        

      })
      .catch((error) => {
          console.log(error);
          console.log("Roditelj NIJE prikazan");
      }); 
    }, []);

    


    return ( 
        <div className='log_profil'>
          <div className="log_logoped">

            <div className="log_info">
              <img className="log_icon" src={roditeljIcon} alt="" /> 
              <p>{ime} {prezime}</p>  
            </div>

            <div className='log_linkovi'>
              {/* <div className="log_link_red">
                <img className="log_icon" src={lista} alt="" />
                <Link to='/roditelj/deca' className='log_link'>Tretmani</Link>
              </div> */}
              {/* <div className="log_link_red">
                <img className="log_icon" src={phone} alt="" />
                <Link to='/roditelj/kontaktLogopeda' className='log_link' onClick={kontakt}>Kontakt logopeda</Link> 
              </div> */}

              {/* <div className="deca_linkovi">
                  {
                      deca == null 
                      ? (<></>)
                      : (deca.map((pacijent) => <PacijentRoditelj2 pacijent={pacijent} key={pacijent.id}/>))
                  }
              </div> */}

              
              
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
                    061/1111-222
                  </div>  
                </div>

              <div className='kont_info'>
                <img className="log_icon" src={email} alt="" />
                  <div className="knt">
                    <b>Email:</b> <br></br>
                    <div id='kont_email_log'>{logopedIme}{logopedPrezime}@gmail.com</div>
                  </div> 
                </div> 
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
            {/* <h1></h1> */}
            {/* <div className="roditelj_deca">
            {
                deca == null 
                ? (<></>)
                : (deca.map((pacijent) => <PacijentRoditelj pacijent={pacijent} key={pacijent.id}/>))
            }
            </div> */}
            <div className="deca_linkovi">
                  {
                      deca == null 
                      ? (<></>)
                      : (deca.map((pacijent) => <PacijentRoditelj2 pacijent={pacijent} key={pacijent.id}/>))
                  }
              </div>
            <Outlet/>
          </div> 
          
        </div>
    );
};

export default PocetnaRoditelj;
