import BaseService from "./BaseService";

class TableService extends BaseService {
    constructor() {
        super("tables");
    }

    async getAll() {
        return this.http.get('/');
    }

    async getById(id) {
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

export default TableService;