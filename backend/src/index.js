const express = require('express')
const app = express()
const PORT = process.env.PORT
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})
app.use(express.json())

const schedules = require('./data.json')

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
    const { location } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            if (service.serviceId === req.params.id) {
                service.actualClockIn = new Date().toISOString()
                service.clockInLocation = location || 'Unknown'
                service.status = 'in_progress'
                updated = true
            }
        })
    })

    updated ? res.json({ message: 'Clock-in recorded' }) : res.status(404).json({ error: 'Service not found' })
})

app.post('/schedules/:id/end', (req, res) => {
    const { location } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            if (service.serviceId === req.params.id) {
                service.actualClockOut = new Date().toISOString()
                service.clockOutLocation = location || 'Unknown'
                service.status = 'completed'
                updated = true
            }
        })
    })

    updated ? res.json({ message: 'Clock-out recorded' }) : res.status(404).json({ error: 'Service not found' })
})

app.post('/tasks/:taskId/update', (req, res) => {
    const { completed, notes } = req.body
    let updated = false

    schedules.forEach(client => {
        client.services.forEach(service => {
            service.tasks.forEach(task => {
                if (task.taskId === req.params.taskId) {
                    if (typeof completed === 'boolean') task.completed = completed
                    if (notes) task.notes = notes
                    updated = true
                }
            })
        })
    })

    updated ? res.json({ message: 'Task updated' }) : res.status(404).json({ error: 'Task not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
