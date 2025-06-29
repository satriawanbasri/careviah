import './styles.scoped.css'
import { CalendarMinus2, Clock4, MapPin, Minus, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="profile">
                <div className="avatar">
                    <img src="/user.jpg" alt="User" height="64px" />
                </div>
                <div className="name">Melisa Adam</div>
            </div>
            <div className="location-container">
                <MapPin size={18} color="#EEEEEE" />
                <div className="location">117-101 Iowa St, Minnesota City, MN 55959, USA</div>
                |
                <Clock4 size={18} color="#EEEEEE" />
                <div className="time-text">10:30 - 12:30 SGT</div>
            </div>
            <div className="location-container-mobile">
                <div className="location-container-mobile1">
                    <MapPin size={18} color="#EEEEEE" />
                    <div className="location">117-101 Iowa St, Minnesota City, MN 55959, USA</div>
                </div>
                <div className="location-container-mobile2">
                    <Clock4 size={18} color="#EEEEEE" />
                    <div className="time-text">10:30 - 12:30 SGT</div>
                </div>
            </div>
            <button className="button-filled" onClick={() => navigate('/')}>
                <Timer size={22} color="#0d5d59" />
                Clock-Out
            </button>
        </div>
    )
}
