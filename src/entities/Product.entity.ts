import { Types } from 'mongoose';

export type Product = {
    _id: Types.ObjectId;
    name: string;
    originalPrice: number;
    sellPrice: number;
    variants?: Variants[];
};

export type Variants = {
    [key: string]: string | string[] | null | undefined;
    attribute: string,
    values: string | string[] | null | undefined,
};