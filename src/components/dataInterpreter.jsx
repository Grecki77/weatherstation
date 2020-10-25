import DataContext from './dataContext';

function DataInterpreter() {
    function isJson(str) {
        if (typeof str !=="string"){return false;}
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    return (
      <div className="dataInterpretation">
            {/* {JSON.stringify(DataContext)} */}
             <DataContext.Consumer>
                  
            {weatherData => {
                let dataIntegration = isJson(weatherData);
                
                if (dataIntegration)
                { 
                    let wd = JSON.parse(weatherData)
                    window.wd = wd;
                    let sunrise = new Date(Number(wd.sys.sunrise) * 1000);
                    let sunset  = new Date(Number(wd.sys.sunset)  * 1000);
                    return(<>
                    <div>
                    {Array.isArray(wd.weather) ? <img alt="weatherImage" src={"http://openweathermap.org/img/w/"+wd.weather[0].icon+ ".png"} /> :""}
                    </div>
                    
                    <div>Dane pogodowe dla miasta {wd.name}</div>
                    <hr></hr>
                    <div>Temperatura: {wd.main.temp} °C <small><span className="arrowColor">&darr;</span>{wd.main.temp_min}°C <span className="arrowColor">&uarr;</span>{wd.main.temp_max}°C</small></div>
                    <div>Temperatura odczuwalna: {wd.main.feels_like}°C </div>
                    <div>Wilgotność powietrza: {wd.main.humidity}%, ciśnienie {wd.main.pressure}hPa</div>
                    <div>Wiatr: {wd.wind.speed}km/h, kierunek {wd.wind.deg}°</div>
                    <div> {Array.isArray(wd.weather) ? wd.weather[0].description : ""} 
                    <div>&#127749; {sunrise.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#127751; {sunset.toLocaleTimeString()}</div>
                    <div>Widoczność: {parseFloat(Math.round(wd.visibility/100)/10).toFixed(1)} km</div>
                    </div>
                    </>) 
                }
                else 
                {
                    return (<div>{weatherData ? weatherData : "Wybierz miasto lub wpisz w wyszukiwarce"}</div>)
                }
            }}
            </DataContext.Consumer>
       
        
      </div>
    );
  }
  
  export default DataInterpreter;