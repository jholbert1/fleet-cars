import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  private hashePassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existingUser = await this.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = this.hashePassword(data.password);
    const user = new User(data.name, data.email, hashedPassword);
    return this.userRepository.create(user);
  }

  async loginUser(email: string, password: string): Promise<{ token: string }> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("Email o contraseña incorrectos");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Email o contraseña incorrectos");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    return { token };
  }
}
