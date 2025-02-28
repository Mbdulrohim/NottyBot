import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReferralInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  referred_count: number;

  @Column()
  earned_tokens: number;
}
