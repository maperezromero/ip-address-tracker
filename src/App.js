import background from './images/pattern-bg.png'
import './App.css';
import { SearchTab } from './components/searchTab';
import { Details } from './components/details';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { createContext, useEffect, useState } from 'react';

export const valuesContext = createContext(null);

function App() {
  const [values, setValues] = useState({
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    lat: '47.557545017796684',
    lng: '10.749821856577201'
  })
  
  function MyRendering(){
    const map = useMap()
    map.flyTo([values.lat,values.lng], map.getZoom())
    return values.lat === "" ? null : (
      <Marker position={[values.lat,values.lng]} icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }


  useEffect(() => {
    console.log(values);
    return () => {
      
    }
  },[values])


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
