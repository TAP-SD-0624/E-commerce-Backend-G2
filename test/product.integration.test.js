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
var tokenUtils_1 = require("../src/utils/tokenUtils");
var TH = require("../src/utils/ProductsTestHelper");
var adminToken;
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
                                return [4 /*yield*/, TH.seedTestCategories()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, TH.seedTestBrands()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, TH.seedTestProducts()];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, TH.seedTestProductsCategories()];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, connection_1.default.sync({ alter: true })];
                            case 5:
                                _a.sent();
                                adminToken = (0, tokenUtils_1.generateToken)(999, 'admin');
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function () { return console.log('couldnt connect to the database for testing'); })];
            case 1:
                _a.sent();
                server_1.server.listen(3000, function () {
                    console.log("server is listening at port ".concat(3000));
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
describe('crud on products', function () {
    it('create product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/createNewProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send(TH.createProductResults)];
                case 1:
                    createResp = _a.sent();
                    expect(createResp.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create product with bad category id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products/createNewProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send(TH.createProductBadConstrain)];
                case 1:
                    createResp = _a.sent();
                    expect(createResp.status).toBe(500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .delete('/products/deleteProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({ productId: 1 })];
                case 1:
                    deleteResp = _a.sent();
                    expect(deleteResp.status).toBe(202);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/products/updateProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({ productId: 2, brandId: 3, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 })];
                case 1:
                    updateResp = _a.sent();
                    expect(updateResp.status).toBe(202);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update product that doesnt exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/products/updateProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({ productId: 99, brandId: 3, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 })];
                case 1:
                    updateResp = _a.sent();
                    expect(updateResp.status).toBe(500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update product to a brand that doesnt exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/products/updateProduct')
                        .set({ 'Content-type': 'Application/json', Authorization: "bearer ".concat(adminToken) })
                        .send({ productId: 1, brandId: 99, label: 'test', description: 'test', price: 22, title: 'ara', discount: 222 })];
                case 1:
                    updateResp = _a.sent();
                    expect(updateResp.status).toBe(500);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get item page', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getPageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemPage').query({ id: 2 })];
                case 1:
                    getPageResp = _a.sent();
                    expect(getPageResp.status).toBe(200);
                    expect(getPageResp.body).toEqual(TH.itemPageResults);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('testing products end points', function () {
    it('should get all the products in category 2', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getPageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByCategory').query({ id: 2 })];
                case 1:
                    getPageResp = _a.sent();
                    expect(getPageResp.status).toBe(200);
                    expect(getPageResp.body).toHaveLength(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get all the products in brand 3', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getPageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByBrand').query({ id: 3 })];
                case 1:
                    getPageResp = _a.sent();
                    expect(getPageResp.status).toBe(200);
                    expect(getPageResp.body).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get all handPickedCollection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var handPickedResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/handPickedCollection').query({ id: 2 })];
                case 1:
                    handPickedResp = _a.sent();
                    expect(handPickedResp.status).toBe(200);
                    expect(handPickedResp.body).toHaveLength(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should search for product by name or brand', function () { return __awaiter(void 0, void 0, void 0, function () {
        var searchResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/productSearch').query({ searchValue: 'ara' })];
                case 1:
                    searchResp = _a.sent();
                    expect(searchResp.status).toBe(200);
                    expect(searchResp.body).toHaveLength(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test home page', function () { return __awaiter(void 0, void 0, void 0, function () {
        var homePageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/homePage')];
                case 1:
                    homePageResp = _a.sent();
                    expect(homePageResp.status).toBe(200);
                    expect(homePageResp.body).toEqual(TH.homePageResults);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test NewArraivals', function () { return __awaiter(void 0, void 0, void 0, function () {
        var homePageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/newArrivals')];
                case 1:
                    homePageResp = _a.sent();
                    expect(homePageResp.status).toBe(200);
                    expect(homePageResp.body).toEqual(TH.newArrivalsResults);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test card one', function () { return __awaiter(void 0, void 0, void 0, function () {
        var homePageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardOne')];
                case 1:
                    homePageResp = _a.sent();
                    expect(homePageResp.status).toBe(200);
                    expect(homePageResp.body).toEqual(TH.cardOneResults);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test card two', function () { return __awaiter(void 0, void 0, void 0, function () {
        var homePageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardTwo')];
                case 1:
                    homePageResp = _a.sent();
                    expect(homePageResp.status).toBe(200);
                    expect(homePageResp.body).toEqual(TH.cardTwoResults);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should test card three', function () { return __awaiter(void 0, void 0, void 0, function () {
        var homePageResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardThree')];
                case 1:
                    homePageResp = _a.sent();
                    expect(homePageResp.status).toBe(200);
                    expect(homePageResp.body).toEqual(TH.cardThreeResults);
                    return [2 /*return*/];
            }
        });
    }); });
});
