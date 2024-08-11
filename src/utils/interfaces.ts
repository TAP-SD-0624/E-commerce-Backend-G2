export interface createNewUserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    DOB: number;
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

// Converts JSON strings to/from your types
export class Convert {
    public static toCustomError(json: string): customErrorInterface {
        return JSON.parse(json);
    }

    public static customErrorToJson(value: customErrorInterface): string {
        return JSON.stringify(value);
    }
}
