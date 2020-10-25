import React,  {useState} from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";

const lista = ["Warszawa", "Londyn", "Madryt", "Nowy Jork", "Roma", "Aosta"];

function UpperMenuList(props) {
  const [userCity, setUserCity] =  useState('');
  const {updateCity} = props;
    return (
      <div className="upperMenuList">
        <div className="dropdown">
            <button className="dropbtn">Wybierz miasto</button>
            <div className="dropdown-content"> 
            <Router>
                {lista.map((item, i)=>(<Link onClick={updateCity} data-city={item} to={location => ({ ...location.origin, pathname: "/?city=" + item })} key={i} className="links">{item}</Link>))}
                <hr></hr>
                <input type="text" className="searcher" placeholder="Twoja propozycja" value={userCity} onChange={(ev) =>{setUserCity(ev.target.value)}}/>
                <Link className="links" onClick={updateCity} data-city={userCity} to={location => ({ ...location.origin, pathname: "/?city=" + userCity })}>Szukaj {userCity ? '"'+userCity+'"' : ""}</Link>
                </Router> 
            </div>
        </div>
        
      </div>
    );
  }
  
  export default UpperMenuList;