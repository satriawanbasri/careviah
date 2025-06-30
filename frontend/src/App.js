import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Dashboard, Profile, ScheduleDetails, ClockOut, ScheduleCompleted, ViewProgress, ViewReport } from './pages'
import { IsShowBottomBarContext, IsShowCompletedModalContext, IsShowLoadingContext } from './utils/contexts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingModal } from './components'

export default () => {
    const [isShowBottomBar, setIsShowBottomBar] = useState(true)
    const [isShowCompletedModal, setIsShowCompletedModal] = useState(false)
    const [isShowLoading, setIsShowLoading] = useState(false)

    return (
        <>
            <IsShowLoadingContext.Provider value={{ isShowLoading, setIsShowLoading }}>
                <IsShowCompletedModalContext.Provider value={{ isShowCompletedModal, setIsShowCompletedModal }}>
                    <IsShowBottomBarContext.Provider value={{ isShowBottomBar, setIsShowBottomBar }}>
                        <BrowserRouter>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/schedule-details" element={<ScheduleDetails />} />
                                    <Route path="/clock-out" element={<ClockOut />} />
                                    <Route path="/view-progress" element={<ViewProgress />} />
                                    <Route path="/view-report" element={<ViewReport />} />
                                </Route>
                                <Route path="/schedule-completed" element={<ScheduleCompleted />} />
                            </Routes>
                        </BrowserRouter>
                        <ToastContainer />
                        <LoadingModal />
                    </IsShowBottomBarContext.Provider>
                </IsShowCompletedModalContext.Provider>
            </IsShowLoadingContext.Provider>
        </>
    )
}
