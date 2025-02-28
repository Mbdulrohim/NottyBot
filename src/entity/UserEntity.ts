import {
  Column,
  Entity,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from './WalletEntity';
import { ReferralInfo } from './ReferralEntity';

enum RiskLevelSetting {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  risk_level: RiskLevelSetting;

  @Column()
  alerts_enabled: boolean;

  @Column()
  default_slip_page: number;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ unique: true })
  telegram_id: string;

  @Column({ length: 145 })
  username?: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];

  @Column()
  active_session: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings: UserSettings;

  @OneToOne(() => ReferralInfo)
  @JoinColumn()
  referral: ReferralInfo;
}
