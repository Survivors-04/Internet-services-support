import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("supervisor")
export class Supervisor {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({length:14})
  @Exclude()
  cpf: string;

  @Column({length:11})
  telephone: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  is_manager: boolean;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
