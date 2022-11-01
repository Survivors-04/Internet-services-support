import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";
import { Collaborator } from "./collaborator.entity";
import { Internet_plan } from "./internet_plan.entity";

@Entity("client_plan")
export class Client_plan {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne((type) => Client)
  client: Client;

  @ManyToOne((type) => Internet_plan)
  internet_plan: Internet_plan;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
