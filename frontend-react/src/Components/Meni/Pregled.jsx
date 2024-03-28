import React from "react";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import Meni from './Meni';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stil.css';
import Footer from './Footer';
import kalendar from '../Slike/schedule.png';
import Swal from 'sweetalert2';
import moment from 'moment';

const Pregled = () => {

    //ucitavanje svih zauzetih tretmana i pregleda svih logopeda

    const [zakazaniTretmani, setZakazaniTretmani] = useState();
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/listaSvihZakazanih',
            data: zakazaniTretmani,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log("SVI ZAKAZANI TRETMANI ");
                setZakazaniTretmani(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                console.log("NEMA ZAKAZANIH");
            });
    }, []);

    var datum_odabran;
    var datum_odab;
    var vreme_odabrano;
    var sadrzaj;
    var mozed, mozev;
    var dan_naziv;

    function handleDatum(e) {

        datum_odabran = e.target.value;

        //izvlacenje dana, meseca i godine iz odabranog datuma
        var dan_naziv = moment(datum_odabran).format('dddd'); //dan u nedelji
        const dan = moment(datum_odabran).format('D');
        const mesec = moment(datum_odabran).format('M');
        const godina = moment(datum_odabran).format('YYYY');
        const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 
        //datum_odab = godina + "-" + mesec + "-" + dan + " " + "00:00:00";

        if(Number(mesec) < 10) {
            datum_odab = godina + "-0" + mesec + "-" + dan + " " + "00:00:00";
        } else {
            datum_odab = godina + "-" + mesec + "-" + dan + " " + "00:00:00";
        }

        //izvlacenje danasnjeg datuma
        const today = new Date();
        const mesec_danas = today.getMonth() + 1;
        const godina_danas = today.getFullYear();
        const dan_danas = today.getDate();
        const danasnji_dan = moment(today).format('L'); //12/04/2023 

        //prebacivanje dana u number ???
        let dan_number = Number(dan);
        let dan_danas_number = Number(dan_danas);

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
                    //console.log("DANAS NEMA ZAKAZIVANJA !!!");
                    /*Swal.fire({
                      title: 'Danas ne može da se zakaže pregled!', 
                    })*/
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
            //setPregledData(newPregledData); 
            //moze = true;
        }

        handleInput(e);

    }

    

    function handleVreme(e) {
        // if (e.target.name == 'vreme_tretmana') {
        //     vreme_odabrano = e.target.value;
        //     mozev = true;
        // }
        vreme_odabrano = e.target.value;
        handleInput(e);
        // if(mozev == true)  {
        //     handleInput();
        // }
    }

    const [pregledData, setPregledData] = useState({
        datum_tretmana: "",
        vreme_tretmana: "",
        sadrzaj_tretmana: ""
    });

    function handleInput(e) {
        let newPregledData = pregledData;
        newPregledData.datum_tretmana = datum_odab;
        newPregledData.vreme_tretmana= vreme_odabrano;
        newPregledData.sadrzaj_tretmana = sadrzaj;
        setPregledData(newPregledData);
    }

    function handleSadrzaj(e) {
        sadrzaj = e.target.value;
        handleInput(e);
    }

    function handleKreirajPregled(e) {

        //izvlacenje dana, meseca i godine iz odabranog datuma
        const dan = moment(datum_odabran).format('D');
        const mesec = moment(datum_odabran).format('M');
        const godina = moment(datum_odabran).format('YYYY');
        const odabran_dan = moment(datum_odabran).format('L'); //12/04/2023 

        var zakazi;
        var zakaziV; 
        var duzina_liste_zakazanih = zakazaniTretmani.length;
        var datum_liste;
        var vreme_liste;
        var dan_num = Number(dan);

        if (duzina_liste_zakazanih != 0) {

            for (let i = 0; i < duzina_liste_zakazanih; i++) {
                datum_liste = zakazaniTretmani[i].datum_tretmana;
                vreme_liste = zakazaniTretmani[i].vreme_tretmana;
                const mesec_liste = moment(datum_liste).format('M');
                const godina_liste = moment(datum_liste).format('YYYY');
                const dan_liste = moment(datum_liste).format('D');

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

        if (zakaziV == true) {
            if (zakazi == true) {

                var config = {
                    method: 'post',
                    // url: 'http://127.0.0.1:8000/api/kreiranjeNovogPregleda/'+datum_odab+"/"+vreme_odabrano+"/"+sadrzaj, 
                    url: 'http://127.0.0.1:8000/api/kreiranjePregleda', 
                    data: pregledData
                }

                axios.request(config)
                    .then((response) => {
                        console.log(response.data.success);
                        if (response.data.success === true) {
                            console.log(JSON.stringify(response.data));
                            console.log("Pregled kreiran!");
                            setPregledData(response.data.tretmani);
                            Swal.fire({
                                title: 'Uspešno kreiran pregled!',
                            }).then(function () {
                                window.location.reload();
                            });
                        } else {
                            Swal.fire({
                                // title: 'Odaberite i datum i vreme!',
                                title: 'Popunite sva polja!',
                            })
                            console.log("Pregled nije kreiran.");
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Pregled NIJE kreiran.");
                    });

            } else {
                Swal.fire({
                    title: 'Zauzeto!',
                })
            }
        } else {
            Swal.fire({
                title: 'Odaberite vreme!',
            })
        }
    }

    return (
        <div className="pregled">
            <Meni />
            <div className="pre">
                <div className="pr_forma">

                    <div className="pregled_icon">
                        <img className="preg" src={kalendar} alt="" />
                    </div>


                    <div className="pregled_forma">

                        <p>ZAKAŽITE PRVI PREGLED ZA VAŠE DETE</p>

                        <div className="pregled_roditelj">
                            <input type="text"
                                id="ime_prezime_roditelj"
                                className="polje"
                                placeholder="Unesite Vaše ime i prezime..."
                                onInput={handleSadrzaj}
                                name="sadrzaj_tretmana" />
                        </div>
                        <div className="pregled_datum">
                            <input
                                type="date"
                                id="datum_pregleda"
                                className="polje"
                                placeholder="Izaberite datum..."
                                onInput={handleDatum}
                                name="datum_tretmana"
                            />
                        </div>
                        <div className="pregled_vreme">
                            <select name="vreme_tretmana" id="vreme_tretmana" onChange={handleVreme}>
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
                        </div>
                        <button
                            onClick={handleKreirajPregled}
                            className="dugme"
                        >
                            ZAKAŽITE
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Pregled;