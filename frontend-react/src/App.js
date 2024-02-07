import React, { useEffect } from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginLogoped from './Components/Logoped/LoginLogoped';
import LoginRoditelj from './Components/Roditelj/LoginRoditelj';
import PocetnaLogoped from './Components/Logoped/PocetnaLogoped';
import PocetnaRoditelj from './Components/Roditelj/PocetnaRoditelj';
import KreirajRoditelja from './Components/Logoped/KreirajRoditelja';
import KreirajPacijenta from './Components/Logoped/KreirajPacijenta';
import KreirajPacijentaRoditelja from './Components/Logoped/KreirajPacijentaRoditelja';
import ListaPacijenata from './Components/Logoped/ListaPacijenata';
import ListaRoditelja from './Components/Logoped/ListaRoditelja';
import ListaTretmanaZakazanih from './Components/Roditelj/ListaTretmanaZakazanih';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nastim from './Components/Meni/Nastim';
import Usluge from './Components/Meni/Usluge';
import Pocetna from './Components/Meni/Pocetna';
import Paketi from './Components/Meni/Paketi';
import Kontakt from './Components/Meni/Kontakt'; 
import Prijava from './Components/Meni/Prijava';
import Deca from './Components/Roditelj/Deca';
import Dete from './Components/Roditelj/Dete';
import Meni from './Components/Meni/Meni';
import Pregled from './Components/Meni/Pregled';
import KontaktLogopeda from './Components/Roditelj/KontaktLogopeda';
import ListaTretmanaPacijenta from './Components/Logoped/ListaTretmanaPacijenta'; 
import EvidentirajTretman from './Components/Logoped/EvidentirajTretman'; 
import ListaZahteva from './Components/Logoped/ListaZahteva'; 
import KreirajZahtev from './Components/Logoped/KreirajZahtev';
import ListaTretmana from './Components/Logoped/ListaTretmana'; 


function App() {

  //token za prijavu logopeda
  const [token, setToken] = useState();

  function addToken(auth_token) {
    setToken(auth_token);
    //console.log(token);
  }

  //token za prijavu roditelja
  const [token2, setToken2] = useState('');

  function addToken2(auth_token2) {
    setToken2(auth_token2);
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* DELOVI MENIJA */}
        <Route path='/' element={<Pocetna/>}></Route>
        <Route path='/nastim' element={<Nastim/>}></Route>
        <Route path='/usluge' element={<Usluge />}></Route>
        <Route path='/paketi' element={<Paketi />}></Route>
        <Route path='/kontakt' element={<Kontakt />}></Route>
        <Route path='/prijava' element={<Prijava addToken={addToken} addToken2={addToken2}/>}>
          <Route path='prijavaLogopeda' element={<LoginLogoped addToken={addToken}/>}></Route>
          <Route path='prijavaRoditelja' element={<LoginRoditelj addToken2={addToken2}/>}></Route>
        </Route>
        <Route path='/pregled' element={<Pregled />}></Route>

        {/* PROFIL LOGOPEDA */}
        {/* <Route path='/prijavaLogopeda' element={<LoginLogoped addToken={addToken}/>}></Route> */}
        <Route path='/logoped' element={<PocetnaLogoped/>}>
            <Route path='kreirajRoditelja' element={<KreirajRoditelja/>}/>
            <Route path='kreirajPacijenta' element={<KreirajPacijenta/>}/>
            <Route path='kreirajPacijentaRoditelja' element={<KreirajPacijentaRoditelja/>}/> 
            <Route path='listaPacijenata' element={<ListaPacijenata />}/>
            <Route path='listaRoditelja' element={<ListaRoditelja />}/>
            <Route path='listaTretmanaPacijenta' element={<ListaTretmanaPacijenta />}/>
            <Route path='evidencijaTretmana' element={<EvidentirajTretman />}/>
            <Route path='kreirajZahtev' element={<KreirajZahtev/>}/>
            <Route path='listaZahteva' element={<ListaZahteva />}/>
            <Route path='listaTretmana' element={<ListaTretmana />}/>
        </Route>

        {/* PROFIL RODITELJA */}
        {/* <Route path='/prijavaRoditelja' element={<LoginRoditelj addToken2={addToken2}/>}></Route> */}
        <Route path='/roditelj' element={<PocetnaRoditelj/>}>
          <Route path='deca' element={<Deca/>}/>
          <Route path='dete' element={<Dete/>}/>
          <Route path='listaTretmanaZakazanih' element={<ListaTretmanaZakazanih />}/>
          <Route path='kontaktLogopeda' element={<KontaktLogopeda />}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
