import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @ManyToOne((type) => User, (user) => user.senderMessages)
  @JoinColumn([{ referencedColumnName: 'id' }])
  sender: User;

  @ManyToOne((type) => User, (user) => user.receiverMessages)
  @JoinColumn([{ referencedColumnName: 'id' }])
  receiver: User;
}
