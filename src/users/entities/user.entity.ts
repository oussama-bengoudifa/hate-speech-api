import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  code: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true, default: null })
  otp: string;
}