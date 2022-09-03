import { InternalServerErrorException } from '@nestjs/common';

class UserAlreadyExistsException extends InternalServerErrorException {
  constructor(userName: string) {
    super(`Email ${userName} is already in use.`);
  }
}

export default UserAlreadyExistsException;
