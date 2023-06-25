import { Schema, model } from 'mongoose';

import { diseaseInfoModel, IDiseaseInfo } from './diseaseInfo.interface';

const diseaseInfoSchema = new Schema<IDiseaseInfo, diseaseInfoModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const DiseaseInfo = model<IDiseaseInfo, diseaseInfoModel>(
  'DiseaseInfo',
  diseaseInfoSchema
);
