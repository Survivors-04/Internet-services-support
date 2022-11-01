import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Attendance } from "./attendance.entity";
import { Team } from "./team.entity";

@Entity("collaborator")
export class Collaborator {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 11 })
  telephone: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => Attendance, (attendance) => attendance.collaborator)
  attendance: Attendance[];

  @ManyToOne((type) => Team)
  team: Team;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
