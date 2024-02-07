import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Tretman = ({tretman}) => { 

    return (
        <div className="tretmanLista"> 
            {tretman.naziv_tretmana} {tretman.redni_broj_tretmana} /{tretman.datum_tretmana} /{tretman.vreme_tretmana} /
            {tretman.pacijent.ime} {tretman.pacijent.prezime} / {tretman.pacijent.poremecaj}
        </div>
    )

}

export default Tretman; 