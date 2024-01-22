import styles from "./App.css";
import icon from "./icon.png";
import {useState,useEffect} from "react";
import axios from "axios";

function App() {


  const [city,setCity] = useState('');
  const [weatherStatus,setWeatherStatus] = useState('');
  const [temperature, setTemperature] = useState('');
  const [icon,setIcon] = useState('');


  /*const Status = [
   { weather: "Partly cloudy", Img: icon },
  ];*/



  function showWeatherStatus(data) {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${data}&aqi=yes`).then(function(res){
      setWeatherStatus(res.data.current.condition.text)
      setTemperature(res.data.current.temp_c);
      setIcon(res.data.current.condition.icon);
    });
    setCity(data);
  }
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(position => {
    const {latitude,longitude} = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    fetch(url).then((res) => res.json()).then((data) => showWeatherStatus(data.address.city_district));
  });
 }, []);


  return (
    <div className="weather">  
        <div className="city"><h1>{city}</h1></div>
        <div className="weather-status"><p>{weatherStatus}</p></div>
        <div className="weather-icon"><img src={icon}></img></div>
        <div className="temperature"><h1>{temperature}°C</h1></div>
    </div>
  );
}

export default App;
