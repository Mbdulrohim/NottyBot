import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './UserEntity';

export enum WalletProvider {
  TONKEEPER = 'tonkeeper',
  TONHUB = 'tonhub',
  MYTONWALLET = 'mytonwallet',
  MANUAL = 'manual',
  TON = 'TON',
  SOL = 'Solana',
}

@Entity()
export class Wallet {
  @PrimaryColumn()
  wallet_id: string;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @Column()
  provider: WalletProvider;

  @Column({ unique: true })
  wallet_address: string;

  @Column({ type: 'timestamptz', nullable: true })
  connected_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  /** User generated name */
  @Column()
  wallet_name: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column()
  public_key: string;

  @Column()
  encrypted_secret: string;

  @Column({ default: '0' })
  last_balance: string;
}
