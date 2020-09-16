import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

export default class SessionsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserServices);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })
    return response.json({ user, token });
  }
}