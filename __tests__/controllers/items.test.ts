import { getItems } from '../../src/controllers/items';
import express from 'express';
import request from 'supertest';

const app = express();
app.get('/api/items', getItems); // Define a route for testing

describe("Get items from API error cases", () => {
    it('Should be a 404 response', (done) => {
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

    it('No DB Access (No mocked Response)', (done) => {
        request(app)
            .get(`/api/items`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                // Add your assertions here to validate the response JSON
                expect(res.body['message']).toEqual('Internal Server Error');
                expect(res.body['data']).toEqual({});
                // Add more assertions for the data
                done();
            });
    });
});