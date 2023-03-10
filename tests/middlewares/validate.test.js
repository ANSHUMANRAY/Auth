/* eslint-disable no-useless-escape */
// eslint-disable-next-line import/no-extraneous-dependencies
const joi = require('joi');
const validator = require('../../src/middlewares/validate');

describe('validateRequest error cases', () => {
  it('should return error message when schema doesnot match', () => {
    const mockReq = { body: { name: 123 } };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ name: joi.string().required() });
    validator.validateRequest(schema)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: '\"name\" must be a string' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return error message when required field is empty', () => {
    const mockReq = { body: {} };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ name: joi.string().required() });
    validator.validateRequest(schema)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: '\"name\" is required' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

describe('validateRequest', () => {
  it('should call next function', () => {
    const mockReq = { body: { name: 'Task 1' } };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ name: joi.string().required() });
    validator.validateRequest(schema)(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });
});

describe('validateParams error cases', () => {
  it('should return error message when schema doesnot match', () => {
    const mockReq = { params: { id: 'abc' } };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ id: joi.number().required() });
    validator.validateParams(schema)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: '\"id\" must be a number' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return error message when required field is empty', () => {
    const mockReq = { params: {} };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ id: joi.number().required() });
    validator.validateParams(schema)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: '\"id\" is required' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

describe('validateParams', () => {
  it('should call next function', () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ id: joi.number().required() });
    validator.validateParams(schema)(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });
});

describe('validateQuery', () => {
  it('should call next function', () => {
    const mockReq = { query: { id: 1 } };
    const mockRes = { status: jest.fn(), json: jest.fn() };
    const mockNext = jest.fn();
    const schema = joi.object({ id: joi.number().required() });
    validator.validateQuery(schema)(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });
});
