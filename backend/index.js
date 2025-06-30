const express = require('express')
const app = express()
const PORT = 4000
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})
app.use(express.json())

let schedules = require('./data.json')

const getAllServices = () => {
    return schedules.flatMap(client =>
        client.services.map(service => ({
            ...service,
            clientId: client.id,
            clientName: client.clientName,
            clientEmail: client.clientEmail,
            clientPhone: client.clientPhone,
            clientProfilePhotoUrl: client.clientProfilePhotoUrl,
            clientAddress: client.clientAddress,
        }))
    )
}

app.get('/schedules', (req, res) => {
    res.json(getAllServices())
})

app.get('/schedules/today', (req, res) => {
    const today = new Date().toISOString().slice(0, 10)
    const todaySchedules = getAllServices().filter(s => s.scheduledDate === today)
    res.json(todaySchedules)
})

app.get('/schedules/:id', (req, res) => {
    const all = getAllServices()
    const schedule = all.find(s => s.serviceId === req.params.id)
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' })
    res.json(schedule)
})

app.post('/schedules/:id/start', (req, res) => {
    const { latitude, longitude, address } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            if (service.serviceId === req.params.id) {
                service.actualClockIn = new Date().toISOString()
                service.clockInLatitude = latitude || null
                service.clockInLongitude = longitude || null
                service.clockInAddress = address || client.clientAddress
                service.status = 'in_progress'
                updated = true
            }
        })
    })

    updated ? res.json({ message: 'Clock-in recorded' }) : res.status(404).json({ error: 'Service not found' })
})

app.post('/schedules/:id/end', (req, res) => {
    const { latitude, longitude, address } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            if (service.serviceId === req.params.id) {
                service.actualClockOut = new Date().toISOString()
                service.clockOutLatitude = latitude || null
                service.clockOutLongitude = longitude || null
                service.clockOutAddress = address || client.clientAddress
                service.status = 'completed'
                updated = true
            }
        })
    })

    updated ? res.json({ message: 'Clock-out recorded' }) : res.status(404).json({ error: 'Service not found' })
})

app.post('/schedules/:id/cancel', (req, res) => {
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            if (service.serviceId === req.params.id) {
                service.actualClockIn = null
                service.actualClockOut = null
                service.clockInLatitude = null
                service.clockInLongitude = null
                service.clockInAddress = null
                service.clockOutLatitude = null
                service.clockOutLongitude = null
                service.clockOutAddress = null
                service.status = 'cancelled'
                updated = true
            }
        })
    })

    updated ? res.json({ message: 'Schedule cancelled' }) : res.status(404).json({ error: 'Service not found' })
})

app.post('/tasks/:taskId/update', (req, res) => {
    const { completed, notes } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            service.tasks.forEach(task => {
                if (task.taskId === req.params.taskId) {
                    task.completed = completed
                    task.notes = notes
                    updated = true
                }
            })
        })
    })

    updated ? res.json({ message: 'Task updated' }) : res.status(404).json({ error: 'Task not found' })
})

app.get('/dashboard/stats', (req, res) => {
    const allServices = getAllServices()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let missedScheduleCount = 0
    let upcomingTodayScheduleCount = 0
    let todayCompletedScheduleCount = 0

    allServices.forEach(service => {
        const scheduledDate = new Date(service.scheduledDate)
        scheduledDate.setHours(0, 0, 0, 0)

        if (service.status === 'completed' && scheduledDate.getTime() === today.getTime()) {
            todayCompletedScheduleCount++
        } else if (scheduledDate.getTime() < today.getTime() && service.status !== 'completed' && service.status !== 'cancelled') {
            missedScheduleCount++
        } else if (scheduledDate.getTime() === today.getTime() && service.status === 'scheduled') {
            upcomingTodayScheduleCount++
        }
    })

    res.json({
        missedSchedule: missedScheduleCount,
        upcomingTodaySchedule: upcomingTodayScheduleCount,
        todayCompletedSchedule: todayCompletedScheduleCount,
    })
})

app.get('/reset', (req, res) => {
    delete require.cache[require.resolve('./data.json')]
    schedules = require('./data.json')
    res.json({ message: 'Data has been reset' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
