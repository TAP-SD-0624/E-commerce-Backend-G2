"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../src/database/connection");
var server_1 = require("../src/server");
var supertest_1 = require("supertest");
var UsersUtils_1 = require("../src/utils/UsersUtils");
var genaratedUserToken;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection_1.default
                    .authenticate()
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('connected to the database for testing');
                                return [4 /*yield*/, connection_1.default.sync({ alter: true })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function () { return console.log('couldnt connect to the database for testing'); })];
            case 1:
                _a.sent();
                server_1.server.listen(process.env.PORT || 3000, function () {
                    console.log("server is listening at port ".concat(process.env.PORT || 3000));
                });
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, server_1.shutdown)();
                return [4 /*yield*/, connection_1.default.sync({ force: true, match: /_test$/ })];
            case 1:
                _a.sent();
                return [4 /*yield*/, connection_1.default.close()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('integrate user and gest tasks', function () {
    it('should create an admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UsersUtils_1.createUserDB)('admin', 'amr', 'imad', 'amr@gmail.com', '123456', '+00970', Date.parse('2002/02/02'), 'image/url.com')];
                case 1:
                    user = _a.sent();
                    expect(user).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should login user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/user/login')
                        .set({ 'Content-type': 'Application/json' })
                        .send({ email: 'amr@gmail.com', password: '123456' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('register a user', function () {
    var mockUser = {
        user: {
            firstName: 'feras',
            lastName: 'samih',
            email: 'samih@gmail.com',
            phone: '88776656',
            DOB: '1988-06-05T00:00:00.000Z',
            imageUrl: 'bbb.jpg'
        }
    };
    it('should create and register a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).post('/user/register').send({
                        firstName: 'feras',
                        lastName: 'samih',
                        password: '11223344',
                        email: 'samih@gmail.com',
                        phone: '88776656',
                        DOB: '1988-06-05',
                        imageUrl: 'bbb.jpg'
                    })];
                case 1:
                    response = _a.sent();
                    genaratedUserToken = response.body.token;
                    expect(response.status).toBe(201);
                    expect(response.body).toHaveProperty('user');
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a user and response withe 422', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).post('/user/register')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    expect(response.body).toEqual({
                        errors: [
                            {
                                message: 'First name is required'
                            },
                            {
                                message: 'First name must be a string'
                            },
                            {
                                message: 'Last name is required'
                            },
                            {
                                message: 'Last name must be a string'
                            },
                            {
                                message: 'Email is required'
                            },
                            {
                                message: 'Invalid email format'
                            },
                            {
                                message: 'Invalid value'
                            },
                            {
                                message: 'Password is required'
                            },
                            {
                                message: 'Password must be at least 6 characters long'
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('login a user', function () {
    it('should login a user succesfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).post('/user/login').send({
                        email: 'samih@gmail.com',
                        password: '11223344'
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toHaveProperty('user');
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('update user data', function () {
    it('should update user data(password and DOB) succesfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).put('/user/update').set('Authorization', "Bearer ".concat(genaratedUserToken)).send({
                        firstName: 'feras',
                        lastName: 'samih',
                        password: '111222333',
                        phone: '88776656',
                        DOB: '1988-06-05',
                        imageUrl: 'bbb.jpg'
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toEqual({
                        message: 'User updated succesfullly'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update user data(password and DOB) ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).put('/user/update').send({
                        firstName: 'feras',
                        lastName: 'samih',
                        password: '111222333',
                        phone: '88776656',
                        DOB: '1988-06-05',
                        imageUrl: 'bbb.jpg'
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    expect(response.body).toEqual({
                        message: 'No token provided'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Cart and Checkout Operations', function () {
    it('should add an item to the cart', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/addItemToCart')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(genaratedUserToken) })
                        .send({ productId: 1 })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
