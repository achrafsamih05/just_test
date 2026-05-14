import { Response } from 'express';
import { Pool } from 'pg';
import { AuthRequest } from '../middleware/auth';
import { UserModel } from '../models/User';
import { generateToken } from '../utils/jwt';
import { isStrongPassword } from '../utils/password';

export class AuthController {
  private userModel: UserModel;

  constructor(private pool: Pool) {
    this.userModel = new UserModel(pool);
  }

  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, full_name, password, password_confirm } = req.body;

      // Validation
      if (!email || !full_name || !password) {
        res.status(400).json({ error: 'Email, full name, and password are required' });
        return;
      }

      if (password !== password_confirm) {
        res.status(400).json({ error: 'Passwords do not match' });
        return;
      }

      if (!isStrongPassword(password)) {
        res.status(400).json({
          error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
        });
        return;
      }

      // Create user (role defaults to 'customer')
      const user = await this.userModel.create({
        email: email.toLowerCase(),
        full_name,
        password,
        role: 'customer', // Always assign customer role on registration
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        },
      });
    } catch (error: any) {
      if (error.status === 409) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Registration failed' });
      }
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  async login(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      // Find user by email
      const user = await this.userModel.findByEmail(email.toLowerCase());
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Verify password
      const isValid = await this.userModel.verifyPassword(password, user.password_hash);
      if (!isValid) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Generate token (with user's role)
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role, // Include role in response
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }

  /**
   * Get current user profile
   * GET /api/auth/profile
   */
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      const user = await this.userModel.findById(req.user.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }
}
