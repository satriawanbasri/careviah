import './styles.scoped.css'
import { useEffect, useState, useContext } from 'react'
import { ArrowLeft } from 'lucide-react'
import mapLocation from '../../assets/map-location.svg'
import { TaskCard } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchScheduleById } from '../../utils/api'
import { IsShowBottomBarContext, IsShowLoadingContext } from '../../utils/contexts'
import { useIsMobile } from '../../hooks'
import { toast } from 'react-toastify'

export default () => {
    const { setIsShowBottomBar } = useContext(IsShowBottomBarContext)
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const [schedule, setSchedule] = useState()
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

    return (
        <>
            <div className="title-container">
                <ArrowLeft size={32} className="back" onClick={() => navigate('/')} />
                <div className="title">View Report</div>
            </div>
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
            {schedule?.tasks?.map((item, index) => <TaskCard data={item} isReadOnly={true} key={index} />)}
            <div className="location">Clock-In Location:</div>
            <div className="address-container">
                <img className="map-image" src={mapLocation} alt="map-location" />
                <div className="address">{schedule?.clockInAddress}</div>
            </div>
            <div className="notes">Service Notes:</div>
            <div className="notes-content">{schedule?.serviceNotes}</div>
        </>
    )
}
