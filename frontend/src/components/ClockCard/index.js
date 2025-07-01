import './styles.scoped.css'
import { useEffect, useState } from 'react'
import { Clock4, MapPin, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { differenceInSeconds } from 'date-fns'

export default ({ data }) => {
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.actualClockIn) {
            const interval = setInterval(() => {
                const now = new Date()
                const start = new Date(data?.actualClockIn)
                const diff = differenceInSeconds(now, start)
                setElapsedSeconds(diff)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [data])

    const formatElapsed = totalSeconds => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
        const seconds = String(totalSeconds % 60).padStart(2, '0')
        return `${hours} : ${minutes} : ${seconds}`
    }

    return (
        <div className="container">
            <div className="tick">{formatElapsed(elapsedSeconds)}</div>
            <div className="profile">
                <div className="avatar">
                    <img className="avatar-image" src={data?.clientProfilePhotoUrl} alt="User" />
                </div>
                <div className="name">{data?.clientName}</div>
            </div>
            <div className="location-container">
                <MapPin size={18} color="#EEEEEE" />
                <div className="location">{data?.clientAddress}</div>
                |
                <Clock4 size={16} color="#EEEEEE" />
                <div className="time-text">
                    {data?.scheduledStartTime} - {data?.scheduledEndTime}
                </div>
            </div>
            <div className="location-container-mobile">
                <div className="location-container-mobile1">
                    <MapPin size={18} color="#EEEEEE" />
                    <div className="location">{data?.clientAddress}</div>
                </div>
                <div className="location-container-mobile2">
                    <Clock4 size={18} color="#EEEEEE" />
                    <div className="time-text">
                        {data?.scheduledStartTime} - {data?.scheduledEndTime}
                    </div>
                </div>
            </div>
            <button className="button-filled" onClick={() => navigate('/clock-out', { state: { serviceId: data?.serviceId } })}>
                <Timer size={22} color="#0d5d59" />
                Clock-Out
            </button>
        </div>
    )
}
