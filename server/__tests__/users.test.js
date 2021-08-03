const mongoose = require('mongoose');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.js');
const Users = require("../models/users.js");

jest.mock('../models/users.js');

describe('Users Api tests', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                "email": "joao@mail.com",
                "givenName": "Joao",
                "familyName": "Silva"
            },
            params: {
                id: '123'
            }
        }

        res = {
            status: jest.fn(() => {
                return { 
                    json: jest.fn(),
                    send: jest.fn()
                }
            }),
            json: jest.fn(),
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('createUser tests', () => {

        test('it should return status 201', async () => {
            await createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('it should return status 404', async () => {
            Users.mockImplementation(() => {
                return {
                    save: jest.fn(() => {
                        throw {
                            message: 'error'
                        }
                    })
                }
            });
            await createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('updateUser tests', () => {
        let spy;

        beforeEach(() => {
            spy = jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockImplementation(() => true);
        });

        afterAll(() => {
            spy.mockRestore();
        })

        test('it should return status 200', async () => {
            await updateUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('it should return status 404', async () => {
            spy.mockImplementation(() => false);
            await updateUser(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('getUsers tests', () => {
        test('it should return status 200', async () => {
            await getUsers(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('it should return status 404', async () => {
            const spy = jest.spyOn(Users, 'find').mockImplementation(() => { throw 'error' });
            await getUsers(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            spy.mockRestore();
        });
    });

    describe('deleteUser tests', () => {
        let spy;

        beforeEach(() => {
            spy = jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockImplementation(() => true);
        });

        afterAll(() => {
            spy.mockRestore();
        })

        test('it should return status 200', async () => {
            await deleteUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('it should return status 404', async () => {
            spy.mockImplementation(() => false);
            await deleteUser(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});