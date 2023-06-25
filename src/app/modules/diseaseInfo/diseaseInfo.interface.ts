import { Model } from 'mongoose';

export type IDiseaseInfo = {
  title: string;
  description: string;
};

export type diseaseInfoModel = Model<IDiseaseInfo, Record<string, unknown>>;

export type IDiseaseInfoFilters = {
  searchTerm?: string;
};
