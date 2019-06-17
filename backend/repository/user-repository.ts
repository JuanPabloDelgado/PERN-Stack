import { getManager, UpdateResult, DeleteResult } from "typeorm";
import { User } from "../entities/user";

export class UserRepository {
  createUser(user: User): Promise<User> {
    return getManager()
      .getRepository(User)
      .save(user);
  }

  getUsers(): Promise<User[]> {
    return getManager()
      .getRepository(User)
      .createQueryBuilder("User")
      .select(["User.id", "User.name", "User.lastName"])
      .getMany();
  }

  getUser(idUser: number): Promise<User> {
    return getManager()
      .getRepository(User)
      .findOne({
        where: {
          id: idUser
        }
      });
  }

  updateUser(idUser: string, newUserData: User): Promise<UpdateResult> {
    return getManager()
      .getRepository(User)
      .update(
        {
          id: idUser
        },
        newUserData
      );
  }

  deleteUser(idUser: string): Promise<DeleteResult> {
    return getManager()
      .getRepository(User)
      .delete({
        id: idUser
      });
  }
}
