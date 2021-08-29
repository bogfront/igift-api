import { Document } from 'mongoose';

export interface Receiver extends Document {
	name: string;
	phone: string;
	city: string;
	address: string;
	ownerId: string;
	available: boolean;
}
