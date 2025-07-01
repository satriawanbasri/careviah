import './styles.scoped.css'
import { useEffect, useState, useRef, useContext } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { updateTaskStatus } from '../../utils/api'
import { toast } from 'react-toastify'
import { IsShowLoadingContext } from '../../utils/contexts'

export default ({ data, isReadOnly = true }) => {
    const { setIsShowLoading } = useContext(IsShowLoadingContext)
    const [yesNo, setYesNo] = useState(null)
    const [yesStyle, setYesStyle] = useState('yesno')
    const [noStyle, setNoStyle] = useState('yesno')
    const [isShowReason, setIsShowReason] = useState(false)
    const reasonInputRef = useRef(null)

    useEffect(() => {
        setIsShowReason(data?.completed == 'no')
    }, [])

    useEffect(() => {
        setYesStyle(data?.completed == 'yes' ? 'yesno selected' : 'yesno')
        setNoStyle(data?.completed == 'no' ? 'yesno selected' : 'yesno')
    }, [data])

    const handleYes = () => {
        setYesNo('yes')
        setYesStyle('yesno selected')
        setNoStyle('yesno')
        setIsShowReason(false)
    }

    const handleNo = () => {
        setYesNo('no')
        setYesStyle('yesno')
        setNoStyle('yesno selected')
        setIsShowReason(true)
    }

    const handleSave = () => {
        if (yesNo == 'no') {
            if (!reasonInputRef.current?.value) {
                toast.warn('Reason required!')
                return
            }
        }
        setIsShowLoading(true)
        updateTaskStatus(data?.taskId, {
            completed: yesNo,
            notes: reasonInputRef.current?.value
        })
            .then(res => {
                setIsShowLoading(false)
                toast.success('Task has been updated successfully!')
            })
            .catch(err => {
                setIsShowLoading(false)
                toast.error('Something went wrong!')
            })
    }

    return (
        <div className="container">
            <div className="title">{data?.taskName}</div>
            <div className="description">{data?.description}</div>
            {!isReadOnly && (
                <>
                    <div className="actions">
                        <div className={yesStyle} onClick={() => handleYes()}>
                            <Check size={22} color="#2E7D32" />
                            <div className="action-text">Yes</div>
                        </div>
                        <Minus size={20} color="#00000099" style={{ transform: 'rotate(90deg)' }} />
                        <div className={noStyle} onClick={() => handleNo()}>
                            <X size={22} color="#D32F2F" />
                            <div className="action-text">No</div>
                        </div>
                    </div>
                    {isShowReason && <input className="reason" ref={reasonInputRef} placeholder="Add reason..." defaultValue={data?.notes} />}
                    <button className="button-outlined" onClick={() => handleSave()}>
                        Save
                    </button>
                </>
            )}
            {isReadOnly && (
                <>
                    <div className="actions">
                        <div className={yesStyle}>
                            <Check size={22} color="#2E7D32" />
                            <div className="action-text">Yes</div>
                        </div>
                        <Minus size={20} color="#00000099" style={{ transform: 'rotate(90deg)' }} />
                        <div className={noStyle}>
                            <X size={22} color="#D32F2F" />
                            <div className="action-text">No</div>
                        </div>
                    </div>
                    {isShowReason && <div className="notes-content">Reason: {data?.notes}</div>}
                </>
            )}
        </div>
    )
}
