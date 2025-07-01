import './styles.scoped.css'
import { useContext, useState, useEffect } from 'react'
import Modal from 'react-modal'
import completedIcon from '../../assets/completed-icon-black.svg'
import { CalendarMinus2, Clock4, X } from 'lucide-react'
import { IsShowCompletedModalContext, IsShowLoadingContext, CompletedServiceIdContext } from '../../utils/contexts'
import { format, differenceInMinutes } from 'date-fns'
import { fetchScheduleById } from '../../utils/api'
import { toast } from 'react-toastify'

Modal.setAppElement('#root')

export default () => {
    const { isShowCompletedModal, setIsShowCompletedModal } = useContext(IsShowCompletedModalContext)
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const { completedServiceId } = useContext(CompletedServiceIdContext)
    const [schedule, setSchedule] = useState()
    const [span, setSpan] = useState()

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
        <Modal
            isOpen={isShowCompletedModal}
            onRequestClose={() => setIsShowCompletedModal(false)}
            style={{
                content: {
                    margin: 'auto',
                    width: '500px',
                    height: '452px',
                    borderRadius: '20px'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1001
                }
            }}>
            <div className="container">
                <div className="close">
                    <X size={24} onClick={() => setIsShowCompletedModal(false)} style={{ cursor: 'pointer' }} />
                </div>
                <img src={completedIcon} alt="completed-icon" height={140} className="icon" />
                <div className="title">Schedule Completed</div>
                <div className="schedule">
                    <div className="date-container">
                        <CalendarMinus2 size={18} color="#000000" />
                        <div className="date">{schedule?.actualClockOut ? format(new Date(schedule?.actualClockOut), 'EEE, dd MMM yyyy') : ''}</div>
                    </div>
                    <div className="time-container">
                        <Clock4 size={18} color="#000000" />
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
                <button className="button-outlined" onClick={() => setIsShowCompletedModal(false)}>
                    Go to Home
                </button>
            </div>
        </Modal>
    )
}
