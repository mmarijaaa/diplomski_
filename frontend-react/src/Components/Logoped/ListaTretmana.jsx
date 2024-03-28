import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pregled from './Pregled';
import Tretman from './Tretman';
import Swal from 'sweetalert2';
import arrow from '../Slike/arrow_back.png';
import Loading from '../Loading';

const ListaTretmana = () => {

  //LOADING 
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [pregledi, setPregledi] = useState();
  const [tretmani, setTretmani] = useState();
  const [modalP, setModalP] = useState(false);
  const [modalT, setModalT] = useState(false);

  var id_logopeda = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (pregledi == null) {
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/listaPregleda',
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
        },
        data: pregledi
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPregledi(response.data.data);
          setLoading(true);
          if (response.data.success == true) {
            setPregledi(response.data.data);
          } else {
            console.log("nema");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (tretmani == null) {
      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/listaTretmanaLogoped/' + id_logopeda,
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
        },
        data: tretmani
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setTretmani(response.data.data);
          setLoading2(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  },
    []);


  return (
    <div className="lista">

      <p id='lista_naslov'>LISTA PREGLEDA I TRETMANA</p>

      <div className="dugmadP">
        {/* <button className='dugmeP' onClick={preglediLista}>PREGLEDI</button>
            <button className='dugmeP' onClick={tretmaniLista}>TRETMANI</button> */}
      </div>

      <div className="lista_pregleda_tretmana">

        {
          loading && loading2 ?
            (pregledi == null && tretmani == null
              ? (<></>)
              :
              // (<div>
              //   {pregledi
              //     .slice()
              //     .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
              //     .map((pregled) => <Pregled pregled={pregled} key={pregled.id} />)}

              //   {tretmani
              //     .slice()
              //     .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
              //     .map((tretman) => <Tretman tretman={tretman} key={tretman.id} />)}
              // </div>)
              (<div className="lpt">
                {pregledi.concat(tretmani)
                  .slice()
                  .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
                  .map((tretman) => <Tretman tretman={tretman} key={tretman.id} />)}
              </div>)
            )
            :
            (<Loading />)
        }
      </div>
      {/*
        loading ? (
        pregledi == null
          ? (<></>)
          : (pregledi.map((pregled) => <Pregled pregled={pregled} key={pregled.id} />))
          ) :
            (<Loading/>) 
        */}

      {/*
        loading ? (
        tretmani == null
          ? (<></>)
          : (tretmani.map((tretman) => <Tretman tretman={tretman} key={tretman.id} />))
          ) :
            (<Loading/>) 
        */}


      {/* {modalP && (
                <div className='modalP'>
                <div className='overlayP' onClick={preglediLista}></div>
                <div className='contentP'>
                    <p className='dete_naslov'>PREGLEDI: </p> 

                    { 
                    pregledi == null 
                    ? (<></>)
                    : (pregledi.map((pregled) => <Pregled pregled={pregled} key={pregled.id}/>))
                    }
                
                </div>
                </div>
                )} */}

      {/* {modalT && (
                <div className='modalT'>
                <div className='overlayT' onClick={tretmaniLista}></div>
                <div className='contentT'>
                    <p className='dete_naslov'>TRETMANI: </p> 

                    { 
                    tretmani == null 
                    ? (<></>)
                    : (tretmani.map((tretman) => <Tretman tretman={tretman} key={tretman.id}/>))
                    }
               
                </div>
                </div>
                )} */}

    </div>
  )

}

export default ListaTretmana;