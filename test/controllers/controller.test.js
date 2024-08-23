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
var connection_1 = require("../../src/database/connection");
var server_1 = require("../../src/server");
var supertest_1 = require("supertest");
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
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, server_1.shutdown)();
                return [4 /*yield*/, connection_1.default.close()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Get Products By Category Id ', function () {
    var mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 2,
            title: 'Glamour Beauty',
            label: 'Eyeshadow Palette with Mirror',
            price: 20,
            discount: 6,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
            rating: 3.333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 2,
                brandTitle: 'Glamour Beauty'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products for a valid category ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByCategory').query({ id: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 error if no category are found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByCategory').query({ id: 16 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 422 error if the id not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByCategory').query({ id: 'K' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    expect(response.body).toEqual({
                        id: {
                            type: 'field',
                            value: 'K',
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
describe('Get Products by Brand Id', function () {
    var mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products for a valid Brand ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByBrand').query({ id: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 error if no Brand are found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByBrand').query({ id: 12 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 422 error if the id not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemByBrand').query({ id: ' ' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    expect(response.body).toEqual({
                        id: {
                            type: 'field',
                            value: ' ',
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
describe('Get hand Picked Collection Where the product have rating more than 4.5 and the price is more than 100', function () {
    var mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products which meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/handPickedCollection').query({ id: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 error if there is no products meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/handPickedCollection').query({ id: 2 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 422 error if the id not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/handPickedCollection').query({ id: '*' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    expect(response.body).toEqual({
                        id: {
                            type: 'field',
                            value: '*',
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
describe('Get Product by Product Id', function () {
    var mockProducts = {
        id: 1,
        title: 'Essence',
        label: 'Essence Mascara Lash Princess',
        description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        price: 10,
        discount: 7,
        imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
        rating: 3,
        unitsSold: 0,
        quantity: 5,
        totalRatings: 3,
        brand: {
            brandId: 1,
            brandTitle: 'Essence'
        },
        Categories: [
            {
                categoryId: 1,
                categoryTitle: 'beauty'
            }
        ],
        imagesUrls: [
            {
                imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'
            }
        ],
        Ratings: [
            {
                review: 'Very unhappy with my purchase!',
                rating: 2,
                User: {
                    firstName: 'Emily',
                    lastName: 'Johnson'
                }
            },
            {
                review: 'Not as described!',
                rating: 2,
                User: {
                    firstName: 'Michael',
                    lastName: 'Williams'
                }
            },
            {
                review: 'Very satisfied!',
                rating: 5,
                User: {
                    firstName: 'Sophia',
                    lastName: 'Brown'
                }
            }
        ]
    };
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return product for a valid Brand ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemPage').query({ id: 1 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 404 error if no Product found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemPage').query({ id: 40 })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a 422 error if the id not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemPage').query({ id: '/' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    expect(response.body).toEqual({
                        id: {
                            type: 'field',
                            value: '/',
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
describe('Get All the Products that have less than 20 item', function () {
    var mockProducts = [
        {
            id: 1,
            title: 'Essence',
            label: 'Essence Mascara Lash Princess',
            price: 10,
            discount: 7,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 1,
                brandTitle: 'Essence'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 6,
            title: 'Calvin Klein',
            label: 'Calvin Klein CK One',
            price: 50,
            discount: 0,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 6,
                brandTitle: 'Calvin Klein'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 9,
            title: 'Dolce & Gabbana',
            label: 'Dolce Shine Eau de',
            price: 70,
            discount: 11,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png',
            rating: 3.3333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 9,
                brandTitle: 'Dolce & Gabbana'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 12,
            title: 'Dior',
            label: "Dior Women's Leather Bag",
            price: 130,
            discount: 8,
            imageUrl: "https://cdn.dummyjson.com/products/images/womens-bags/Heshe%20Women's%20Leather%20Bag/imageUrl.png",
            rating: 4.333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 8,
                brandTitle: 'Dior'
            },
            Categories: [
                {
                    categoryId: 3,
                    categoryTitle: 'womens-bags'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products which meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardOne')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return error 404 if no products meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardOne')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get All the Products that have more than 15% discount', function () {
    var mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 7,
            title: 'Chanel',
            label: 'Chanel Coco Noir Eau De',
            price: 130,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png',
            rating: 3,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 7,
                brandTitle: 'Chanel'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 8,
            title: 'Dior',
            label: "Dior J'adore",
            price: 90,
            discount: 17,
            imageUrl: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
            rating: 4.3333,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 8,
                brandTitle: 'Dior'
            },
            Categories: [
                {
                    categoryId: 2,
                    categoryTitle: 'fragrances'
                }
            ]
        },
        {
            id: 13,
            title: 'Prada',
            label: 'Prada Women Bag',
            price: 600,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/womens-bags/Prada%20Women%20Bag/imageUrl.png',
            rating: 4,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 11,
                brandTitle: 'Prada'
            },
            Categories: [
                {
                    categoryId: 3,
                    categoryTitle: 'womens-bags'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products which meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardTwo')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return error 404 if no products meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardTwo')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get All the Products that have more than 4.5 Rating', function () {
    var mockProducts = [
        {
            id: 3,
            title: 'Velvet Touch',
            label: 'Powder Canister',
            price: 15,
            discount: 18,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 3,
                brandTitle: 'Velvet Touch'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 4,
            title: 'Chic Cosmetics',
            label: 'Red Lipstick',
            price: 13,
            discount: 19,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 4,
                brandTitle: 'Chic Cosmetics'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        },
        {
            id: 5,
            title: 'Nail Couture',
            label: 'Red Nail Polish',
            price: 9,
            discount: 2,
            imageUrl: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
            rating: 4.666,
            totalRatings: 3,
            unitsSold: 0,
            brand: {
                brandId: 5,
                brandTitle: 'Nail Couture'
            },
            Categories: [
                {
                    categoryId: 1,
                    categoryTitle: 'beauty'
                }
            ]
        }
    ];
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should return products which meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardThree')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockProducts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return error 404 if no products meet the required qualifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/itemCardThree')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
});