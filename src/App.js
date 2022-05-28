import background from './images/pattern-bg.png'
import './App.css';
import { SearchTab } from './components/searchTab';
import { Details } from './components/details';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const valuesContext = createContext(null);

function App() {
  const [values, setValues] = useState({
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    lat: '',
    lng: '',
    ipRead: false
  })
  useEffect(()=>{

    if(!values.ipRead){
      //setValues({...values, ipRead: true})
      const handleSearch = async () =>{
        const http = require('http');
        let yourIP='';
        //const ip = document.getElementsByClassName('input-direction')[0].value;  
        try {
          http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
              setValues({...values, ip: ip})
              //console.log("My public IP address is: " + ip);
              //console.log(values.ip);
              //********** */
            });
          });
          
        } catch (error) {
          console.log(error);
        }
        
        try {
            console.log(values.ip);
            const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qPZvq5WGXhqlvyorYdQiBCyCgc23U&ipAddress=${yourIP}`)
            //console.log(response);
            setValues({
                ip: response.data.ip,
                location: `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode} `,
                timezone: `UTC ${response.data.location.timezone}`,
                isp: `${response.data.isp}`,
                lat: `${response.data.location.lat}`,
                lng: `${response.data.location.lng}`,
                ipRead: true,
            })
            //console.log(response);
        } catch (error) {
            console.log(error);
        }
        
      }
      handleSearch();
    }
  },[])

  function MyRendering(){
    const map = useMap()
    map.flyTo([values.lat,values.lng], map.getZoom())
    return values.lat === "" ? null : (
      <Marker position={[values.lat,values.lng]} icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }



  return (
    <valuesContext.Provider value={{ values, setValues}}>
      <div className="App">
        <div className="background-container">
          <img src={background} alt="background" className="background-img"/>
        </div>
        <header>
          IP Address Tracker
        </header>  
        <SearchTab/>
        <Details/>
        <div id="map">
          <MapContainer center={[ 47.557545017796684, 10.749821856577201 ]} zoom={18} scrollWheelZoom={false} zoomControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            
            <MyRendering/>
          </MapContainer>
        </div>
      </div>
    </valuesContext.Provider>
  );
}
/**/
export default App;
