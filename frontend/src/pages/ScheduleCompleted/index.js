import './styles.scoped.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CalendarMinus2, Clock4, X } from 'lucide-react'
import completedIcon from '../../assets/completed-icon-white.svg'
import { useIsMobile } from '../../hooks'
import { IsShowLoadingContext, CompletedServiceIdContext } from '../../utils/contexts'
import { format, differenceInMinutes } from 'date-fns'
import { fetchScheduleById } from '../../utils/api'
import { toast } from 'react-toastify'

export default () => {
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const { completedServiceId } = useContext(CompletedServiceIdContext)
    const [schedule, setSchedule] = useState()
    const [span, setSpan] = useState()
    const navigate = useNavigate()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) {
            navigate('/')
        }
    }, [isMobile])

    useEffect(() => {
        if (completedServiceId) {
            setIsShowLoading(true)
            fetchScheduleById(completedServiceId)
                .then(res => {
                    setSchedule(res.data)
                    setIsShowLoading(false)
                })
                .catch(err => {
                    setIsShowLoading(false)
                    toast.error('Something went wrong!')
                })
        }
    }, [completedServiceId])

    useEffect(() => {
        if (schedule) {
            const minutes = differenceInMinutes(new Date(schedule?.actualClockOut), new Date(schedule?.actualClockIn))
            setSpan(
                minutes < 60
                    ? `(${minutes} minute${minutes !== 1 ? 's' : ''})`
                    : `(${Math.floor(minutes / 60)} hour${minutes / 60 !== 1 ? 's' : ''}${minutes % 60 !== 0 ? ` ${minutes % 60} min` : ''})`
            )
        }
    }, [schedule])

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
                        <div className="date">{schedule?.actualClockOut ? format(new Date(schedule?.actualClockOut), 'EEE, dd MMM yyyy') : ''}</div>
                    </div>
                    <div className="time-container">
                        <Clock4 size={16} color="#ffffff" />
                        <div className="time-text">
                            <div className="time">
                                {schedule?.actualClockIn && schedule?.actualClockOut
                                    ? format(new Date(schedule?.actualClockIn), 'HH:mm') + ' - ' + format(new Date(schedule?.actualClockOut), 'HH:mm')
                                    : ''}
                            </div>
                            <div className="span">{span}</div>
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
