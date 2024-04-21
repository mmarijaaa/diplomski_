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
  }

  function handleIzmenaRoditelja() {
    let id_roditelja = roditelj.id;
    var config = {
      method: 'put',
      url: 'http://127.0.0.1:8000/api/izmenaRoditelja/' + id_roditelja,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
      },
      data: roditeljData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Roditelj uspesno izmenjen.");
        Swal.fire({
          title: 'Roditelj uspešno ažuriran!',
        })
      })
      .catch((error) => {
        console.log(error);
        console.log("Roditelj NIJE uspesno izmenjen.");
      });
  }

  function handleBrisanjeRoditelja() {

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
            'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
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
          'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
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


  //KREIRANJE PACIJENTA - DETETA
  //MODAL - IZMENA PACIJENTA 
  const [modalDete, setModalDete] = useState(false);

  if (modalDete) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  //KREIRANJE PACIJENTA - DETETA
  function toggleModalKreirajPacijenta() {
    setModalDete(!modalDete);
    console.log("kreiranje");
  }
  const [porukaGreske, setPorukaGreske] = useState();
 
  const [pacijentData, setPacijentData] = useState({
    ime: "",
    prezime: "",
    uzrast: "",
    poremecaj: "",
    id_roditelja: "",
    id_logopeda: "",
    id_paketa: ""
  });
  
  function handleKreirajPacijenta(e) {

    e.preventDefault();

    let id_paketa = document.getElementById("paket").value;

    console.log(id_paketa);

    
  };

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
              (<Loading2 />)
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

      {modalDete && (
        <div className='modalL'>
          <div className='overlayL' onClick={toggleModalKreirajPacijenta}></div>
          <div className='contentL'>

            <input
              type="text"
              id="ime_pacijenta"
              className="polje"
              placeholder="Unesite ime pacijenta..."
              onInput={handleInput}
              name="ime"

              autoComplete="off"
            />

            <input
              type="text"
              id="prezime_pacijenta"
              className="polje"
              placeholder="Unesite prezime pacijenta..."
              onInput={handleInput}
              name="prezime"

              autoComplete="off"
            />

            <input
              type="text"
              id="uzrast_pacijenta"
              className="polje"
              placeholder="Unesite uzrast pacijenta..."
              onInput={handleInput}
              name="uzrast"

              autoComplete="off"
            />

            <select name="poremecajj" onChange={handleInput} defaultValue={"placeholder"} multiple>
              {/* <option value={"placeholder"}>Izaberi poremećaj</option> */}
              <option value="Pervazivni razvojni poremecaji - autizam">Pervazivni razvojni poremecaji - autizam</option>
              <option value="Afazija">Afazija</option>
              <option value="Artikulacija">Artikulacija</option>
              <option value="Disfazija">Disfazija</option>
              <option value="Disgrafija">Disgrafija</option>
              <option value="Egzekutivne funkcije">Egzekutivne funkcije</option>
              <option value="Disleksija">Disleksija</option>
              <option value="Fluentnost govora - mucanje">Fluentnost govora - mucanje</option>
              <option value="Razvoj grafomotorickih sposobnosti">Razvoj grafomotorickih sposobnosti</option>
              <option value="Agramatizam">Agramatizam</option>
              <option value="Razvoj verbalne memorije">Razvoj verbalne memorije</option>
              <option value="Savladavanje školskog gradiva">Savladavanje školskog gradva</option>
            </select>

            <input
              type="text"
              name="poremecaj"
              id="poremecaj_pacijenta"
              className="polje"
              placeholder="Poremećaji pacijenta..."
              onInput={handleInput}
            />

            <select name="id_paketa" id="paket" onChange={handleInput} defaultValue={"placeholder"}>
              <option value={"placeholder"}>Izaberi paket</option>
              <option value="1">Paket 1 - 4 tretmana</option>
              <option value="2">Paket 2 - 8 tretmana</option>
              <option value="3">Paket 3 - 12 tretmana</option>
              <option value="4">Paket 4 - 18 tretmana</option>
              <option value="5">Paket 5 - 24 tretmana</option>
            </select>

            {/* <h6>{porukaGreske}</h6> */}

            <div className="dugmeklasa">
              <button className="izmenadugme" onClick={handleKreirajPacijenta}>
                KREIRAJ PACIJENTA
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )

}

export default Roditelj;