import './styles.scoped.css'
import { useEffect, useState } from 'react'
import { ScheduleCard, ClockCard } from '../../components'
import { fetchAllSchedules } from '../../utils/api'

export default () => {
    const [schedules, setSchedules] = useState()

    useEffect(() => {
        fetchAllSchedules().then(res => setSchedules(res.data))
    }, [])

    return (
        <>
            <div className="title">Dashboard</div>
            <div className="welcome">Welcome Valery!</div>
            <ClockCard />
            <div className="total-container desktop">
                <div className="total-card">
                    <div className="total-value" style={{ color: '#D32F2F' }}>
                        7
                    </div>
                    <div className="total-text">Missed Schedule</div>
                </div>
                <div className="total-card">
                    <div className="total-value" style={{ color: '#ED6C02' }}>
                        12
                    </div>
                    <div className="total-text">Upcoming Today's Schedule</div>
                </div>
                <div className="total-card">
                    <div className="total-value" style={{ color: '#2E7D32' }}>
                        5
                    </div>
                    <div className="total-text">Today's Completed Schedule</div>
                </div>
            </div>
            <div className="total-container mobile">
                <div className="total-card">
                    <div className="total-value" style={{ color: '#D32F2F' }}>
                        7
                    </div>
                    <div className="total-text">Missed Schedule</div>
                </div>
                <div className="total-container2">
                    <div className="total-card">
                        <div className="total-value" style={{ color: '#ED6C02' }}>
                            12
                        </div>
                        <div className="total-text" style={{ textAlign: 'center' }}>
                            Upcoming Today's <br /> Schedule
                        </div>
                    </div>
                    <div className="total-card">
                        <div className="total-value" style={{ color: '#2E7D32' }}>
                            5
                        </div>
                        <div className="total-text" style={{ textAlign: 'center' }}>
                            Today's Completed <br /> Schedule
                        </div>
                    </div>
                </div>
            </div>
            <div className="item-title-container">
                <div className="item-title">Schedule</div>
                <div className="item-total">5</div>
            </div>
            <div className="schedule-container">{schedules?.map((item, index) => <ScheduleCard data={item} key={index} />)}</div>
        </>
    )
}
