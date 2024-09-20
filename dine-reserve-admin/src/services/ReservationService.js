import BaseService from "./BaseService";

export class ReservationService extends BaseService {
    constructor() {
        super('reservations');
    }

    async getAll() {
        return this.http.get('/');
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