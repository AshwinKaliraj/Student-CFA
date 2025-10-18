export interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  age: number;
  designation: string;
  department: string;
  phoneNumber: string;
  address: string;
  imageUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  age: number;
  designation: string;
  department: string;
  phoneNumber: string;
  address: string;
  imageUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
