import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export enum SplitType {
  EQUAL = 'equal',
  EXACT = 'exact',
  PERCENTAGE = 'percentage',
}

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalAmount: number;

  @Column({ type: 'enum', enum: SplitType })
  splitType: SplitType;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @Column('json')
  splits: { [key: number]: number }; // Maps userId to amount owed
}
