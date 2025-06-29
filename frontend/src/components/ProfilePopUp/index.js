import './styles.scoped.css'
import { useEffect } from 'react'
import { LogOut } from 'lucide-react'

export default ({ isShowPopUp, setIsShowPopUp, dropdownRef }) => {
    useEffect(() => {
        const handleClickOutside = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsShowPopUp(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="filter-container">
            {isShowPopUp && (
                <div className="filter">
                    <LogOut color="#d32f2f" />
                    <div className="signout-text">Sign Out</div>
                </div>
            )}
        </div>
    )
}
