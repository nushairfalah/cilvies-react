import httpClient from '../Common/Http'

class RentalService {
    retrieveAll(title) {
        return title ? httpClient.get(`/movies/?title=${title}`) : httpClient.get('/movies/')
        // if (title) {
        //     return httpClient.get(`/movies/?title=${title}`)
        // } else {
        //     return httpClient.get('/movies/')
        // }
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
