import './styles.scoped.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useIsMobile } from '../../hooks'

export default () => {
    const navigate = useNavigate()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) {
            navigate('/')
        }
    }, [isMobile])

    return (
        <div className="container">
            <div className="title">Welcome Valery!</div>
            <button className="button-outlined" onClick={() => navigate('/')}>
                Log Out
            </button>
        </div>
    )
}
