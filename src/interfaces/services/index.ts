export interface IService {
  id: string;
  name: string;
  description: string;
}

export interface IUpdateService {
  id?: string;
  name?: string;
  description?: string;
}

export interface IServiceRequest {
  name: string;
  description: string;
}
