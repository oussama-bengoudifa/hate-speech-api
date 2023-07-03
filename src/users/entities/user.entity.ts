import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  code: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ nullable: true })
  otpCodeExpireDate: Date;

  @Column({ default: 5 })
  optMaxTentative: number;
}
