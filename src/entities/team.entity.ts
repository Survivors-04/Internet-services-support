import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Collaborator } from "./collaborator.entity";
import { Supervisor } from "./supervisor.entity";

@Entity("team")
export class Team {
  @PrimaryColumn("uuid")
  id: string;

  @OneToOne(() => Supervisor, { eager: true })
  @JoinColumn()
  supervisor: Supervisor;

  @OneToMany((type) => Collaborator, (collaborator) => collaborator.team, {
    eager: true,
  })
  collaborator: Collaborator[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
