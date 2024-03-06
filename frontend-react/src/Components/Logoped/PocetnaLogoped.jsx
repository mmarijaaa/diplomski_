import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import lista from '../Slike/checklist.png';
import create from '../Slike/edit.png';
import logout from '../Slike/logout.png';
import user from '../Slike/user.png';
import write from '../Slike/write.png';
import '../stil.css';
import roditelj from '../Slike/roditelj.png';
import logopedIcon from '../Slike/logoped.png';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const PocetnaLogoped = ({ }) => {

  //LOADING
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [logoped, setLogoped] = useState();
  const [logopedIme, setLogopedIme] = useState();
  const [logopedPrezime, setLogopedPrezime] = useState();


  let id_logopeda = window.sessionStorage.getItem("user_id");

  useEffect(() => {
    if (logoped == null) {
      var config = {
        method: 'get',
        // url: 'http://127.0.0.1:8000/api/logoped/' + id_logopeda,
        url: 'http://127.0.0.1:8000/api/sviLogopedi/' + id_logopeda,
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
        },
        data: logoped,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("Logoped");
          setLogopedIme(response.data[0].ime);
          setLogopedPrezime(response.data[0].prezime);
        })
        .catch((error) => {
          console.log(error);
          console.log("Logopeda NEMA");
        });
    }
  }, []);

  function handleLogout() {
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/logout',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.setItem("auth_token", null);
        window.sessionStorage.setItem("user_id", null);
        window.sessionStorage.setItem("roditelj_id", null);
        console.log("Uspesno ste se izlogovali");
      })
      .catch((error) => {
        console.log(error);
      });

  }

  //KADA SE KREIRA NOVI RODITELJ BRISE SE ID STAROG RODITELJA
  function noviIdRoditelja() {
    window.sessionStorage.setItem("roditelj_id", null);
  }



  return (
    <div className='log_profil'>

      <div className="log_logoped">

        <div className="log_info">
          <img className="log_icon" src={logopedIcon} alt="" />
          <p>Logoped {logopedIme} {logopedPrezime}</p>
        </div>

        <div className='log_linkovi'>
          <div className="log_link_red">
            <img className="log_icon" src={lista} alt="" />
            <Link to='/logoped/listaPacijenata' className='log_link'>Lista pacijenata</Link>
          </div>
          <div className="log_link_red">
            <img className="log_icon" src={create} alt="" />
            <Link to='/logoped/kreirajPacijentaRoditelja' className='log_link'>Kreiraj pacijenta</Link>
          </div>
          <div className="log_link_red">
            <img className="log_icon" src={lista} alt="" />
            <Link to='/logoped/listaRoditelja' className='log_link'>Lista roditelja</Link>
          </div>
          <div className="log_link_red">
            <img className="log_icon" src={create} alt="" />
            <Link to='/logoped/kreirajRoditelja' onClick={noviIdRoditelja} className='log_link'>Kreiraj roditelja</Link>
          </div>
          {/* <div className="log_link_red">
                <img className="log_icon" src={write} alt="" />
                <Link to='/logoped/evidencijaTretmana' className='log_link'>Evidentiraj tretman</Link>
              </div> */}
          <div className="log_link_red">
            <img className="log_icon" src={lista} alt="" />
            <Link to='/logoped/listaZahteva' className='log_link'>Lista zahteva</Link>
          </div>
          <div className="log_link_red">
            <img className="log_icon" src={create} alt="" />
            <Link to='/logoped/kreirajZahtev' className='log_link'>Kreiraj zahtev</Link>
          </div>

          <div className="log_link_red">
            <img className="log_icon" src={lista} alt="" />
            <Link to='/logoped/listaTretmana' className='log_link'>Lista pregleda i tretmana</Link>
          </div>

          <div className="log_link_red">
            <img className="log_icon" src={create} alt="" />
            <Link to='/logoped/kreirajTretman' className='log_link'>Kreiraj tretman</Link>
          </div>
        </div>

        <div className="log_odjava">
          <div className="log_link_red">
            <img className="log_icon" src={logout} alt="" />
            <Link to='/prijava/prijavaLogopeda' onClick={handleLogout} className='log_link'>Odjava</Link>
          </div>
        </div>

      </div>

      <div className="log_outlet">
        <Outlet />
      </div>

    </div>
  );
};

export default PocetnaLogoped;
