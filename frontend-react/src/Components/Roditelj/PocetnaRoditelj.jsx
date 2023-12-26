import React from 'react';
import PacijentRoditelj from './PacijentRoditelj';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import logout from '../Slike/logout.png'; 
import user from '../Slike/user.png'; 
import lista from '../Slike/checklist.png'; 
import phone from '../Slike/phone.png'; 
import Deca from './Deca';

const PocetnaRoditelj = ({}) => {

    const [deca, setDeca] = useState();

    let id_roditelja = window.sessionStorage.getItem("roditelj_user_id");

    //LISTA DECE RODITELJA
    // useEffect(() => {
    function kontakt() {
        if(deca == null) {
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
        }
      }
    // }, [deca]);
 

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
        console.log("Roditelj JESTE prikazan"); 
        setRoditelj(response.data.roditelj);  
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
              <img className="log_icon" src={user} alt="" /> 
              <p>{ime} {prezime}</p>  
            </div>

            <div className='log_linkovi'>
              <div className="log_link_red">
                <img className="log_icon" src={lista} alt="" />
                <Link to='/roditelj/deca' className='log_link'>Tretmani</Link>
              </div>
              <div className="log_link_red">
                <img className="log_icon" src={phone} alt="" />
                <Link to='/roditelj/kontaktLogopeda' className='log_link' onClick={kontakt}>Kontakt logopeda</Link> 
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
            <Outlet/>
          </div> 
          
        </div>
    );
};

export default PocetnaRoditelj;
