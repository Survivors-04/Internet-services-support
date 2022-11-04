export interface IService {
  id: string;
  name: string;
  description: string;
}

export interface IUpdateService {
  name?: string;
  description?: string;
}

export interface IServiceRequest {
  name: string;
  description: string;
}
