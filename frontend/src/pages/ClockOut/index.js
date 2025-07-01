import './styles.scoped.css'
import { useEffect, useState, useContext } from 'react'
import { ArrowLeft } from 'lucide-react'
import mapLocation from '../../assets/map-location.svg'
import { TaskCard } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchScheduleById, endSchedule, cancelSchedule } from '../../utils/api'
import { differenceInSeconds } from 'date-fns'
import { IsShowBottomBarContext, IsShowCompletedModalContext, IsShowLoadingContext } from '../../utils/contexts'
import { useIsMobile } from '../../hooks'
import { toast } from 'react-toastify'

export default () => {
    const { setIsShowBottomBar } = useContext(IsShowBottomBarContext)
    const { setIsShowCompletedModal } = useContext(IsShowCompletedModalContext)
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const [schedule, setSchedule] = useState()
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const navigate = useNavigate()
    const isMobile = useIsMobile()
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

    const handleCancel = () => {
        setIsShowLoading(true)
        cancelSchedule(serviceId)
            .then(res => {
                navigate('/')
                setIsShowLoading(false)
                toast.success('Schedule has been cancelled successfully!')
            })
            .catch(err => {
                setIsShowLoading(false)
                toast.error('Something went wrong!')
            })
    }

    const handleClockOut = () => {
        setIsShowLoading(true)
        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                const data = await response.json()
                endSchedule(serviceId, latitude, longitude, data?.display_name)
                    .then(res => {
                        setIsShowLoading(false)
                        if (isMobile) {
                            navigate('/schedule-completed')
                        } else {
                            setIsShowCompletedModal(true)
                            navigate('/')
                        }
                    })
                    .catch(err => {
                        setIsShowLoading(false)
                        toast.error('Something went wrong!')
                    })
            },
            err => {
                setIsShowLoading(false)
                toast.error('Cannot access location!')
            }
        )
    }

    return (
        <>
            <div className="title-container">
                <ArrowLeft size={32} className="back" onClick={() => navigate('/')} />
                <div className="title">Clock-Out</div>
            </div>
            <div className="tick">{formatElapsed(elapsedSeconds)}</div>
            <div className="profile-card">
                <div className="task-name">{schedule?.serviceName}</div>
                <div className="profile">
                    <div className="avatar">
                        <img className="avatar-image" src={schedule?.clientProfilePhotoUrl} alt="User" />
                    </div>
                    <div className="name">{schedule?.clientName}</div>
                </div>
            </div>
            <div className="task">Tasks:</div>
            {schedule?.tasks?.map((item, index) => <TaskCard data={item} isReadOnly={false} key={index} />)}
            <div className="location">Clock-In Location:</div>
            <div className="address-container">
                <img className="map-image" src={mapLocation} alt="map-location" />
                <div className="address">{schedule?.clockInAddress}</div>
            </div>
            <div className="notes">Service Notes:</div>
            <div className="notes-content">{schedule?.serviceNotes}</div>
            <div className="action-container">
                <button className="button-outlined" onClick={() => handleCancel()}>
                    Cancel Clock-In
                </button>
                <button className="button-filled" onClick={() => handleClockOut()}>
                    Clock-Out
                </button>
            </div>
        </>
    )
}
