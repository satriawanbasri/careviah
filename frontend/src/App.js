import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { Dashboard, Profile, ScheduleDetails, ClockOut, ScheduleCompleted } from './pages'
import { IsShowBottomBarContext } from './utils/contexts'

export default () => {
    const [isShowBottomBar, setIsShowBottomBar] = useState(true)

    return (
        <IsShowBottomBarContext.Provider value={{ isShowBottomBar, setIsShowBottomBar }}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/schedule-details" element={<ScheduleDetails />} />
                        <Route path="/clock-out" element={<ClockOut />} />
                    </Route>
                    <Route path="/schedule-completed" element={<ScheduleCompleted />} />
                </Routes>
            </BrowserRouter>
        </IsShowBottomBarContext.Provider>
    )
}
