import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @ManyToOne((type) => User, (user) => user.senderMessages)
  @JoinColumn([{ referencedColumnName: 'id' }])
  sender: User;

  @ManyToOne((type) => User, (user) => user.receiverMessages)
  @JoinColumn([{ referencedColumnName: 'id' }])
  receiver: User;
}
