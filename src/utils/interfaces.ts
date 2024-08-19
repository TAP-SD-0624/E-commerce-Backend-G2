export interface createNewUserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    DOB: Date;
    imageUrl: string;
    role: string;
}

export interface customErrorInterface {
    field: Field;
    message: string;
}

export interface Field {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

export interface Card {
    cardNumber: string;
    cardHolder: string;
    expiration: string;
    ccv: number;
    amount: number;
}

export interface NewAddress {
    fullName: string;
    mobile: string;
    street: string;
    city: string;
    state: string;
    zipcode: number;
    userId: number;
}

export interface CheckoutData {
    userId: number;
    cartId: number;
    newAddressData?: NewAddress;
    paymentData: Card;
}

export interface CartUser {
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    phone: string;
    imageUrl: string;
    email: string;
}

export interface newOrder {
    userId: number;
    productId: number;
    transactionId: number;
    addressId:number,
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCustomError(json: string): customErrorInterface {
        return JSON.parse(json);
    }

    public static customErrorToJson(value: customErrorInterface): string {
        return JSON.stringify(value);
    }
}
