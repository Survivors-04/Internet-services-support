import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Attendance } from "./attendance.entity";
import { Client_plan } from "./client_plan.entity";

@Entity("Client")
export class Client {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({length:14})
  @Exclude()
  cpf: string;

  @Column({length:11})
  telephone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany((type) => Client_plan, (client_plan) => client_plan.client)
  client_plan: Client_plan[];

  @OneToMany((type) => Attendance, (attendance) => attendance.client)
  attendance: Attendance[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
