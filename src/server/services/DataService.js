'use strict';
class DataService {
    constructor(socket) {
        this.dbModel = require('../db');
        this.op = this.dbModel.Sequelize.Op;
        this.socket = socket;
    }
    async loadEntity(entity, id, options) {
        let opts;
        if (options) {
            opts = Object.assign({}, options, {
                where: {
                    id: id
                }
            });
        } else {
            opts = {
                where: {
                    id: id
                }
            };
        }
        return await entity.findOne(opts);
    }
    async deleteEntity(entity, id) {
        return await this.dbModel.sequelize.transaction(async (t) => {
            let data = await this.loadEntity(entity, id, {
                transaction: t
            });
            if (data) {
                await data.destroy({
                    individualHooks: true,
                    transaction: t
                });
            }
            return id;
        });
    }
    async deleteEntityBulk(entity, ids) {
        return await this.dbModel.sequelize.transaction(async (t) => {
            await entity.destroy({
                where: {
                    id: {
                        [this.op.in]: ids
                    }
                },
                individualHooks: true,
                transaction: t
            });
            return ids;
        });
    }
    
    async deleteEntitiesWithOptions(entity, options) {
        return await this.dbModel.sequelize.transaction(async (t) => {
            const deleteOptions = Object.assign({
                individualHooks: true,
                transaction: t
            }, options);
            const response = await entity.destroy(deleteOptions);
            return response;
        });
    }
    
    async createEntity(entity, data, options) {
        let rs = await this.dbModel.sequelize.transaction(async (t) => {
            return await entity.create(data, {
                transaction: t
            });
        });
        if (options) {
            return await this.loadEntity(entity, rs.id, options);
        }
        return rs;
    }
    async createEntityBulk(entity, data, options) {
        let rs = await this.dbModel.sequelize.transaction(async (t) => {
            return await entity.bulkCreate(data, {
                returning: true,
                individualHooks: true,
                transaction: t
            });
        });
        if (options) {
            let newIds = rs.map(newEntity => {
                return newEntity.get('id');
            });
            options.where = {
                id: {
                    [this.op.in]: newIds
                }
            };
            return await this.listEntities(entity, options);
        }
        return rs;
    }
    async saveEntity(entity, id, changes, options) {
        let rs = await this.dbModel.sequelize.transaction(async (t) => {
            let data = await this.loadEntity(entity, id, {
                transaction: t
            });
            if (data) {
                await data.update(changes, {
                    individualHooks: true,
                    transaction: t
                });
                return id;
            }
            return null;
        });
        if (rs && options) {
            return await this.loadEntity(entity, id, options);
        }
        return rs;
    }
    async listEntities(entity, options) {
        let data;
        let paginate = options && options.limit;
        if (paginate) {
            let rs = await entity.findAndCountAll(options);
            data = Object.assign({
                pagination: {
                    total: rs.count,
                    limit: options.limit,
                    offset: options.offset
                }
            }, {
                rows: rs.rows
            });
        } else {
            let rs = await entity.findAll(options);
            data = Object.assign({
                pagination: {
                    total: rs.length,
                }
            }, {
                rows: rs
            });
        }
        return data;
    }
}
module.exports = DataService;