'use strict';

const DataService = require('./DataService');

class SongService extends DataService {
    constructor() {
        super();
        this.entity = this.dbModel.Song;
    }

    async list(options) {
        return await this.listEntities(this.entity, options);
    }

    async get(id, options) {
        return await this.loadEntity(this.entity, id, options);
    }

    async save(id, changes, options) {
        return await this.saveEntity(this.entity, id, changes, options);
    }

    async create(data, options) {
        return await this.createEntity(this.entity, data, options);
    }

    async delete(id) {
        return await this.deleteEntity(this.entity, id);
    }
}

module.exports = new SongService();