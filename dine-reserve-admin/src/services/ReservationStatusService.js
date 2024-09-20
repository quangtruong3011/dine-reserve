import BaseService from "./BaseService";

class ReservationStatusService extends BaseService {
    constructor() {
        super('reservation-status');
    }

    async getAll() {
        return this.http.get('/');
    }

    getById(id) {
        return this.http.get(`/${id}`);
    }

    async create(data) {
        return this.http.post('/', data);
    }

    async update(id, data) {
        return this.http.put(`/${id}`, data);
    }

    async delete(id) {
        return this.http.delete(`/${id}`);
    }
}

export default ReservationStatusService;