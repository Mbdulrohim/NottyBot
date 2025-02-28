import { AppDataSource } from '../config/dataSource';
import { User } from '../entity';

const userRepository = AppDataSource.getRepository(User);

const findUserByTelegramId = async (
  telegram_id: string
): Promise<User | null> => {
  return userRepository.findOneBy({ telegram_id });
};

const createUser = async (
  telegram_id: string,
  username: string
): Promise<User> => {
  return userRepository.create({ telegram_id, username });
};

const deleteUser = async (telegram_id: string) => {
  return userRepository.softDelete({ telegram_id });
};

export { createUser, deleteUser, findUserByTelegramId };
