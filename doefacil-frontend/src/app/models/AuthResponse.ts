export interface AuthResponse {
    token: string;
    userId: number;
    name: string;
    role: 'USER' | 'ADMIN';
}