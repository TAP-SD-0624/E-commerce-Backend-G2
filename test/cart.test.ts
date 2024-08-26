// import sequelize from '../src/database/connection';
// import { shutdown, app, server } from '../src/server';
// import request from 'supertest';
// import { generateToken } from '../src/utils/tokenUtils';
// import * as TH from '../src/utils/ProductsTestHelper';
// let userToken: string;
// beforeAll(async () => {
//     await sequelize
//         .authenticate()
//         .then(async () => {
//             console.log('connected to the database for testing');
//             await sequelize.sync({ alter: true });
//             userToken = generateToken(1, 'user');
//         })
//         .catch(() => console.log('couldnt connect to the database for testing'));
//     server.listen(3000, () => {
//         console.log(`server is listening at port ${3000}`);
//     });
// });
// afterAll(async () => {
//     shutdown();
//     await sequelize.sync({ force: true, match: /_test$/ });
//     await sequelize.close();
// });
