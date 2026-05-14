import { Pool } from 'pg';
import { User, UserRole } from '../types';
import { hashPassword, comparePassword } from '../utils/password';

interface UserInput {
  email: string;
  full_name: string;
  password: string;
  role?: UserRole;
}

export class UserModel {
  constructor(private pool: Pool) {}

  /**
   * Create a new user
   */
  async create(input: UserInput): Promise<User> {
    const { email, full_name, password, role = 'customer' } = input;

    // Check if user already exists
    const existing = await this.findByEmail(email);
    if (existing) {
      const error = new Error('Email already registered');
      (error as any).status = 409;
      throw error;
    }

    const password_hash = await hashPassword(password);

    const result = await this.pool.query(
      `INSERT INTO users (email, full_name, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name, role, created_at`,
      [email, full_name, password_hash, role]
    );

    return result.rows[0];
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT id, email, full_name, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Verify password
   */
  async verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
    return comparePassword(plainPassword, hash);
  }
}
