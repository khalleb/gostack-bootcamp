import path from 'path';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import fs from 'fs';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarServices {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = filename;
    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateUserAvatarServices;