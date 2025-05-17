import { StripePaymentIntent } from '../entities/Stripe.entity';
import { Types } from 'mongoose';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRETKEY as string);

export const getPublicKey = () => {
    return process.env.STRIPE_PUBLICKEY;
};

export const createPaymentIntent = (intent: StripePaymentIntent) => {
    
};
