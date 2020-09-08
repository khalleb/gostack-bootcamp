import { Router } from "express";
import ensureAutheticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarServices';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  })
  delete user.password;
  return response.json(user);

});

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();
  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  })
  delete user.password;
  return response.json(user);
})

export default usersRouter;
