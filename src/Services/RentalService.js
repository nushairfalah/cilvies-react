import httpClient from '../Common/Http'

class RentalService {
    retrieveAll() {
        return httpClient.get('/users/')
    }
    retrieveById(id) {
        return httpClient.get(`/users/${id}`)
    }
    create(data) {
        return httpClient.post('/users/', data)
    }
    update(id, data) {
        return httpClient.put(`/users/${id}`, data)
    }
    delete(id) {
        return httpClient.delete(`/users/${id}`)
    }
}

export default new RentalService();
