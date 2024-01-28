import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2'

const TretmanPacijent = ({tretman}) => {

    let datum1 = tretman.datum_tretmana;
    let datum = moment(datum1).local().format('ll'); //srediti 

    const [tretmanData, setTretmanData] = useState({
        // datum_tretmana: tretman.datum_tretmana,
        // vreme_tretmana: tretman.vreme_tretmana,
        // naziv_tretmana: tretman.naziv_tretmana,
        // redni_broj_tretmana: tretman.redni_broj_tretmana,
        sadrzaj_tretmana: tretman.sadrzaj_tretmana
    });

    function handleInput(e) {
        let newTretmanData = tretmanData;
        newTretmanData[e.target.name] = e.target.value;
        setTretmanData(newTretmanData);
      }

    function dodajSadrzajTretmanu() {
        let id_tretmana = tretman.id; 
        console.log("id tretmana je: " + id_tretmana); 
        
        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/api/dodajSadrzaj/' + id_tretmana,
            headers: { 
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token"),  
            },
            data : tretmanData
          };
  
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log("Tretmanu uspesno dodat sadrzaj.");

            Swal.fire({
                    title: 'Uspesno dodat sadrzaj!',
                    showConfirmButton: true,
                  }).then(function(){
                    window.location.reload();
                    });
          })
          .catch((error) => {
            console.log(error);
            console.log("Tretmanu NIJE uspesno dodat sadrzaj."); 
          });
    }

    return (
        <div className="tretman">
            <div id='tret'>{tretman.naziv_tretmana} {tretman.redni_broj_tretmana} -- {datum} -- {tretman.vreme_tretmana}</div>
            {/* <p>{datum} - {tretman.vreme_tretmana} </p> */}
            {/* <p>Sadržaj tretmana:</p> */}
            {
              tretman.sadrzaj_tretmana == ' ' || tretman.sadrzaj_tretmana == ''
              ? (<div className="tretman_sadrzaj">
                  <textarea type="text" name="sadrzaj_tretmana" onInput={handleInput}/>
                  <button className="dugme_sadrzaj" onClick={dodajSadrzajTretmanu}>DODAJ SADRŽAJ</button>
                </div>)
              : (<div className="tretman_sadrzaj">
                <textarea type="text"  name="sadrzaj_tretmana" onInput={handleInput} defaultValue={tretman.sadrzaj_tretmana} />
                <button className="dugme_sadrzaj" onClick={dodajSadrzajTretmanu}>IZMENI SADRŽAJ</button> 
                </div>) 
            }
            {/* <input type="text" name="sadrzaj_tretmana" onInput={handleInput}/> */} 
        </div>
    );
}

export default TretmanPacijent;