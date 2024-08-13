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
var users_1 = require("../../src/database/models/users");
var supertest_1 = require("supertest");
var server_1 = require("../../src/server");
var request = (0, supertest_1.default)(server_1.app);
afterAll(function () {
    (0, server_1.shutdown)();
});
/*
beforeAll()
*/
// for the same test beforeEach and afterEach
describe('User controller', function () {
    test('should create a user when all required fields are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userData, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = {
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        password: 'password123',
                        phone: '1234567890',
                        DOB: new Date('1990-01-01'),
                        imageUrl: 'http://example.com/image.jpg',
                        role: 'user'
                    };
                    return [4 /*yield*/, users_1.default.create(userData)];
                case 1:
                    user = _a.sent();
                    expect(user).toBeDefined();
                    expect(user.firstName).toBe(userData.firstName);
                    expect(user.lastName).toBe(userData.lastName);
                    expect(user.email).toBe(userData.email);
                    expect(user.phone).toBe(userData.phone);
                    expect(user.password).toBe(userData.password);
                    //! edit
                    expect(new Date(user.DOB).toISOString().slice(0, 10)).toBe('1990-01-01');
                    expect(user.imageUrl).toBe(userData.imageUrl);
                    expect(user.role).toBe(userData.role);
                    return [2 /*return*/];
            }
        });
    }); });
});
// describe('User login', () => {
//     test('should login user with valid credentials', async () => {
//         // Create a user before testing login
//         const user = {
//             email: 'johndoe2@example.com',
//             password: 'password123'
//         };
//
//         const loginData = {
//             email: 'johndoe2@example.com',
//             password: 'password123'
//         };
//
//         const response = await request
//             .post('/login')
//             .send(loginData);
//
//         expect(response.statusCode).toBe(200);
//     });
//
//
//
// });
//! deletes the table after all tests are done use with caution when login in and editing
/*
afterAll(async ()=> {//clears the table
   await  db.Users.sync({ force: true, match: /_test$/ });})
 */ 
