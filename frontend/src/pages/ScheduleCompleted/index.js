import './styles.scoped.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CalendarMinus2, Clock4, X } from 'lucide-react'
import completedIcon from '../../assets/completed-icon-white.svg'
import { useIsMobile } from '../../hooks'

export default () => {
    const navigate = useNavigate()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) {
            navigate('/')
        }
    }, [isMobile])

    return (
        <div className="container">
            <div className="close">
                <X size={24} color="#ffffff" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            </div>
            <div className="center-container">
                <img src={completedIcon} alt="completed-icon" height={140} className="icon" />
                <div className="title">Schedule Completed</div>
                <div className="schedule">
                    <div className="date-container">
                        <CalendarMinus2 size={16} color="#ffffff" />
                        <div className="date">Mon, 15 January 2025</div>
                    </div>
                    <div className="time-container">
                        <Clock4 size={16} color="#ffffff" />
                        <div className="time-text">
                            <div className="time">10:30 - 11:30 SGT</div>
                            <div className="span">(1 hour)</div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="button-outlined" onClick={() => navigate('/')}>
                Go to Home
            </button>
        </div>
    )
}
