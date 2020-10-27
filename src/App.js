import React, {useState, useEffect} from "react";import './App.css';
import UpperMenu from './components/upperMenu';
import DataInterpreter from './components/dataInterpreter';
import DataContext from './components/dataContext'

///export const DataContext = React.createContext({data: "weatherData", setCity:"setCity"});

function App() {

    let [weatherData, setWeatherData] = useState(null);
    let [city, setCity] = useState(null);

    
    useEffect(() => {  
        let newcity = getParameterByName('city');  
        
        if (newcity===null || newcity==="" ){return;}
        //setCity(newcity);
        const xhr = new XMLHttpRequest();
        const url = 'https://api.openweathermap.org/data/2.5/weather?q='+newcity.trim()+'&lang=pl&units=metric&appid=YOUR_API_KEY';

        xhr.open('GET', url);
        xhr.onreadystatechange = function (aEvt) 
        {
            if (xhr.readyState === 4) {
                if(xhr.status === 200)
                { 
                    setWeatherData(xhr.responseText);
                }
                else
                { 
                    setWeatherData('Miasto nie zostało znalezione. Sprawdź pisownię lub wybierz inne miasto w pobliżu szukanego');
                    //alert('Miasto nie zostało znalezione. Sprawdź pisownię lub wybierz inne miasto w pobliżu szukanego');
                }
            }
        };
        xhr.send(); 

   });

    function getParameterByName(name, url = window.location.search) {
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function updateCity(ev){setCity(ev.target.dataset.city)}

     
  return (
    <div className="App">
        
        <DataContext.Provider value={weatherData} >
            <UpperMenu updateCity={updateCity}/>
       
            <header className="App-header">
                <DataInterpreter 
                weatherData={weatherData} city={city}
                />
            </header>
      </DataContext.Provider>
    </div>
  );
}

export default App;
