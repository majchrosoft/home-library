import { AuthenticateSuccess } from '../auth-actions';
import { User } from '../../user-model';
import { userDataStorageService } from '../../user-data-storage-service';

export const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date((new Date()).getTime() + expiresIn * 1000);
  const user = new User(
    email,
    userId,
    token,
    expirationDate
  );

  userDataStorageService.setUser(user);

  return new AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
}
