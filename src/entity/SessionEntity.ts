import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum SessionStatus {
  CLOSED = 'closed',
  ACTIVE = 'active',
  IDLE = 'idle',
}

enum ConversationState {
  IDLE = 'low',
  AWAITING_WALLET = 'awaiting_wallet',
  AWAITING_TRADE = 'awaiting_trade',
}

@Entity()
class UserSession {
  @PrimaryGeneratedColumn('uuid')
  session_id: string;

  @Column()
  telegram_id: string;

  @Column({ nullable: true })
  conversation_state: ConversationState;

  @Column({ type: 'timestamptz', nullable: true })
  last_interaction: Date;

  @Column({ nullable: true })
  status: SessionStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

export { ConversationState, SessionStatus, UserSession };
