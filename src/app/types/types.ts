export interface JwtPayload {
  userId: any;
  iat?: number;
  exp?: number;
}

export interface SocketUser {
  id: string;
}
