import './styles.scoped.css'
import { useEffect, useState, useContext } from 'react'
import { ArrowLeft, CalendarMinus2, Clock4, Minus, Mail, Phone } from 'lucide-react'
import { TaskCard } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchScheduleById, startSchedule } from '../../utils/api'
import { format } from 'date-fns'
import { IsShowBottomBarContext, IsShowLoadingContext } from '../../utils/contexts'
import { toast } from 'react-toastify'

export default () => {
    const { setIsShowBottomBar } = useContext(IsShowBottomBarContext)
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const [schedule, setSchedule] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const { serviceId } = location.state || {}

    useEffect(() => {
        if (serviceId) {
            setIsShowLoading(true)
            fetchScheduleById(serviceId)
                .then(res => {
                    setSchedule(res.data)
                    setIsShowLoading(false)
                })
                .catch(err => {
                    setIsShowLoading(false)
                    toast.error('Something went wrong!')
                })
        }

        setIsShowBottomBar(false)
        return () => setIsShowBottomBar(true)
    }, [])

    const handleClockIn = () => {
        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                const data = await response.json()
                setIsShowLoading(true)
                startSchedule(serviceId, latitude, longitude, data?.display_name)
                    .then(res => navigate('/'))
                    .then(res => {
                        navigate('/')
                        setIsShowLoading(false)
                        toast.success('Clocked in started!')
                    })
                    .catch(err => {
                        setIsShowLoading(false)
                        toast.error('Something went wrong!')
                    })
            },
            err => {
                toast.error('Cannot access location!')
            }
        )
    }

    return (
        <>
            <div className="title-container">
                <ArrowLeft size={32} className="back" onClick={() => navigate('/')} />
                <div className="title">Schedule Details</div>
            </div>
            <div className="profile-card">
                <div className="task-name">{schedule?.serviceName}</div>
                <div className="profile">
                    <div className="avatar">
                        <img src={schedule?.clientProfilePhotoUrl} alt="User" height="64px" />
                    </div>
                    <div className="name">{schedule?.clientName}</div>
                </div>
                <div className="schedule-container">
                    <div className="date">
                        <CalendarMinus2 color="#02CAD1" />
                        <div className="date-text">
                            {schedule?.scheduledDate ? format(new Date(schedule?.scheduledDate), 'EEE, dd MMM yyyy') : ''}
                        </div>
                    </div>
                    <Minus size={20} color="#00000099" style={{ transform: 'rotate(90deg)' }} />
                    <div className="time">
                        <Clock4 color="#02CAD1" />
                        <div className="time-text">
                            {schedule?.scheduledStartTime} - {schedule?.scheduledEndTime}
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact">Client Contact:</div>
            <div className="email">
                <Mail color="#1D1D1BDE" />
                {schedule?.clientEmail}
            </div>
            <div className="phone">
                <Phone color="#1D1D1BDE" />
                {schedule?.clientPhone}
            </div>
            <div className="address-title">Address:</div>
            <div className="address">{schedule?.clientAddress}</div>
            <div className="task">Tasks:</div>
            {schedule?.tasks?.map((item, index) => <TaskCard data={item} isReadOnly={false} key={index} />)}
            <div className="notes">Service Notes:</div>
            <div className="notes-content">{schedule?.serviceNotes}</div>
            <button className="button-filled" onClick={() => handleClockIn()}>
                Clock-In Now
            </button>
        </>
    )
}
