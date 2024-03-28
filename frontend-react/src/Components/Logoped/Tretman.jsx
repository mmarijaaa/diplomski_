import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


const Tretman = ({ tretman }) => {

    return (

        <div className="pregled_tretman">

            {tretman.naziv_tretmana == "Pregled"
                ?
                (
                    <div className="tpLista">
                        <div className="tp1">{tretman.naziv_tretmana} </div>
                        <div className="tp2">{moment(tretman.datum_tretmana).local().format('ll')} </div>
                        <div className="tp3">{tretman.vreme_tretmana} </div>
                        <div className="tp4"> Roditelj: {tretman.sadrzaj_tretmana}</div>
                        <div className="tp5"> Prvi pregled</div>
                    </div>
                )
                :
                (<div className="tpLista">
                    <div className="tp1"> {tretman.naziv_tretmana}</div>
                    <div className="tp2"> {moment(tretman.datum_tretmana).local().format('ll')} </div>
                    <div className="tp3"> {tretman.vreme_tretmana} </div>
                    <div className="tp4"> Pacijent: {tretman.pacijent.ime} {tretman.pacijent.prezime} </div>
                    <div className="tp5"> {tretman.pacijent.poremecaj} </div>
                </div>)
            }

        </div>
    )

}

export default Tretman; 