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
var server_1 = require("../src/server");
var supertest_1 = require("supertest");
var tokenUtils_1 = require("../src/utils/tokenUtils");
var adminToken;
var userToken;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        server_1.server.listen(process.env.PORT || 3000, function () {
            console.log("server is listening at port ".concat(process.env.PORT || 3000));
        });
        adminToken = (0, tokenUtils_1.generateToken)(999, 'admin');
        userToken = (0, tokenUtils_1.generateToken)(999, 'user');
        return [2 /*return*/];
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, server_1.shutdown)();
        return [2 /*return*/];
    });
}); });
describe('validateId', function () {
    /* target routes
    1.itemPage
    2.itemByCategory
    3.itemByBrand
    4.handPickedCollection
    */
    it('should response with 422 because of string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemPage').query({ id: 'asd' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        id: {
                            type: 'field',
                            value: 'asd',
                            msg: 'Invalid value',
                            path: 'id',
                            location: 'query'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 422 because of empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByCategory').query({ id: '' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        id: {
                            type: 'field',
                            value: '',
                            msg: 'Invalid value',
                            path: 'id',
                            location: 'query'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 422 because of 0 value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/handPickedCollection').query({ id: 0 })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        id: {
                            type: 'field',
                            value: '0',
                            msg: 'Invalid value',
                            path: 'id',
                            location: 'query'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateSearchValue', function () {
    // target route productSearch
    it('should response with 422 because of empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/productSearch').query({ searchValue: '' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        searchValue: {
                            type: 'field',
                            value: '',
                            msg: 'Invalid value',
                            path: 'searchValue',
                            location: 'query'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateProductId', function () {
    /* target routes
    10.addItemToCart
    11.reduceItemFromCart
    12.removeItemFromCart
    13.toggleItemInWishList
    16.deleteProduct
    */
    it('should response with 422 because of empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/addItemToCart')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(userToken) })
                        .send({ productId: '' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        productId: {
                            type: 'field',
                            value: '',
                            msg: 'Invalid value',
                            path: 'productId',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 422 because of string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .delete('/products/reduceItemFromCart')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(userToken) })
                        .send({ productId: 'dsad' })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        productId: {
                            type: 'field',
                            value: 'dsad',
                            msg: 'Invalid value',
                            path: 'productId',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 422 because of zero value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/toggleItemInWishList')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(userToken) })
                        .send({ productId: 0 })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        productId: {
                            type: 'field',
                            value: 0,
                            msg: 'Invalid value',
                            path: 'productId',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateUserReview', function () {
    //target route upsertUserReview
    it('should response with 422 because of bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/upsertUserReview')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(userToken) })
                        .send({ productId: 'dsad', newReview: 123, newRating: 0 })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        productId: {
                            type: 'field',
                            value: 'dsad',
                            msg: 'Invalid value',
                            path: 'productId',
                            location: 'body'
                        },
                        newReview: {
                            type: 'field',
                            value: 123,
                            msg: 'Invalid value',
                            path: 'newReview',
                            location: 'body'
                        },
                        newRating: {
                            type: 'field',
                            value: 0,
                            msg: 'Invalid value',
                            path: 'newRating',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateProduct', function () {
    // target end point create new item
    //sends an empty body to check for all fields
    it('should response with 422 for bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/createNewProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        brandId: {
                            type: 'field',
                            msg: 'Brand ID must be a positive integer',
                            path: 'brandId',
                            location: 'body'
                        },
                        label: { type: 'field', msg: 'required', path: 'label', location: 'body' },
                        description: {
                            type: 'field',
                            msg: 'required',
                            path: 'description',
                            location: 'body'
                        },
                        price: {
                            type: 'field',
                            msg: 'Price must be a non-negative number',
                            path: 'price',
                            location: 'body'
                        },
                        discount: {
                            type: 'field',
                            msg: 'Discount must be a non-negative number',
                            path: 'discount',
                            location: 'body'
                        },
                        title: { type: 'field', msg: 'required', path: 'title', location: 'body' },
                        quantity: {
                            type: 'field',
                            msg: 'Quantity must be a non-negative integer',
                            path: 'quantity',
                            location: 'body'
                        },
                        imageUrl: {
                            type: 'field',
                            msg: 'Invalid value',
                            path: 'imageUrl',
                            location: 'body'
                        },
                        categoriesIdsList: {
                            type: 'field',
                            msg: 'Invalid value',
                            path: 'categoriesIdsList',
                            location: 'body'
                        },
                        imagesUrlList: {
                            type: 'field',
                            msg: 'Invalid value',
                            path: 'imagesUrlList',
                            location: 'body'
                        },
                        tags: {
                            type: 'field',
                            msg: 'Invalid value',
                            path: 'tags',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateProductUpdate', function () {
    it('should response with 422 for bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/products/updateProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({
                        productId: 'asd',
                        brandId: 0,
                        label: 'as',
                        description: '   ',
                        price: '0',
                        title: ' a',
                        imageUrl: '1234',
                        quantity: ' hg ',
                        discount: -1
                    })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        productId: {
                            type: 'field',
                            value: 'asd',
                            msg: 'Invalid value',
                            path: 'productId',
                            location: 'body'
                        },
                        brandId: {
                            type: 'field',
                            value: 0,
                            msg: 'Brand ID must be a positive integer',
                            path: 'brandId',
                            location: 'body'
                        },
                        label: {
                            type: 'field',
                            value: 'as',
                            msg: 'Invalid value',
                            path: 'label',
                            location: 'body'
                        },
                        description: {
                            type: 'field',
                            value: '   ',
                            msg: 'cant be just spaces',
                            path: 'description',
                            location: 'body'
                        },
                        price: {
                            type: 'field',
                            value: '0',
                            msg: 'Price must be a non-negative number',
                            path: 'price',
                            location: 'body'
                        },
                        discount: {
                            type: 'field',
                            value: -1,
                            msg: 'Discount must be a non-negative number',
                            path: 'discount',
                            location: 'body'
                        },
                        title: {
                            type: 'field',
                            value: ' a',
                            msg: 'Invalid value',
                            path: 'title',
                            location: 'body'
                        },
                        quantity: {
                            type: 'field',
                            value: ' hg ',
                            msg: 'Quantity must be a non-negative integer',
                            path: 'quantity',
                            location: 'body'
                        },
                        imageUrl: {
                            type: 'field',
                            value: '1234',
                            msg: 'Invalid URL format',
                            path: 'imageUrl',
                            location: 'body'
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateUser', function () {
    // target end points
    // register
    // registerAdmin
    it('should response with 422 for bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/user/registerAdmin')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({
                        lastName: '',
                        email: 'aaa222',
                        password: '1234',
                        phone: ' ',
                        DOB: 'aaa',
                        imageUrl: 'utl'
                    })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
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
                                message: 'Invalid email format'
                            },
                            {
                                message: 'Password must be at least 6 characters long'
                            },
                            {
                                message: 'Invalid date format'
                            },
                            {
                                message: 'Invalid URL format'
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('validateLogin', function () {
    // target routes
    // register
    // registerAdmin
    it('should response with 422 for bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/user/login')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({
                        email: '',
                        password: '1234'
                    })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        errors: [
                            {
                                message: 'Email is required'
                            },
                            {
                                message: 'Invalid email format'
                            },
                            {
                                message: 'E-mail doesnt exist'
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
describe('validateUpdateUser', function () {
    it('should response with 422 for bad input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/user/update')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({
                        firstName: 'aa',
                        lastName: '        ',
                        phone: '',
                        DOB: '123',
                        imageUrl: 'ddd/ddd',
                        password: '123'
                    })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(422);
                    expect(resp.body).toEqual({
                        errors: [
                            {
                                message: 'Invalid value'
                            },
                            {
                                message: 'cant be just spaces'
                            },
                            {
                                message: 'Password must be at least 6 characters long'
                            },
                            {
                                message: 'Invalid value'
                            },
                            {
                                message: 'cant be just spaces'
                            },
                            {
                                message: 'Invalid date format'
                            },
                            {
                                message: 'Invalid URL format'
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('testing tokens', function () {
    it('should response with 401 for no token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).post('/products/addItemToCart')];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 403 for invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).post('/user/registerAdmin').set({ 'Content-type': 'Application/json', Authorization: "bearer asd" })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response with 403 for unauthorized role', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .delete('/products/deleteProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(userToken) })];
                case 1:
                    resp = _a.sent();
                    expect(resp.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
});
