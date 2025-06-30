import './styles.scoped.css'
import { useContext } from 'react'
import Modal from 'react-modal'
import completedIcon from '../../assets/completed-icon-black.svg'
import { CalendarMinus2, Clock4, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { IsShowCompletedModalContext } from '../../utils/contexts'

Modal.setAppElement('#root')

export default () => {
    const { isShowCompletedModal, setIsShowCompletedModal } = useContext(IsShowCompletedModalContext)
    const navigate = useNavigate()

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
                        <div className="date">Mon, 15 January 2025</div>
                    </div>
                    <div className="time-container">
                        <Clock4 size={18} color="#000000" />
                        <div className="time-text">
                            <div className="time">10:30 - 11:30 SGT</div>
                            <div className="span">(1 hour)</div>
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
