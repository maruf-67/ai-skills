export interface Feature {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
  // Domain specific fields
  createdBy?: any;
}

export interface CreateFeatureInput {
  name: string;
  description: string;
  status?: 'active' | 'inactive';
  // Other domain fields
}

export interface UpdateFeatureInput extends Partial<CreateFeatureInput> {}
