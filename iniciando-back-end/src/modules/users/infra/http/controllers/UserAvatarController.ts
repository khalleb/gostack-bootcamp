import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';

export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarServices);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    })
    return response.json(user);
  }
}