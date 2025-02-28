import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserEntity';

enum WalletProvider {
  TONKEEPER = 'tonkeeper',
  TONHUB = 'tonhub',
  MYTONWALLET = 'mytonwallet',
  MANUAL = 'manual',
}

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  wallet_id: string;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @Column()
  provider: WalletProvider;

  @Column({ unique: true })
  wallet_address: string;

  @Column('timestamptz')
  connected_at: Date;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column()
  public_key: string;

  @Column()
  encrypted_secret: string;

  @Column({ default: '0' })
  last_balance: string;
}
