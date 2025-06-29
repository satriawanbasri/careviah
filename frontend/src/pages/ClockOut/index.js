import './styles.scoped.css'
import { useEffect, useState, useContext } from 'react'
import { ArrowLeft } from 'lucide-react'
import mapLocation from '../../assets/map-location.svg'
import { TaskCard, CompletedModal } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchScheduleById } from '../../utils/api'
import { differenceInSeconds } from 'date-fns'
import { IsShowBottomBarContext } from '../../utils/contexts'

export default () => {
    const { setIsShowBottomBar } = useContext(IsShowBottomBarContext)
    const [schedule, setSchedule] = useState()
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [isShowCompletedModal, setIsShowCompletedModal] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { serviceId } = location.state || {}

    useEffect(() => {
        if (serviceId) {
            fetchScheduleById(serviceId).then(res => setSchedule(res.data))
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
                <div className="title">Clock-Out</div>
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
            {schedule?.tasks?.map((item, index) => <TaskCard data={item} isClockOut={true} key={index} />)}
            <div className="location">Clock-In Location:</div>
            <div className="address-container">
                <img src={mapLocation} alt="map-location" />
                <div className="address-title">
                    <div className="address">{schedule?.clientAddress}</div>
                </div>
            </div>
            <div className="notes">Service Notes:</div>
            <div className="notes-content">
                Lorem ipsum dolor sit amet consectetur. Praesent adipiscing malesuada est vestibulum leo tempus sociis. Sodales libero mauris eu donec
                tempor in sagittis urna turpis. Vitae et vestibulum convallis volutpat commodo blandit in fusce viverra. Semper magna amet ipsum massa
                turpis non tortor. Etiam diam neque tristique nulla. Ipsum duis praesent sed a mattis morbi morbi aliquam. Enim quam amet cras nibh.
                Amet quis malesuada ac in ultrices. Viverra sagittis aenean vulputate at orci aliquam enim.
            </div>
            <div className="action-container">
                <button className="button-outlined">Cancel Clock-In</button>
                <button className="button-filled">Clock-Out</button>
            </div>
            <CompletedModal isShowModal={isShowCompletedModal} setIsShowModal={setIsShowCompletedModal} />
        </>
    )
}
