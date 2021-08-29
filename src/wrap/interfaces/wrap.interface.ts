import { Document } from 'mongoose';

export interface Wrap extends Document {
	status: string;
}
