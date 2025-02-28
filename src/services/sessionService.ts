import { AppDataSource } from '../config/dataSource';
import { ConversationState, SessionStatus, UserSession } from '../entity';

const sessionRepository = AppDataSource.getRepository(UserSession);

const createSession = async (telegram_id: string): Promise<UserSession> => {
  return sessionRepository.create({
    telegram_id,
    conversation_state: ConversationState.IDLE,
    status: SessionStatus.IDLE,
  });
};

const findLastSession = (telegram_id: string) => {
  return sessionRepository.findOne({
    where: { telegram_id, status: SessionStatus.IDLE },
    order: { created_at: 'DESC' },
  });
};

export { createSession, findLastSession };
