import './styles.scoped.css'
import { CalendarMinus2, Clock4, MapPin, Ellipsis, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

export default ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="top">
                {data?.status == 'scheduled' && <div className="badge-scheduled">Scheduled</div>}
                {data?.status == 'in_progress' && <div className="badge-inprogress">In progress</div>}
                {data?.status == 'completed' && <div className="badge-completed">Completed</div>}
                {data?.status == 'cancelled' && <div className="badge-cancelled">Cancelled</div>}
                <Ellipsis size={26} color="#212121" fill="#212121" />
            </div>
            <div className="profile">
                <div className="avatar">
                    <img src={data?.clientProfilePhotoUrl} alt="User" height="64px" />
                </div>
                <div className="name-container">
                    <div className="name">{data?.clientName}</div>
                    <div className="email">{data?.serviceName}</div>
                </div>
            </div>
            <div className="location-container">
                <MapPin size={32} fill="#00000099" color="#ffffff" />
                <div className="location">{data?.clientAddress}</div>
            </div>
            <div className="schedule-container">
                <div className="date">
                    <CalendarMinus2 color="#02CAD1" />
                    <div className="date-text">{data?.scheduledDate ? format(new Date(data?.scheduledDate), 'EEE, dd MMM yyyy') : ''}</div>
                </div>
                <Minus size={20} color="#00000099" style={{ transform: 'rotate(90deg)' }} />
                <div className="time">
                    <Clock4 color="#02CAD1" />
                    <div className="time-text">
                        {data?.scheduledStartTime} - {data?.scheduledEndTime}
                    </div>
                </div>
            </div>
            <div className="action-container">
                {data?.status == 'scheduled' && (
                    <button className="button-filled" onClick={() => navigate('/schedule-details', { state: { serviceId: data?.serviceId } })}>
                        Clock-In Now
                    </button>
                )}
                {data?.status == 'in_progress' && <button className="button-filled">Clock-Out Now</button>}
                {data?.status == 'in_progress' && (
                    <button className="button-outlined" onClick={() => navigate('/clock-out', { state: { serviceId: data?.serviceId } })}>
                        View Progress
                    </button>
                )}
                {data?.status == 'completed' && <button className="button-outlined">View Report</button>}
            </div>
        </div>
    )
}
