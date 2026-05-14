import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

/**
 * Centralized error handling middleware
 * Should be added LAST in middleware chain
 */
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  const code = err.code || 'INTERNAL_ERROR';

  // Log error details
  console.error(`[${status}] ${code}: ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  // Handle different error types
  if (status === 404) {
    res.status(404).json({
      error: 'Not found',
      code: 'NOT_FOUND',
      message: 'The requested resource does not exist',
    });
    return;
  }

  if (status === 401) {
    res.status(401).json({
      error: 'Unauthorized',
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
    return;
  }

  if (status === 403) {
    res.status(403).json({
      error: 'Forbidden',
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    });
    return;
  }

  if (status === 409) {
    res.status(409).json({
      error: 'Conflict',
      code: 'CONFLICT',
      message: message || 'Resource already exists',
    });
    return;
  }

  if (status >= 400 && status < 500) {
    res.status(status).json({
      error: message,
      code: code,
    });
    return;
  }

  // Default 500 error
  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? message : 'An unexpected error occurred',
  });
};

/**
 * 404 handler for undefined routes
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    code: 'NOT_FOUND',
    message: `${req.method} ${req.path} not found`,
  });
};
