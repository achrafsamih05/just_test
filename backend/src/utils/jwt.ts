import jwt, { SignOptions, Secret } from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}

function getSecret(): Secret {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

/**
 * Generate JWT token.
 *
 * `@types/jsonwebtoken` types `expiresIn` as `number | StringValue` (a string
 * literal union). Casting to `SignOptions['expiresIn']` lets us read the value
 * from an env var without a TypeScript build error.
 */
export const generateToken = (payload: JwtPayload): string => {
  const expiresIn = (process.env.JWT_EXPIRE || '7d') as SignOptions['expiresIn'];
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, getSecret(), options);
};

/**
 * Verify JWT token. Returns the payload, or `null` if the token is invalid.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
  } catch {
    return null;
  }
};

/**
 * Decode token without verification (debug only).
 */
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
