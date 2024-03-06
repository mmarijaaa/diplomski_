import React, { useTransition } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import TretmaniLogopeda from './TretmaniLogopeda';
import Loading from '../Loading';

const ZakazivanjeTretmana = () => {

    //LOADING
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    let navigate = useNavigate();

    const [tretmanData, setTretmanData] = useState({
        datum_tretmana: "",
        vreme_tretmana: "",
        redni_broj_tretmana: "",
        id_pacijenta: "",
        id_logopeda: "",
        id_paketa: "",
    });

    var id_logopeda = window.sessionStorage.getItem("id_logopeda_pacijenta");
    var id_dete = window.sessionStorage.getItem("iddete");
    var redni_broj_tretmana;
    var id_paketa = window.sessionStorage.getItem("id_paketa");
    var id_pak_pac = window.sessionStorage.getItem("id_trenutnog_paketa");
    var id_rod = window.sessionStorage.getItem("roditelj_user_id");

    //USEEFFECT ZA ISPISIVANJE LISTE DATUMA ZAKAZANIH PAKETA 
    const [zakazaniTretmani, setZakazaniTretmani] = useState();
    const [zakazaniTretmaniLogoped, setZakazaniTretmaniLogoped] = useState();
    const [tretmaniSvi, setTretmaniSvi] = useState();

    useEffect(() => {

        //lista zakazanih tremana pacijenta
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaZak/' + id_dete + "/" + id_pak_pac,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
            },
            data: zakazaniTretmani,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("Lista SAMO ZAKAZANIH tretmana prikazana");
                setZakazaniTretmani(response.data.data);
                setLoading1(true);
            })
            .catch((error) => {
                console.log(error);
                console.log("Lista tretmana NIJE prikazana");
            });


        //lista zakazanih tretmana logopeda
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTretmanaLog/' + id_logopeda,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
            },
            data: zakazaniTretmaniLogoped,
        };
        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("Lista ZAKAZANIH tretmana LOGOPEDA");
                setZakazaniTretmaniLogoped(response.data.data);
                setLoading2(true);
            })
            .catch((error) => {
                console.log(error);
                console.log("Lista tretmana LOGOPEDA NIJE");
            });

        //lista svih tretmana trenutnih paketa
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaTret/' + id_dete + "/" + id_pak_pac,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
            },
            data: tretmaniSvi,
        };
        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.data));
                console.log("Lista SVIH tretmana prikazana");
                setTretmaniSvi(response.data.data);
                setLoading3(true);
            })
            .catch((error) => {
                console.log(error);
                console.log("Lista SVIH tretmana NIJE prikazana");
            });
    }, []);

    var datum_odabran;
    var vreme_odabrano;
    var duzina_liste_zakazanih;
    var datum_poslednjeg_tretmana;

    //FUNKCIJA ZA UZIMANJE PODATAKA SA FORME
    function handleInput(e) {
        let newTretmanData = tretmanData;
        newTretmanData[e.target.name] = e.target.value;

        //uzimanje odabranih vrednosti za datum i vreme
        //dodavanje promenljivima radi dalje provere
        if (e.target.name == 'datum_tretmana') {
            datum_odabran = e.target.value;
        }
        if (e.target.name == 'vreme_tretmana') {
            vreme_odabrano = e.target.value;
        }
        console.log(datum_odabran);
        console.log(vreme_odabrano);

        //izvlacenje dana, meseca i godine iz odabranog datuma
        var dan_naziv = moment(datum_odabran).format('dddd'); //dan u nedelji
        const dan = moment(datum_odabran).format('D');
        const mesec = moment(datum_odabran).format('M');
        const godina = moment(datum_odabran).format('YYYY');
        const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 

        console.log(dan_naziv);
        console.log("dan-" + dan);
        console.log("mesec-" + mesec);
        console.log("godina-" + godina);
        console.log("ceo datum-" + odabran_dan);

        //izvlacenje danasnjeg datuma
        const today = new Date();
        const mesec_danas = today.getMonth() + 1;
        const godina_danas = today.getFullYear();
        const dan_danas = today.getDate();
        const danasnji_dan = moment(today).format('L'); //12/04/2023 

        console.log("dan-" + dan_danas);
        console.log("mesec-" + mesec_danas);
        console.log("godina-" + godina_danas);
        console.log("ceo datum-" + danasnji_dan);

        //prebacivanje dana u number ???
        let dan_number = Number(dan);
        let dan_danas_number = Number(dan_danas);
        console.log(dan_number);
        console.log(dan_danas_number);

        //provera da li je odabran vikend
        if (dan_naziv == "Sunday" || dan_naziv == "Saturday") {
            console.log("Ne radimo vikendom!");
            Swal.fire({
                title: 'Ne radimo vikendom!',
            })
        }

        //provera da li se poklapaju datumi
        if (godina == godina_danas) {
            if (mesec == mesec_danas) {
                if (dan == dan_danas) {
                    console.log("DANAS NEMA ZAKAZIVANJA !!!");
                    Swal.fire({
                        title: 'Danas ne može da se zakaže tretman!',
                    })
                }
                else if (dan_danas > dan) {
                    console.log("DATUM JE PROSAO !!!");
                    Swal.fire({
                        title: 'Datum je prošao!',
                    })
                }
                else {
                    console.log("MOZE DA SE ZAKAZE !!!");
                }
            }
            else if (mesec_danas > mesec) {
                console.log("DATUM JE PROSAO !!!");
                Swal.fire({
                    title: 'Datum je prošao!',
                })
            }
            else {
                console.log("MOZE DA SE ZAKAZE !!!");
            }
        }
        else if (godina_danas < godina) {
            console.log("MOZE DA SE ZAKAZE !!!");
        }
        else if (godina_danas > godina) {
            console.log("DATUM JE PROSAO !!!");
            Swal.fire({
                title: 'Datum je prošao!',
            })
        }
        else {
            setTretmanData(newTretmanData);
        }

        //izvlacenje poslednje zakazanog datuma

        duzina_liste_zakazanih = zakazaniTretmani.length;
        if (duzina_liste_zakazanih != 0) {

            datum_poslednjeg_tretmana = zakazaniTretmani[duzina_liste_zakazanih - 1].datum_tretmana;

            var pt_dan = moment(datum_poslednjeg_tretmana).format('D');
            var pt_mesec = moment(datum_poslednjeg_tretmana).format('M');
            var pt_godina = moment(datum_poslednjeg_tretmana).format('YYYY');
            let pt_dan_number = Number(pt_dan);

            console.log("dan-" + pt_dan);
            console.log("mesec-" + pt_mesec);
            console.log("godina-" + pt_godina);

            if (pt_godina == godina) {

                if (pt_mesec == mesec) {

                    //ako je odabran datum istog meseca manji od poslednje zakazanog
                    if (dan_number < pt_dan_number) {
                        console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
                        Swal.fire({
                            title: 'Odabrani datum nije moguće zakazati, jer je pre poslednje zakazanog tretmana!',
                        })
                    }
                    else if (dan_number > pt_dan_number) {
                        console.log("MOZE TAJ DATUM");
                    }
                    else {
                        console.log("VEC IMATE ZAKAZAN TRETMAN TOG DANA");
                        Swal.fire({
                            title: 'Već imate zakazan tretman tog datuma!',
                        })
                    }
                }
                else if (pt_mesec < mesec) {
                    console.log("MOZE TAJ DATUM");
                }
                else {
                    console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
                    Swal.fire({
                        title: 'Odabrani datum nije moguće zakazati, jer je pre poslednje zakazanog tretmana!',
                    })
                }
            }
            else if (pt_godina < godina) {
                console.log("MOZE TAJ DATUM");
            }
            else if (pt_godina > godina) {
                console.log("NE MOZE DATUM PRE POSLEDNJE ZAKAZANOG");
            }
        }

        //izvlacenje datuma zavrsetka trenutnog paketa
        const dat_do = window.sessionStorage.getItem("datum_do");
        var dan_do = moment(dat_do).format('D');
        var mesec_do = moment(dat_do).format('M');
        var godina_do = moment(dat_do).format('YYYY');
        const datum_do = moment(dat_do).format('L'); //12/04/2023

        console.log("dan do-" + dan_do);
        console.log("mesec do -" + mesec_do);
        console.log("godina do-" + godina_do);
        console.log("datum do -" + datum_do);

        if (godina == godina_do) {
            if (mesec == mesec_do) { 
                if (dan_number > dan_do) {
                    Swal.fire({
                        title: 'Odabrani datum je van paketa!',
                    })
                } else {
                    console.log("moze taj dan");
                }
            } else if (mesec > mesec_do) {
                Swal.fire({
                    title: 'Odabrani datum je van paketa!',
                })
            } else {
                console.log("moze taj dan");
            }
        }

    }


    //*******FUNKCIJA ZA KREIRANJE TRETMANA*******
    var zakazi;
    var zakaziV;
    var duzina_liste_svih_tret;
    var ukupno_tretmana = window.sessionStorage.getItem("broj_tretmana");

    function handleKreirajTretman() {

        //izvlacenje dana, meseca i godine iz odabranog datuma
        const dan = moment(datum_odabran).format('D');
        const mesec = moment(datum_odabran).format('M');
        const godina = moment(datum_odabran).format('YYYY');
        const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 

        var duzina_liste_zak_log = zakazaniTretmaniLogoped.length;
        var datum_liste;
        var vreme_liste;
        var dan_num = Number(dan);

        if (duzina_liste_zak_log != 0) {

            for (let i = 0; i < duzina_liste_zak_log; i++) {
                datum_liste = zakazaniTretmaniLogoped[i].datum_tretmana;
                vreme_liste = zakazaniTretmaniLogoped[i].vreme_tretmana;
                const mesec_liste = moment(datum_liste).format('M');
                const godina_liste = moment(datum_liste).format('YYYY');
                const dan_liste = moment(datum_liste).format('D');

                console.log("duzina = " + duzina_liste_zak_log);
                console.log("datum liste = " + datum_liste);
                console.log("vreme liste = " + vreme_liste);

                if (dan_num == dan_liste &&
                    mesec == mesec_liste &&
                    godina == godina_liste &&
                    vreme_odabrano == vreme_liste) {
                    console.log("TRETMAN JE ZAUZET !!!!!!!");
                    zakazi = false;
                    break;
                }
                else {
                    zakazi = true;
                    console.log("MOZE MOZE");
                }
            }
        } else {
            zakazi = true;
        }

        if (vreme_odabrano == "Vreme") {
            zakaziV = false;
        } else {
            zakaziV = true;
        }

        //broj tretmana
        duzina_liste_svih_tret = tretmaniSvi.length;
        console.log(duzina_liste_svih_tret);

        if (duzina_liste_svih_tret != 0) {
            for (let i = 0; i <= duzina_liste_svih_tret; i++) {
                if (duzina_liste_svih_tret < ukupno_tretmana) {
                    if (i < duzina_liste_svih_tret) {
                        continue;
                    } else {
                        redni_broj_tretmana = i + 1;
                    }

                } else {
                    console.log("Broj tretmana potrošen!!!");
                    Swal.fire({
                        title: 'Broj tretmana je potrošen!',
                        text: 'Da li želite da započnete novi paket tretmana?',
                        showDenyButton: true,
                        confirmButtonText: 'DA',
                        denyButtonText: 'NE',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: 'Odaberite paket',
                                input: 'select',
                                inputOptions: {
                                    'Isti paket': 'Isti paket',
                                    'Paket 1 - 4 tretmana': 'Paket 1 - 4 tretmana',
                                    'Paket 2 - 8 tretmana': 'Paket 2 - 8 tretmana',
                                    'Paket 3 - 12 tretmana': 'Paket 3 - 12 tretmana',
                                    'Paket 4 - 18 tretmana': 'Paket 4 - 18 tretmana',
                                    'Paket 5 - 24 tretmana': 'Paket 5 - 24 tretmana',
                                },
                                confirmButtonText: 'Dalje',
                                showCancelButton: true,
                                cancelButtonText: "Nazad",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    zahtev = result.value;
                                    Swal.fire({
                                        title: 'Nakon što pošaljete zahtev, kada ga Vaš logoped odobri, dobićete poruku o odobrenom zahtevu i moći ćete da zakažete prvi tretman Vašeg deteta!',
                                        confirmButtonText: 'Pošaljite zahtev',
                                        showCancelButton: true,
                                        cancelButtonText: "Nazad",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            console.log(zahtev);

                                            //kreiranje zahteva
                                            var config = {
                                                method: 'post',
                                                url: 'http://127.0.0.1:8000/api/kreirajZahtevObnova/' + id_logopeda + '/' + id_dete + '/' + id_rod + '/' + zahtev,
                                                headers: {
                                                    'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
                                                },
                                                data: zahtevObnova,
                                            };

                                            axios(config)
                                                .then((response) => {
                                                    console.log(JSON.stringify(response.data));
                                                    if (response.data.success == true) {
                                                        setZahtevObnova(response.data.data);
                                                        console.log("poslat zahtev")
                                                        Swal.fire({
                                                            title: "Zahtev je poslat!",
                                                        })
                                                    }
                                                    else {
                                                        console.log("Zahtev NIJE uspesno kreiran!");
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        }
                                    })
                                }
                            })

                        } else {
                            Swal.fire({
                                title: 'Hvala Vam na ukazanom poverenju!'
                            })
                        }
                    })
                }
            }
        }
        // else if(duzina_liste_svih_tret == 0 && zakazi == true) {
        //     redni_broj_tretmana = 1;
        //     var config = {
        //         method: 'post',
        //         url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_dete + '/' + id_paketa + '/' + 1 +  '/' + id_pak_pac ,
        //         headers: { 
        //         'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
        //         },
        //         data: tretmanData,
        //     }
        //     axios.request(config)
        //     .then((response) => {

        //         if(response.data.success == true) {
        //             console.log(JSON.stringify(response.data.success));
        //             console.log("Tretman kreiran!");
        //             Swal.fire({
        //                 title: 'Uspešno zakazan tretman!',
        //             }).then(function(){
        //                 navigate("/roditelj");
        //             });
        //         } else {
        //             Swal.fire({
        //                 title: 'Odaberite i datum i vreme!',
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         console.log("Tretman NIJE kreiran.");
        //         console.log("Broj tretmana potrosen!!!");
        //      });

        // }

        //ako su ispunjeni uslovi onda moze da se zakaze
        //ako se ne poklapa izabrani datum sa vec postojecim 
        if (zakaziV == true) {
            if (zakazi == true) {

                if (duzina_liste_svih_tret == 0) {
                    redni_broj_tretmana = 1;
                    var config = {
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_dete + '/' + id_paketa + '/' + 1 + '/' + id_pak_pac,
                        headers: {
                            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
                        },
                        data: tretmanData,
                    }
                    axios.request(config)
                        .then((response) => {

                            if (response.data.success == true) {
                                console.log(JSON.stringify(response.data.success));
                                console.log("Tretman kreiran!");
                                Swal.fire({
                                    title: 'Uspešno zakazan tretman!',
                                }).then(function () {
                                    navigate("/roditelj");
                                });
                            } else {
                                Swal.fire({
                                    title: 'Odaberite i datum i vreme!',
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            console.log("Tretman NIJE kreiran.");
                            console.log("Broj tretmana potrosen!!!");
                        });

                }

                else if (duzina_liste_svih_tret != 0) {

                    var config = {
                        method: 'post',
                        url: 'http://127.0.0.1:8000/api/kreiranjeTretmana/' + id_logopeda + '/' + id_dete + '/' + id_paketa + '/' + redni_broj_tretmana + '/' + id_pak_pac,
                        headers: {
                            'Authorization': 'Bearer ' + window.sessionStorage.getItem("auth_token2"),
                        },
                        data: tretmanData,
                    }

                    axios.request(config)
                        .then((response) => {

                            if (response.data.success == true) {
                                console.log(JSON.stringify(response.data.success));
                                console.log("Tretman kreiran!");
                                Swal.fire({
                                    title: 'Uspešno zakazan tretman!',
                                }).then(function () {
                                    navigate("/roditelj");
                                });
                            } else {
                                Swal.fire({
                                    title: 'Odaberite i datum i vreme!',
                                })
                            }
                        })
                        .catch((error) => {
                            // Swal.fire({
                            //     title: 'GRESKA!',
                            // })
                            console.log(error);
                            console.log("Tretman NIJE kreiran.");
                            console.log("Broj tretmana potrosen!!!");
                            // Swal.fire({
                            //     title: 'Broj tretmana je potrošen!',
                            //     text: 'Da li želite da započnete novi paket tretmana?',
                            //     showDenyButton: true,
                            //     confirmButtonText: 'DA',
                            //     denyButtonText: 'NE',
                            // })
                        });
                }
            } else {
                Swal.fire({
                    title: 'Tretman je zauzet!',
                })

            }

        } else {
            Swal.fire({
                title: 'Odaberite vreme!',
            })
        }


    }

    //ZAUZETI TRETMANI LOGOPEDA
    const [zakazani, setZakazani] = useState();
    function listaZauzetih() {
        setZakazani(!zakazani);
    }

    //*******OBNOVA PAKETA NAKON POTROSENIH TRETMANA */

    var zahtev_paket;
    var zahtev_poremecaj;
    var zahtev;
    const [zahtevObnova, setZahtevObnova] = useState({
        info_pacijenta: "",
    });



    return (
        <div className="prethodni_paketi">
            <div className='naslovi_dugmica'>ZAKAŽITE TRETMAN:</div>

            {loading1 && loading2 && loading3 ? (

                <div className="tretman_opcije">

                    <div className="tretman_zakazi">
                        <input
                            type="date"
                            id="datum_tretmana"
                            className="polje"
                            placeholder="Unesite datum..."
                            onInput={handleInput}
                            name="datum_tretmana"
                        />
                        <select name="vreme_tretmana" className="vreme_tretmana" onChange={handleInput}>
                            <option>Vreme</option>
                            <option value="12h">12h</option>
                            <option value="13h">13h</option>
                            <option value="14h">14h</option>
                            <option value="15h">15h</option>
                            <option value="16h">16h</option>
                            <option value="17h">17h</option>
                            <option value="18h">18h</option>
                            <option value="19h">19h</option>
                            <option value="20h">20h</option>
                        </select>
                        <button onClick={handleKreirajTretman}>
                            ZAKAŽITE
                        </button>
                    </div>

                    <div className="zauzeti_tretmani">
                        <button onClick={listaZauzetih}>
                            ZAUZETI TRETMANI
                        </button>

                        <div className="zauzeti_tret">
                            {zakazani && (
                                <div className='modall'>
                                    <div className='overlayy' onClick={listaZauzetih}></div>
                                    <div className='contentt'>
                                        {
                                            zakazaniTretmaniLogoped == null
                                                ? (<></>)
                                                : (zakazaniTretmaniLogoped.map((tretman) => <TretmaniLogopeda tretman={tretman} key={tretman.id} />))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            )
                : (<Loading />)
            }
        </div>
    );
}

export default ZakazivanjeTretmana;