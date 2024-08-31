import { db } from '../database';
import Cart from '../database/models/cart';
import Products from '../database/models/products';
import Users from '../database/models/users';
import { CustomError } from '../middleware/customError';
import bcrypt from 'bcrypt';

export async function findUserByEmail(email: string): Promise<Users> {
    const user = await db.Users.findOne({
        where: { email }
    });
    if (user) {
        return user;
    } else {
        throw new CustomError('User not found', 404);
    }
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    try {
        const results = await findUserByEmail(email);
        return true;
    } catch (error) {
        return false;
    }
}

export async function createUserDB(
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string = '00970',
    DOB: number = Date.parse('1980-08-08'),
    imageUrl: string = 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
) {
    try {
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const result = await db.Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            DOB,
            imageUrl,
            role
        });
        return result;
    } catch (err) {
        throw new CustomError('Error creating User', 500);
    }
}
export async function getUserById(id: number): Promise<Users> {
    const user = await Users.findByPk(id);
    if (user) return user;
    throw new CustomError('User not found', 404);
}
export async function updateUserById(
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
    DOB: number,
    imageUrl: string
) {
    try {
        const oldUser = await getUserById(id);
        const hashedPassword = await bcrypt.hash(String(password), 10);

        const user = await db.Users.update(
            {
                firstName: firstName || oldUser.dataValues.firstName,
                lastName: lastName || oldUser.dataValues.lastName,
                password: hashedPassword || oldUser.dataValues.password,
                phone: phone || oldUser.dataValues.phone,
                DOB: DOB || oldUser.dataValues.DOB,
                imageUrl: imageUrl || oldUser.dataValues.imageUrl
            },
            {
                where: { id }
            }
        );
    } catch (error) {
        throw new CustomError('unable to update user profile', 500);
    }
}

export async function getUserProfile(id: number): Promise<any> {
    const user = await Users.findByPk(id, {
        attributes: { exclude: ['password', 'role', 'createdAt', 'updatedAt'] },
        include: [db.Address, db.Orders, db.Tranactions, db.Wishlist, db.Ratings]
    });
    if (!user) {
        throw new CustomError('Unable to get profile', 404);
    }

    const cartItems = await Cart.findAll({
        where: { userId: id }
    });

    if (cartItems.length > 0) {
        // Group cart items by productId
        const groupedCartItems = cartItems.reduce((groupedItems: any, item: any) => {
            const { productId } = item;
            if (!groupedItems[productId]) {
                groupedItems[productId] = {
                    product: item.Product,
                    items: []
                };
            }
            groupedItems[productId].items.push(item);
            return groupedItems;
        }, {});

        // Attach grouped cart items to the user object
        return { ...user.toJSON(), Cart: groupedCartItems };
    }
    return { ...user.toJSON(), Cart: [] };
}
