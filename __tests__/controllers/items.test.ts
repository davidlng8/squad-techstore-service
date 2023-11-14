import { getItems } from '../../src/controllers/items';
import express from 'express';
import request from 'supertest';
import dbPool from '../../src/db/dbPool';
import { jest, describe, beforeEach, it, expect, afterEach } from '@jest/globals';

// Automock the DB pool
jest.mock('../../src/db/dbPool');

// Instantiate app for testing requests
const app = express();

// Configure testable routes. You do not need to match the routes exactly as they are in the app
// As long as the correct controller function is specified for the test route
app.get('/api/items', getItems);

let consoleLogMock: any;
let consoleErrorMock: any;
let querySpy: any;

describe('GET /items', () => {
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