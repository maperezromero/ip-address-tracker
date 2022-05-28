import arrow from '../images/icon-arrow.svg'
import axios from 'axios';
import { useContext } from 'react';
import { valuesContext } from '../App';


export const SearchTab = ()=>{

    

    const {setValues} = useContext(valuesContext)
    const handleSearch = async () =>{
        const ip = document.getElementsByClassName('input-direction')[0].value;  
            try {
                const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qPZvq5WGXhqlvyorYdQiBCyCgc23U&ipAddress=${ip}`)
                setValues({
                    ip:ip,
                    location: `${response.data.location.city}, ${response.data.location.region} ${response.data.location.postalCode} `,
                    timezone: `UTC ${response.data.location.timezone}`,
                    isp: `${response.data.isp}`,
                    lat: `${response.data.location.lat}`,
                    lng: `${response.data.location.lng}`
                })
                //console.log(response);
            } catch (error) {
                console.log(error);
            }
    }
    return(
        <div className="search-tab">
            <input className="input-direction"/>
            <span className="arrow-container" onClick={handleSearch}>
                <img src={arrow} alt="arrow-go-selection"/>
            </span>
        </div>
    )
}