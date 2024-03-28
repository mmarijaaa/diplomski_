import React from 'react'
import { useState, useEffect } from 'react'; import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

const Zahtev = ({ zahtev }) => {

    var odob = zahtev.odobren;
    var preg = zahtev.pregledan;
    const [zahtevOdob, setZahtevOdob] = useState();

    function promeni() {
        odob = 1;
        console.log(odob);

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/api/zahtevOdobren/' + zahtev.id,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
            },
            data: zahtevOdob
        };
        axios.request(config)
            .then((response) => {
                if (response.data.success == true) {
                    console.log("odobren zahtev !!!");
                    setZahtevOdob(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //************OBNOVA PAKETA********************

    const [obnova, setObnova] = useState();
    function obnovaModal() {
        setObnova(!obnova);
        console.log(zahtev.id);
        console.log(zahtev.pacijent.id);
    }

    var id_pacijenta = zahtev.pacijent.id;
    var id_paketa;
    var naziv_paketa;
    var id_logopeda = window.localStorage.getItem("user_id");

    //uzimanje id paketa iz select-a
    function handlePaket(e) {
        id_paketa = e.target.value;
        naziv_paketa = e.target.options[e.target.selectedIndex].text;
        //naziv_paketa = zahtev.info_pacijenta;
        console.log(id_paketa); 
    }

    const today = new Date();
    const mesec_danas = today.getMonth() + 1;
    const mesec_danas1 = today.getMonth() + 2;
    const godina_danas = today.getFullYear();
    const dan_danas = today.getDate();

    var trig1;
    var trig2;
    var trig3;
    var pakpacID;
    var datum_od = godina_danas + "-" + mesec_danas + "-" + dan_danas + " " + "00:00:00";
    var datum_do = godina_danas + "-" + mesec_danas1 + "-" + dan_danas + " " + "00:00:00";
    const [pacijentPak, setPacijentPak] = useState();
    const [pacPakID, setPacPakID] = useState();
    const [pakPacIzmena, setPakPacIzmena] = useState();
    const [paketPacijentaNov, setPaketPacijentaNov] = useState({
        datum_od: datum_od,
        datum_do: datum_do
    });



    //2024-01-08 00:00:00 

    const [obn1, setObn1] = useState(false);
    const [obn2, setObn2] = useState(false);
    const [obn3, setObn3] = useState(false);


    function obnovaPaketaPacijenta() {

        //izmena id paketa pacijenta
        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/api/izmenaPaketaPacijenta/' + id_pacijenta + "/" + id_paketa,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
            },
            data: pacijentPak
        };
        axios.request(config)
            .then((response) => {
                if (response.data.success == true) {
                    trig1 = true;
                    console.log("izmenjen paket pacijenta !!!");
                    setPacijentPak(response.data.pacijenti);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        //ucitavanje trenutnog paketa pacijenta
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/paketTrenutni/' + id_pacijenta,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),

            },
            data: pacPakID
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.data[0].id);

                //izmena kolone zavrsen paket kod paketa pacijenta
                var config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:8000/api/izmeniTrenutniPaket/' + response.data.data[0].id,
                    headers: {
                        'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
                    },
                    data: pakPacIzmena
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        console.log("izmenjen paket na zavrsen = 1");
                        setPakPacIzmena(response.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            })
            .catch((error) => {
                console.log(error);
            });

        //kreiranje novog paketa pacijenta
        var config = {
            method: 'post',
            // url: 'http://127.0.0.1:8000/api/kreirajNoviPaket/'+ naziv_paketa + '/' + id_pacijenta + '/' + id_logopeda + '/' + dat_od + '/' + dat_do,
            url: 'http://127.0.0.1:8000/api/kreirajNoviPaket/' + naziv_paketa + '/' + id_pacijenta + '/' + id_logopeda,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("auth_token"),
            },
            data: paketPacijentaNov,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setPaketPacijentaNov(response.data.paketi);
                console.log("napravljen novi paket pacijenta");
            })
            .catch((error) => {
                console.log(error);
            });

        Swal.fire({
            title: 'Paket obnovljen!'
        })

    }

    return (
        <div className="zahtev">

            <div className="odob_preg">

                <div className="zahtev_odobren">
                    {/* <input type="checkbox" onChange={promeni}/> */}
                    <label class="container">
                        {odob == 0 ?
                            (<div className="cb">
                                <div className="cbtxt">odobren</div>
                                <input type="checkbox" onChange={promeni} />
                                <svg viewBox="0 0 64 64" height="50px" width="50px">
                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                </svg>
                            </div>)
                            :
                            (<div className="cb">
                                <div className="cbtxt">odobren</div>
                                <input type="checkbox" checked="checked" onChange={promeni} />
                                <svg viewBox="0 0 64 64" height="50px" width="50px">
                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                </svg>
                            </div>)
                        }
                    </label>
                </div>
                <div className="zahtev_odobren">
                    {/* <input type="checkbox" onChange={promeni}/> */}
                    <label class="container">
                        {preg == 0 ?
                            (<div className="cb">
                                <div className="cbtxt">pregledan</div>
                                <input type="checkbox" />
                                <svg viewBox="0 0 64 64" height="50px" width="50px">
                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                </svg>
                            </div>)
                            :
                            (<div className="cb">
                                <div className="cbtxt">pregledan</div>
                                <input type="checkbox" checked="checked" />
                                <svg viewBox="0 0 64 64" height="50px" width="50px">
                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                </svg>
                            </div>)
                        }
                    </label>
                </div>

            </div>

            <div className="zahtev_sadrzaj">
                {/* <div className='ztip'>{zahtev.tip_zahteva}</div> */}
                <div className='zrod'> <b>Roditelj:</b> {zahtev.roditelj.ime} {zahtev.roditelj.prezime}</div>
                <div className='zpac'><b>Pacijent:</b> {zahtev.pacijent.ime} {zahtev.pacijent.prezime}</div>
                <div className='zinfo'><b>Novi paket: </b>{zahtev.info_pacijenta} </div>
            </div>

            <div className="zahtev_dugme_obnova" onClick={obnovaModal}>
                <button>OBNOVI PAKET</button>
            </div>

            {obnova && (
                <div className='omodal'>
                    <div className='ooverlay' onClick={obnovaModal}></div>
                    <div className='ocontent'>

                        <div className="obnova_naslov">
                            OBNOVA PAKETA / NOVI PAKET
                        </div>

                        <div className="obnova_pacijent">
                            Pacijent: {zahtev.pacijent.ime} {zahtev.pacijent.prezime}
                        </div>
                        <div className="obnova_paket">
                            <select name="id_paketa" id="paket" onChange={handlePaket} defaultValue={"placeholder"}>
                                <option value={"placeholder"}>Izaberi paket</option>
                                <option value="1">Paket 1 - 4 tretmana</option>
                                <option value="2">Paket 2 - 8 tretmana</option>
                                <option value="3">Paket 3 - 12 tretmana</option>
                                <option value="4">Paket 4 - 18 tretmana</option>
                                <option value="5">Paket 5 - 24 tretmana</option>
                            </select>
                            {/* <input 
                            type = 'text' 
                            value = {zahtev.info_pacijenta}
                            name="id_paketa" 
                            id="paket" 
                            onInput={handlePaket}
                            /> */}
                        </div>
                        <div className="obnova_dugme">
                            <button onClick={obnovaPaketaPacijenta}>OBNOVI PAKET</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Zahtev;