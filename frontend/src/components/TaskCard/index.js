import './styles.scoped.css'
import { useEffect, useState } from 'react'
import { Check, Minus, X } from 'lucide-react'

export default ({ data, isClockOut = false }) => {
    const [yesStyle, setYesStyle] = useState('yesno')
    const [noStyle, setNoStyle] = useState('yesno')
    const [isShowReason, setIsShowReason] = useState(false)

    useEffect(() => {
        setIsShowReason(data?.completed == 'no')
    }, [])

    useEffect(() => {
        setYesStyle(data?.completed == 'yes' ? 'yesno selected' : 'yesno')
        setNoStyle(data?.completed == 'no' ? 'yesno selected' : 'yesno')
    }, [data])

    const handleYes = () => {
        setYesStyle('yesno selected')
        setNoStyle('yesno')
        setIsShowReason(false)
    }

    const handleNo = () => {
        setYesStyle('yesno')
        setNoStyle('yesno selected')
        setIsShowReason(true)
    }

    return (
        <div className="container">
            <div className="title">{data?.taskName}</div>
            <div className="description">{data?.description}</div>
            {isClockOut && (
                <>
                    <div className="actions">
                        <div className={yesStyle} onClick={() => handleYes()}>
                            <Check size={24} color="#2E7D32" />
                            <div className="action-text">Yes</div>
                        </div>
                        <Minus size={20} color="#00000099" style={{ transform: 'rotate(90deg)' }} />
                        <div className={noStyle} onClick={() => handleNo()}>
                            <X size={24} color="#D32F2F" />
                            <div className="action-text">No</div>
                        </div>
                    </div>
                    {isShowReason && <input className="reason" placeholder="Add reason..." defaultValue={data?.notes} />}
                </>
            )}
        </div>
    )
}
