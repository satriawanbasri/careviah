import './styles.scoped.css'
import { House, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default () => {
    const location = useLocation()

    return (
        <div className="container">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className={location.pathname == '/' ? 'menu-item selected' : 'menu-item'}>
                    <House color={location.pathname == '/' ? '#0D5D59' : '#757575'} />
                    <div className="menu-text">Home</div>
                </div>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div className={location.pathname == '/profile' ? 'menu-item selected' : 'menu-item'}>
                    <User color={location.pathname == '/profile' ? '#0D5D59' : '#757575'} />
                    <div className="menu-text">Profile</div>
                </div>
            </Link>
        </div>
    )
}
