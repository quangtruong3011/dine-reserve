export interface IReposiory<T, K> {
    getAll(options?: any): Promise<T[]>;
    getById(options?: any): Promise<T | null>;
    create(entity: T, options?: any): Promise<T>;
    update(entity: T, options: any): Promise<T>;
    delete(id: K, options?: any): Promise<boolean>;
}

// T: Type of the entity
// K: Type of the entity's id