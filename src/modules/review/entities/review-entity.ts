import { Schema, Document, Model } from "mongoose";
import { cinepickConnection } from "../../../database/database";

export interface IReview extends Document {
  user_uid: string;
  movie_id: string;
  comment: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

const ReviewSchema = new Schema<IReview>({
  user_uid: { type: String, required: true },
  movie_id: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ReviewSchema.index({ user_uid: 1, movie_id: 1 }, { unique: true });

export const Review: Model<IReview> = cinepickConnection.model<IReview>("Review", ReviewSchema);
