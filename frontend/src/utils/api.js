import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

// GET /schedules – fetch all schedules
export const fetchAllSchedules = () => {
    return axios.get(`${API_BASE_URL}/schedules`)
}

// GET /schedules/today – fetch today’s schedules
export const fetchTodaySchedules = () => {
    return axios.get(`${API_BASE_URL}/schedules/today`)
}

// GET /schedules/:id – fetch schedule details incl. tasks
export const fetchScheduleById = scheduleId => {
    return axios.get(`${API_BASE_URL}/schedules/${scheduleId}`)
}

// POST /schedules/:id/start – log start time + location
export const startSchedule = (scheduleId, location) => {
    return axios.post(`${API_BASE_URL}/schedules/${scheduleId}/start`, {
        location
    })
}

// POST /schedules/:id/end – log end time + location
export const endSchedule = (scheduleId, location) => {
    return axios.post(`${API_BASE_URL}/schedules/${scheduleId}/end`, {
        location
    })
}

// POST /tasks/:taskId/update – update task status and optional reason
export const updateTaskStatus = (taskId, { completed, notes }) => {
    return axios.post(`${API_BASE_URL}/tasks/${taskId}/update`, {
        completed,
        notes
    })
}
