import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        Authorization: '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'
    }
})

export default api