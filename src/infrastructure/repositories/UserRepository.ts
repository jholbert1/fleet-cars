import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import UserModel from "../database/models/UserModel.js";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const createdUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const savedUser = await createdUser.save();
    return new User(
      savedUser.name,
      savedUser.email,
      savedUser.password,
      savedUser._id.toString()
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) {
      return null;
    }
    return new User(
      userDoc.name,
      userDoc.email,
      userDoc.password,
      userDoc._id.toString()
    );
  }
}
