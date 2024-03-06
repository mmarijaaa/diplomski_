import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './stil.css';  

const Loading2 = () => {

    return (
        <div class="lds-ring2"><div></div><div></div><div></div><div></div></div>
    )

}

export default Loading2;