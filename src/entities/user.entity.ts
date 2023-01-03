import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @OneToMany((type) => Message, (message) => message.sender)
  senderMessages: Message[];

  @OneToMany((type) => Message, (message) => message.receiver)
  receiverMessages: Message[];
}
