import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' }) // <-- Declarando o tipo explicitamente
  name: string;

  @Column({ type: 'varchar', unique: true }) // <-- Declarando aqui também
  email: string;

  @Column({ type: 'varchar' }) // <-- E aqui
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}