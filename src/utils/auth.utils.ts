import * as bcrypt from 'bcrypt';

const DEFAULT_PASSWORD_LENGTH = 12;
const PASSWORD_CHARSET =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*()';

export const hashPassword = async (password: string) => {
  // TODO: Export it from Config module and `process.env`
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hash: string = '10',
) => {
  return await bcrypt.compare(password, hash);
};

export const generateRandomHashPassword = async (
  length: number = DEFAULT_PASSWORD_LENGTH,
) => {
  if (length <= 0) {
    throw new Error('Password length must be a positive integer');
  }

  const randomPassword = Array.from({ length })
    .map(
      () =>
        PASSWORD_CHARSET[Math.floor(Math.random() * PASSWORD_CHARSET.length)],
    )
    .join('');

  console.log('Auto-generated password for employee:', randomPassword);

  const hashedPassword = await hashPassword(randomPassword);

  return {
    plain: randomPassword,
    hash: hashedPassword,
  };
};
