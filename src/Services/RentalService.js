import httpClient from '../Common/Http'

class RentalService {
    searchByTitle(title) {
        return httpClient.get(`/movies?title=${title}`)
    }
    retrieveAll() {
        return httpClient.get('/movies/')
    }
    retrieveById(id) {
        return httpClient.get(`/movies/${id}`)
    }
    create(data) {
        return httpClient.post('/movies/', data)
    }
    update(id, data) {
        return httpClient.put(`/movies/${id}`, data)
    }
    delete(id) {
        return httpClient.delete(`/movies/${id}`)
    }
}

export default new RentalService();
