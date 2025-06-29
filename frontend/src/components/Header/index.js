import './styles.scoped.css'
import { Triangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProfilePopUp } from '../../components'
import { useState, useRef } from 'react'

export default () => {
    const [isShowPopUpProfile, setIsShowPopUpProfile] = useState(false)
    const dropdownRefProfile = useRef(null)

    return (
        <div className="container">
            <div className="header">
                <Link to="/">
                    <img className="logo" src="/careviah-logo.png" alt="careviah" height="38px" />
                </Link>
                <div ref={dropdownRefProfile}>
                    <div className="profile" onClick={() => setIsShowPopUpProfile(!isShowPopUpProfile)}>
                        <div className="avatar">
                            <img src="/admin.jpg" alt="User" height="40px" />
                        </div>
                        <div className="name-container">
                            <div className="name">Valery Han</div>
                            <div className="email">Admin@healthcare.io</div>
                        </div>
                        <Triangle fill="#344563" size={8} style={{ transform: 'rotate(180deg)', marginTop: '3px' }} />
                    </div>
                    <ProfilePopUp isShowPopUp={isShowPopUpProfile} setIsShowPopUp={setIsShowPopUpProfile} dropdownRef={dropdownRefProfile} />
                </div>
            </div>
        </div>
    )
}
