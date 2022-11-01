import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client_plan } from "./client_plan.entity";

@Entity("Internet_plan")
export class Internet_plan {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal" })
  price: number;

  @OneToMany((type) => Client_plan, (client_plan) => client_plan.internet_plan)
  client_plan: Client_plan[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
