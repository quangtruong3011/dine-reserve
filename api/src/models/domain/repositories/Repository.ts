import { CreateOptions, DestroyOptions, FindOptions, Identifier, Model, ModelStatic, UpdateOptions } from "sequelize";
import { IReposiory } from "./IReposiory";

export abstract class Repository<T extends Model, K extends Buffer | Identifier> implements IReposiory<T, K> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    public async getAll(options?: FindOptions): Promise<T[]> {
        const defaultOptions: FindOptions = {
            where: {
                isDeleted: false,
                ...options?.where,
            },
        };
        return this.model.findAll(defaultOptions);
    }

    public async getById(options?: FindOptions): Promise<T | null> {
        const defaultOptions: FindOptions = {
            where: {
                isDeleted: false,
                ...options?.where,
            },
        };
        return this.model.findOne(defaultOptions);
    }

    public async create(entity: T, options?: CreateOptions): Promise<T> {
        return entity.save(options);
    }

    public async update(entity: T, options: UpdateOptions): Promise<T> {
        return entity.update(options);
    }

    public async delete(id: K, options?: DestroyOptions): Promise<boolean> {
        const record = await this.model.findByPk(id);

        const defaultOptions: DestroyOptions = {
            where: {
                isDeleted: true,
                ...options?.where,
            },
        };

        if (!record) {
            return false;
        }

        await record.destroy(defaultOptions);

        return true;
    }
}
