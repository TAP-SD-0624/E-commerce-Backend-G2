import Ratings from './models/ratings';
import Brands from './models/brands';
import Address from './models/address';
import Cart from './models/cart';
import Categories from './models/categories';
import Coupons from './models/Coupons';
import Images from './models/Images';
import Orders from './models/orders';
import Products from './models/products';
import ProductsCategories from './models/ProductsCategories';
import Tranactions from './models/Transactions';
import Users from './models/users';
import Wishlist from './models/wishlist';
export const syncDatabase = () => {
    Ratings.associate();
    Brands.associate();
    Address.associate();
    Cart.associate();
    Categories.associate();
    Coupons.associate();
    Images.associate();
    Orders.associate();
    Products.associate();
    ProductsCategories.associate();
    Tranactions.associate();
    Users.associate();
    Wishlist.associate();
};
export const db = {
    Ratings,
    Brands,
    Address,
    Cart,
    Categories,
    Coupons,
    Images,
    Orders,
    Products,
    ProductsCategories,
    Tranactions,
    Users,
    Wishlist
};
