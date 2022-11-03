export interface IInternetPlan {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IInternetPlanRequest {
  name: string;
  description: string;
  price: number;
}

export interface IInternetPlanUpdate {
  name?: string;
  description?: string;
  price?: number;
}
