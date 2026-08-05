export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}
