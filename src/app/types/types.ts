// small shared types
export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface SocketUser {
  id: string;
}
