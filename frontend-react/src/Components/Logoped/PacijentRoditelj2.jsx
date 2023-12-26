import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const PacijentRoditelj2 = ({pacijent}) => {

    return (
        <div className="pacijent_roditelj_logoped">
            {pacijent.ime} {pacijent.prezime}  
        </div>
    ); 
}

export default PacijentRoditelj2;