import React, { useReducer } from 'react'
import Zahtev from './Zahtev';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const ListaZahteva = () => {

  //LOADING 
  const [loading, setLoading] = useState(false);

  const [zahtevi, setZahtevi] = useState();
  const [zahtevID, setZahtevID] = useState();
  const [zahtevPacID, setZahtevPacID] = useState();
  let id_logopeda = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (zahtevi == null) {
      let config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/sviZahtevi/' + id_logopeda,
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
        },
        data: zahtevi
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data));
          setZahtevi(response.data.data);
          setLoading(true);
          if (response.data.success == true) {
            setZahtevi(response.data.data);
            setZahtevID(response.data.data[0].id);
            setZahtevPacID(response.data.data[0].id_pacijenta); 
          } else {
            // Swal.fire({
            //     title: 'Nemate zahteva!', 
            // }); 
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
    []);

  const [search, setSearch] = useState('');

  return (
    <div className="lista">

      <p id='lista_naslov'>LISTA ZAHTEVA ZA OBNOVU PAKETA</p>
      <div className='zahtevi'>
        {
          loading ? (
          zahtevi == null
            ? (<></>)
            : zahtevi.filter((zahtev) => {
              return search.toLowerCase() === ''
                ? zahtev
                : (zahtev.tip_zahteva.toLowerCase().includes(search));
            }).map((zahtev) => (

              <Zahtev zahtev={zahtev} key={zahtev.id} />

            )) 
            ) :
            (<Loading/>) 
        }
      </div>

    </div>
  )

}

export default ListaZahteva; 