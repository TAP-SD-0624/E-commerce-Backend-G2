import { db } from '../database';
export const registerTE = {
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
};
