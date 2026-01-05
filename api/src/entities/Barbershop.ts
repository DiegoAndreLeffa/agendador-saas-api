import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity("barbershops")
export class Barbershop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  // Quem é o dono dessa barbearia?
  @Column()
  owner_id: string;

  @ManyToOne(() => User, (user) => user.barbershops)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  // Uma barbearia tem vários serviços
  @OneToMany(() => Service, (service) => service.barbershop)
  services: Service[];
}