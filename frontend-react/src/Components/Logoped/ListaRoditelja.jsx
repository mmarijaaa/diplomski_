import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Roditelj from './Roditelj';
import Loading from '../Loading';

const ListaRoditelja = () => {

  //LOADING 
  const [loading, setLoading] = useState(false);

  const [roditelji, setRoditelji] = useState();

  let id_logopeda = window.localStorage.getItem("user_id");


  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/listaRoditeljaLogopeda/' + id_logopeda,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
      },
      data: roditelji,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Roditelji prikazani");
        setRoditelji(response.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        console.log("Roditelji NISU prikazani");
      });

  }, []);

  const [search, setSearch] = useState('');
  console.log(search);

  return (
    <div className="lista">

      <p id='lista_naslov'>LISTA RODITELJA</p>
      
      <div className='pretraga'>
        <input type='text'
          className='pretraga'
          placeholder='Pretraži roditelje'
          onChange={(e) => setSearch(e.target.value)}>
        </input></div>

      <div className="lista_roditelja">

        {
          loading ? (
            roditelji == null
              ? (<></>)
              : roditelji.filter((roditelj) => {
                return search.toLowerCase() === ''
                  ? roditelj
                  : (roditelj.ime.toLowerCase().includes(search)
                    || roditelj.prezime.toLowerCase().includes(search)
                    || roditelj.korisnicko_ime.toLowerCase().includes(search));
              }).map((roditelj) => (

                <Roditelj roditelj={roditelj} key={roditelj.id} />

              ))
          ) :
            (<Loading />)
        }

      </div>
    </div>
  )

}

export default ListaRoditelja;