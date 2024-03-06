import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PacijentRoditelj2 from './PacijentRoditelj2';
import Swal from 'sweetalert2';
import Loading2 from '../Loading2';

const Roditelj = ({ roditelj }) => {

  //LOADING
  const [loading2, setLoading2] = useState(false);

  const [roditeljData, setRoditeljData] = useState({
    ime: roditelj.ime,
    prezime: roditelj.prezime,
    korisnicko_ime: roditelj.korisnicko_ime,
    email: roditelj.email,
    broj_telefona: roditelj.broj_telefona
  });

  function handleInput(e) {
    let newRoditeljData = roditeljData;
    newRoditeljData[e.target.name] = e.target.value;
    setRoditeljData(newRoditeljData);
  }

  //MODAL - IZMENA PACIJENTA 
  const [modal, setModal] = useState(false);

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function toggleModalIzmena() {
    setModal(!modal);
    console.log("izmena");
  }

  function handleIzmenaRoditelja() {
    //console.log("izmena 2");
    let id_roditelja = roditelj.id;
    var config = {
      method: 'put',
      url: 'http://127.0.0.1:8000/api/izmenaRoditelja/' + id_roditelja,
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
      },
      data: roditeljData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Roditelj uspesno izmenjen.");
        setRoditeljData(response.data.roditelj);
        Swal.fire({
          title: 'Roditelj uspesno izmenjen!',
        })
      })
      .catch((error) => {
        console.log(error);
        console.log("Roditelj NIJE uspesno izmenjen.");
      });
  }

  function handleBrisanjeRoditelja() {
    //console.log("brisanje");

    Swal.fire({
      title: "Da li sigurno želite da obrišete roditelja?",
      // showDenyButton: true,
      confirmButtonText: "DA",
      showCancelButton: true,
      // denyButtonText: `NE`
    }).then((result) => {
      if (result.isConfirmed) {

        let id_roditelja = roditelj.id;
        var config = {
          method: 'delete',
          url: 'http://127.0.0.1:8000/api/brisanjeRoditelja/' + id_roditelja,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
          },

        };

        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Roditelj obrisan.");
            window.location.reload(false);

          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire("Roditelj obrisan.").then(function () {
          window.location.reload();
        });

      }
    });
  }

  const [deca, setDeca] = useState();
  let id_roditelja2 = roditelj.id;

  //LISTA DECE RODITELJA
  useEffect(() => {
    if (deca == null) {
      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/listaDece/' + id_roditelja2,
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),
        },
        data: deca,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("Lista dece prikazana");
          setDeca(response.data.deca);
          setLoading2(true);
        })
        .catch((error) => {
          console.log(error);
          console.log("Lista dece NIJE prikazana");
        });
    }
  }, []);

  return (
    <div className="roditelji">

      <div className="roditelj">

        <div className="rod_info">
          <div className="rod_ime">{roditeljData.ime} {roditeljData.prezime}</div>
          <div className="rod_kime">{roditeljData.korisnicko_ime}</div>
          <div className="rod_email">{roditeljData.email}</div>
          <div className="rod_tel">{roditeljData.broj_telefona}</div>
        </div>

        <div className="rod_deca">
          {
              loading2 ? (            
                deca == null
              ? (<></>)
              : (deca.map((pacijent) => <PacijentRoditelj2 pacijent={pacijent} key={pacijent.id} />))
              ) :
              (<Loading2/>) 
          }
        </div>

        <div className='rod_dugmad'>
          <button className='rod_dugme' onClick={toggleModalIzmena}>
            IZMENI
          </button>
          <button className='rod_dugme' onClick={handleBrisanjeRoditelja}>
            OBRIŠI
          </button>
        </div>

      </div>

      {modal && (
        <div className='modalL'>
          <div className='overlayL' onClick={toggleModalIzmena}></div>
          <div className='contentL'>

            <div className='modalpolje'>
              <input type="hidden" onInput={handleInput} name="id" value={roditeljData.id} />
            </div>

            <div className='modalpolje'>
              {/* <p>Ime: </p>  */}
              Ime:
              <input type="text"
                name="ime"
                onInput={handleInput}
                defaultValue={roditeljData.ime}
              />
            </div>
            <div className="modalpolje">
              {/* <p>Prezime: </p>  */}
              Prezime:
              <input type="text"
                name="prezime"
                onInput={handleInput}
                defaultValue={roditeljData.prezime}
              />
            </div>
            <div className="modalpolje">
              {/* <p>Korisnicko ime: </p> */}
              Korisnicko ime:
              <input type="text"
                name="korisnicko_ime"
                onInput={handleInput}
                defaultValue={roditeljData.korisnicko_ime}
              />
            </div>
            <div className="modalpolje">
              {/* <p>Email: </p> */}
              Email:
              <input type="text"
                name="email"
                onInput={handleInput}
                defaultValue={roditeljData.email}
              />
            </div>
            <div className="modalpolje">
              {/* <p>Broj telefona: </p> */}
              Broj telefona:
              <input type="text"
                name="broj_telefona"
                onInput={handleInput}
                defaultValue={roditeljData.broj_telefona}
              />
            </div>

            <div className="dugmeklasa">
              <button className="izmenadugme" onClick={handleIzmenaRoditelja}>
                IZMENI
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )

}

export default Roditelj;