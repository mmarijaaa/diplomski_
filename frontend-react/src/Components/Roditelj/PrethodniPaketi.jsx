import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TretmanDete2 from './TretmanDete2';
import moment from 'moment';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const PrethodniPaketi = () => {

    //LOADING
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    //TRENUTNI PAKET PACIJENTA SA SVIM INFORMACIJAMA
    const [paketiPac, setPaketiPac] = useState();
    var id_dete = window.localStorage.getItem("iddete");

    //USEEFFECT FUNCKIJA ZA ISPISIVANJE ZAVRSENIH TRETMANA
    useEffect(() => {

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketiZavrseni/' + id_dete,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),

            },
            data: paketiPac
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setPaketiPac(response.data.data);
                setLoading2(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //PRIKAZ TRETMANA ODABRANOG STAROG PAKETA
    const [tretmaniPak, setTretmaniPak] = useState();
    var id_pak_pac;

    function tretmaniPaketa(e) {
        id_pak_pac = e.target.value;
        //samo odradjeni tretmani
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaOdradjenih/' + id_dete + "/" + id_pak_pac,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token2"),
            },
            data: tretmaniPak,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("Lista SAMO ODRADJENIH tretmana prikazana");
                setTretmaniPak(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                console.log("Lista tretmana NIJE prikazana");
            });

    }

    return (
        <div className="prethodni_paketi">
            <div className='naslovi_dugmica'>PRETHODNI PAKETI</div>

            {loading2 ? (

                <div className="prethodni_paketi_lista">
                    <select
                        name="id_paketa_pacijenta"
                        id="dete_lista_paketa"
                        onChange={tretmaniPaketa}
                        defaultValue={"placeholder"}
                    >
                        <option value={"placeholder"}>Izaberite paket...</option>
                        {paketiPac == null
                            ? (<></>)
                            :
                            (paketiPac
                                .slice()
                                .sort((a, b) => new Date(a.datum_od) - new Date(b.datum_od))
                                .map(({ id, naziv_paketa, datum_od, datum_do, id_pacijenta, id_logopeda, created_at, updated_at }) =>
                                    <option value={id} >

                                        {naziv_paketa} ___ {moment(datum_od).local().format('ll')} - {moment(datum_do).local().format('ll')}

                                    </option>))
                        }
                    </select>
                </div>

            )
                : (<Loading2 />)
            }

            <div className="prethodni_paketi_tretmani">
                {
                    tretmaniPak == null
                        ? (<></>)
                        : (tretmaniPak
                            .slice()
                            .sort((a, b) => new Date(a.datum_tretmana) - new Date(b.datum_tretmana))
                            .map((tretman) => <TretmanDete2 tretman={tretman} key={tretman.id} />))
                }
            </div>
        </div>
    );
}

export default PrethodniPaketi;