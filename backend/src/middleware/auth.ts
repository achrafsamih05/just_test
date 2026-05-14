import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JwtVerifyPayload, VerifyErrors } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'customer';
  };
}

/**
 * Middleware to verify JWT token and attach user data to request.
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not set');
    res.status(500).json({ error: 'Server misconfiguration' });
    return;
  }

  jwt.verify(
    token,
    secret,
    (err: VerifyErrors | null, decoded: string | JwtVerifyPayload | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
      }
      req.user = {
        id: String(decoded.id),
        email: String(decoded.email),
        role: decoded.role === 'admin' ? 'admin' : 'customer',
      };
      next();
    }
  );
};

/**
 * Middleware to check if user has admin role.
 * Must be used AFTER authenticateToken.
 */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  next();
};

/**
 * Middleware to check if user is owner of resource or is admin.
 */
export const requireOwnerOrAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const resourceUserId = req.params.userId || req.body.userId;

  if (req.user.id !== resourceUserId && req.user.role !== 'admin') {
    res.status(403).json({ error: 'Insufficient permissions' });
    return;
  }

  next();
};
