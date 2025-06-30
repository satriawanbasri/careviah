import './styles.scoped.css'
import { useEffect, useState, useContext } from 'react'
import { ArrowLeft } from 'lucide-react'
import mapLocation from '../../assets/map-location.svg'
import { TaskCard } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchScheduleById } from '../../utils/api'
import { differenceInSeconds } from 'date-fns'
import { IsShowBottomBarContext, IsShowLoadingContext } from '../../utils/contexts'
import { toast } from 'react-toastify'

export default () => {
    const { setIsShowBottomBar } = useContext(IsShowBottomBarContext)
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const [schedule, setSchedule] = useState()
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
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

    useEffect(() => {
        if (schedule?.actualClockIn) {
            const interval = setInterval(() => {
                const now = new Date()
                const start = new Date(schedule?.actualClockIn)
                const diff = differenceInSeconds(now, start)
                setElapsedSeconds(diff)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [schedule])

    const formatElapsed = totalSeconds => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
        const seconds = String(totalSeconds % 60).padStart(2, '0')
        return `${hours} : ${minutes} : ${seconds}`
    }

    return (
        <>
            <div className="title-container">
                <ArrowLeft size={32} className="back" onClick={() => navigate('/')} />
                <div className="title">View Progress</div>
            </div>
            <div className="tick">{formatElapsed(elapsedSeconds)}</div>
            <div className="profile-card">
                <div className="task-name">{schedule?.serviceName}</div>
                <div className="profile">
                    <div className="avatar">
                        <img src={schedule?.clientProfilePhotoUrl} alt="User" height="64px" />
                    </div>
                    <div className="name">{schedule?.clientName}</div>
                </div>
            </div>
            <div className="task">Tasks:</div>
            {schedule?.tasks?.map((item, index) => <TaskCard data={item} isReadOnly={false} key={index} />)}
            <div className="location">Clock-In Location:</div>
            <div className="address-container">
                <img src={mapLocation} alt="map-location" />
                <div className="address-title">
                    <div className="address">{schedule?.clientAddress}</div>
                </div>
            </div>
            <div className="notes">Service Notes:</div>
            <div className="notes-content">{schedule?.serviceNotes}</div>
        </>
    )
}
