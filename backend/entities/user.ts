import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 50
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  lastName: string;
}
