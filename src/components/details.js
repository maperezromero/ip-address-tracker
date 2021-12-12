import { useContext } from "react"
import { valuesContext } from "../App";

export const Details = () => {
    
    const {values} = useContext(valuesContext);

    return (
        <div className="details-container">
            <span className="ip container">
                <span className="title">IP ADDRESS</span>
                <span className="detail">{values.ip}</span>
            </span>
            <span className="location container">
                <span className="title">LOCATION</span>
                <span className="detail">{values.location}</span>
            </span>
            <span className="timezone container">
                <span className="title">TIMEZONE</span>
                <span className="detail">{values.timezone}</span>
            </span>
            <span className="isp container">
                <span className="title">ISP</span>
                <span className="detail">{values.isp}</span>
            </span>
        </div>
    )
}