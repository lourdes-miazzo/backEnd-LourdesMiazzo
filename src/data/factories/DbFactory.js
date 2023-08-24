import MongooseAdapter from './MongooseAdapter.js';

class DbFactory
{
    static create(payload)
    {
        const dbType = payload ? payload : 'MongooseAdapter';
        const dbs = new Map();

        dbs.set('MongooseAdapter', MongooseAdapter);

        const db = dbs.get(dbType);
        return new db();
    }
}

export default DbFactory;
