import { getItems, getItem, deleteItem, updateItem, addItem} from '../../src/controllers/items';
import express from 'express';
import request from 'supertest';
import dbPool from '../../src/db/dbPool';
import { jest, describe, beforeEach, it, expect, afterEach } from '@jest/globals';

// Automock the DB pool
jest.mock('../../src/db/dbPool');

// Instantiate app for testing requests
const app = express();
app.use(express.json());

// Configure testable routes. You do not need to match the routes exactly as they are in the app
// As long as the correct controller function is specified for the test route
app.get('/api/items', getItems);
app.get('/api/items/:id(\\d+)', getItem);
app.delete('/api/items/:id(\\d+)', deleteItem);
app.put('/api/items/:id(\\d+)', updateItem);
app.post('/api/items', addItem);

let consoleLogMock: any;
let consoleErrorMock: any;
let querySpy: any;

describe('GET-get-all-items', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        querySpy = jest.spyOn(dbPool, 'query');
    });

    afterEach(() => {
        querySpy.mockRestore();
    });

    it('Invalid API path', (done) => {
        request(app)
            .get(`/api/v1/hello`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                // Add your assertions here to validate the response JSON
                expect(res.body).toEqual({}); // Nothing returned in the body
                // Add more assertions for the data
                done();
            });
    });

    it('DB pool not connected', (done) => {
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .get(`/api/items`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('Internal Server Error');
                expect(res.body['data']).toEqual({});
                expect(querySpy).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('Query successful but no data returned', (done) => {
        // consoleLogMock.mockRestore();
        const mockResult = { rows: [] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .get(`/api/items`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('No records available.');
                expect(res.body['data']).toEqual([]);
                done();
            });
    });

    it('Query successful and data returned', (done) => {
        const mockResult = { rows: [{ 'id': 1, 'name': 'test item' }, { 'id': 2, 'name': 'test item 2' }] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .get(`/api/items`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('');
                expect(res.body['data']).toEqual(mockResult.rows);
                done();
            });
    });
});

describe('GET-get-item-by-id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        querySpy = jest.spyOn(dbPool, 'query');
    });

    afterEach(() => {
        querySpy.mockRestore();
    });

    it('DB pool not connected', (done) => {
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .get(`/api/items/1`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('Internal Server Error');
                expect(res.body['data']).toEqual({});
                expect(querySpy).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('Query successful but no data returned', (done) => {
        const mockResult = { rows: [] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .get(`/api/items/1`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('Item not found');
                expect(res.body['data']).toEqual({});
                done();
            });
    });

    it('Query successful and data returned', (done) => {
        const mockResult = { rows: [{ 'id': 1, 'name': 'test item' }, { 'id': 2, 'name': 'test item 2' }] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .get(`/api/items/1`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual(mockResult.rows[0]);
                done();
            });
    });
});

describe('DELETE-item-by-id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        querySpy = jest.spyOn(dbPool, 'query');
    });

    afterEach(() => {
        querySpy.mockRestore();
    });

    it('DB pool not connected', (done) => {
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .delete(`/api/items/1`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('DB connection error');
                expect(querySpy).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('DB pool not connected', (done) => {
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .delete(`/api/items/1`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('DB connection error');
                expect(querySpy).toHaveBeenCalledTimes(1);
                done();
            });
    });
    it('Query successful but no item was deleted', (done) => {
        // consoleLogMock.mockRestore();
        const mockResult = { rowCount: 0 };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .delete(`/api/items/15`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('item does not exist for deletion');
                // expect(querySpy).toHaveBeenCalledWith('SELECT * FROM items WHERE id = $1;', [15]);
                done();
            });
    });

    it('Query successful and item deleted', (done) => {
        const mockResult = { rowCount: 1 };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);

        request(app)
            .delete(`/api/items/17`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['message']).toEqual('Deletion success.');
                done();
            });
    });
});

// TODO: Mock joi library 'object' and 'validate' functions for PUT and POST unit tests
describe('PUT-update-item-by-id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        querySpy = jest.spyOn(dbPool, 'query');
    });

    afterEach(() => {
        querySpy.mockRestore();
    });
    it ('No json data passed', (done) => {
        request(app)
            .put(`/api/items/1`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                done();
            });
    });

    it ('JSON data missing required field', (done) => {
        // TODO: Mock the joi item schema object to remove dependency on current structure for tests
        // for now, generate an object that doesn't conform to the itemShema
        const invalidItem = {'invalid' : 'field'};
        request(app)
            .put(`/api/items/1`)
            .send(invalidItem)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('\"name\" is required');
                done();
            });
    });
    
    it ('JSON data value not in correct format', (done) => {
        // TODO: Mock the joi item schema object to remove dependency on current structure for tests
        // for now, generate an object that doesn't conform to the itemShema
        const invalidItem = {'name' : 'test', 'price' : 'invalid format', 'description' : 'desc'};
        request(app)
            .put(`/api/items/1`)
            .send(invalidItem)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('\"price\" must be a number');
                done();
            });
    });

    it ('Valid data submitted but no DB connection', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .put(`/api/items/1`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('DB connection error');
                done();
            });
    });

    it ('Valid data submitted but item not found', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        const mockResult = { rows: [] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);
        request(app)
            .put(`/api/items/1`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('Item not found in DB for update.');
                done();
            });
    });

    it ('Valid data submitted and item updated', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        const mockResult = { rows: [itemInfo] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);
        request(app)
            .put(`/api/items/1`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual(itemInfo);
                expect(res.body['message']).toEqual('Successful product update');
                done();
            });
    });
});

describe('POST-add-item', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        querySpy = jest.spyOn(dbPool, 'query');
    });

    afterEach(() => {
        querySpy.mockRestore();
    });
    it ('No json data passed', (done) => {
        request(app)
            .post(`/api/items/`)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                done();
            });
    });

    it ('JSON data missing required field', (done) => {
        const invalidItem = {'invalid' : 'field'};
        request(app)
            .post(`/api/items`)
            .send(invalidItem)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('\"name\" is required');
                done();
            });
    });
    
    it ('JSON data value not in correct format', (done) => {
        const invalidItem = {'name' : 'test', 'price' : 'invalid format', 'description' : 'desc'};
        request(app)
            .post(`/api/items`)
            .send(invalidItem)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('\"price\" must be a number');
                done();
            });
    });

    it ('Valid data submitted but no DB connection', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        (dbPool.query as jest.Mock).mockRejectedValueOnce(new Error('DB connection error') as never);
        request(app)
            .post(`/api/items/`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('DB connection error');
                done();
            });
    });

    it ('Valid data submitted but item not added', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        const mockResult = { rows: [] as {}[] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);
        request(app)
            .post(`/api/items/`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual({});
                expect(res.body['message']).toEqual('Unable to add item in DB.');
                done();
            });
    });

    it ('Valid data submitted and item added', (done) => {
        const itemInfo = {'name' : 'test', 'price' : 6.77, 'description' : 'desc'};
        const mockResult = { rows: [itemInfo] };
        (dbPool.query as jest.Mock).mockResolvedValueOnce(mockResult as never);
        request(app)
            .post(`/api/items`)
            .send(itemInfo)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body['data']).toEqual(itemInfo);
                expect(res.body['message']).toEqual('Successfully added the product.');
                done();
            });
    });
});

