import AppError from '@shared/errors/AppError';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarServices from './UpdateUserAvatarServices';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new avatar user', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new DiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarServices(
      fakeusersRepository,
      fakeStorageProvider,
    );

    const user = await fakeusersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing avatar', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new DiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarServices(
      fakeusersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-exsiting-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeusersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new DiskStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarServices(
      fakeusersRepository,
      fakeStorageProvider,
    );

    const user = await fakeusersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
