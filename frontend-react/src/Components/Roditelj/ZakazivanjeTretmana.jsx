import React from 'react'
import { useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ZakazivanjeTretmana = () => {

    return (
        <div className="prethodni_paketi">
            <div className='naslovi_dugmica'>ZAKAŽITE TRETMAN:</div>

            <div className="tretman_zakazi">
                    <input 
                        type="date"
                        id="datum_tretmana"
                        className="polje"
                        placeholder="Unesite datum..."
                        // onInput={handleInput}
                        name="datum_tretmana"
                    />
                    <select name="vreme_tretmana" id="vreme_tretmana">
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
                    <button>
                        ZAKAŽITE
                    </button>
                    </div>
        </div>
    );
}

export default ZakazivanjeTretmana;