import React from 'react'
import { useState, useEffect } from 'react';import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Pregled = ({pregled}) => { 

    return (
        <div className="pregledLista">  
            {pregled.naziv_tretmana} {pregled.datum_tretmana} {pregled.vreme_tretmana} 
        </div>
    )

}

export default Pregled; 