import { Entity, Column, PrimaryColumn,CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./client.entity";
import { Collaborator } from "./collaborator.entity";
import { Services } from "./services.entity";

@Entity("attendance")
export class Attendance {
  @PrimaryColumn("uuid")
  id: string;

  @CreateDateColumn()
  date:Date

  @Column({default:true})
  isActive:boolean

  @OneToOne(() => Services)
  @JoinColumn()
  address: Services;

  @ManyToOne(type=>Client)
  client:Client

  @ManyToOne(type=>Collaborator)
  collaborator:Collaborator


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
