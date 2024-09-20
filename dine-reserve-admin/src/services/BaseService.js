import axios from 'axios';
import { API_URL } from '../config/env.config';

class BaseService {
    baseUrl;
    http;

    constructor(endpoint) {
        this.baseUrl = `${API_URL}/${endpoint}`;
        this.http = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        // Request interceptor to add token
        this.http.interceptors.request.use((config) => {
            const token = sessionStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Response interceptor to handle 401 errors
        this.http.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response && error.response.status === 401) {
                sessionStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        });
    }

    async getAll() {
        return this.http.get('/');
    }

    async get(id) {
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

export default BaseService;
