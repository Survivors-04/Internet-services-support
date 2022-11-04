import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Attendance } from "./attendance.entity";
import { Client_plan } from "./client_plan.entity";
import { Internet_plan } from "./internet_plan.entity";

@Entity("Client")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 14 })
  cpf: string;

  @Column()
  telephone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany((type) => Client_plan, (client_plan) => client_plan.client, {
    eager: true,
  })
  client_plan: Client_plan[];

  @OneToMany((type) => Attendance, (attendance) => attendance.client)
  attendance: Attendance[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
