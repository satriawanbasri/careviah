import './styles.scoped.css'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, BottomBar } from '../../components'
import { IsShowBottomBarContext } from '../../utils/contexts'

export default () => {
    const { isShowBottomBar } = useContext(IsShowBottomBarContext)

    return (
        <>
            <Header />
            {isShowBottomBar && <BottomBar />}
            <div className="page">
                <Outlet />
            </div>
            <div className="footer">@2025 Careviah, Inc. All rights reserved.</div>
        </>
    )
}
