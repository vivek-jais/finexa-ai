import mongoose, { Schema } from "mongoose";

export enum ReportStatusEnum {
  SENT = "SENT",
  PENDING = "PENDING",
  FAILED = "FAILED",
  NO_ACTIVITY = "NO_ACTIVITY"
}

export interface ReportDocument extends Document {
  userId: mongoose.Types.ObjectId;
  period: string;
  sentDate: Date;
  status: keyof typeof ReportStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<ReportDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  period: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    enum:Object.values(ReportStatusEnum),
    default:ReportStatusEnum.PENDING
  },

});

const ReportModel =  mongoose.model<ReportDocument>("Report",reportSchema);

export default ReportModel;
