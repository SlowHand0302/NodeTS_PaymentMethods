import { Types } from 'mongoose';

export type Product = {
    _id: Types.ObjectId;
    name: string;
    originalPrice: number;
    sellPrice: number;
    variants?: string[];
};
