import BaseService from "./BaseService";

export class AuthService extends BaseService {
    constructor() {
        super('auth');
    }

    async login(data) {
        return this.http.post('/login', data);
    }

    async register(data) {
        return this.http.post('/register', data);
    }

    async getUser() {
        return this.http.get('/user');
    }
}