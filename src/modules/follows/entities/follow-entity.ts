import { Schema, Document, Model } from "mongoose";
import { cinepickConnection } from "../../../database/database";

export interface IFollow extends Document {
  follower_id: string;
  followee_id: string;
  created_at: Date;
}

const FollowSchema = new Schema<IFollow>({
  follower_id: { type: String, required: true },
  followee_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

FollowSchema.index({ follower_id: 1, followee_id: 1 }, { unique: true });

export const Follow: Model<IFollow> = cinepickConnection.model<IFollow>("Follow", FollowSchema);
