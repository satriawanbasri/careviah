import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchAllSchedules = () => {
    return axios.get(`${API_BASE_URL}/schedules`)
}

export const fetchTodaySchedules = () => {
    return axios.get(`${API_BASE_URL}/schedules/today`)
}

export const fetchScheduleById = id => {
    return axios.get(`${API_BASE_URL}/schedules/${id}`)
}

export const startSchedule = (id, latitude, longitude, address) => {
    return axios.post(`${API_BASE_URL}/schedules/${id}/start`, { latitude, longitude, address })
}

export const endSchedule = (id, latitude, longitude, address) => {
    return axios.post(`${API_BASE_URL}/schedules/${id}/end`, { latitude, longitude, address })
}

export const cancelSchedule = id => {
    return axios.post(`${API_BASE_URL}/schedules/${id}/cancel`)
}

export const updateTaskStatus = (taskId, data) => {
    return axios.post(`${API_BASE_URL}/tasks/${taskId}/update`, data)
}

export const fetchDashboardStats = () => {
    return axios.get(`${API_BASE_URL}/dashboard/stats`)
}
