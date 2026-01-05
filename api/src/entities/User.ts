import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";
import { Barbershop } from "./Barbershop";


export enum UserRole {
  CLIENT = "CLIENT",
  PROVIDER = "PROVIDER", // Barbeiro/Profissional
  OWNER = "OWNER"        // Dono da barbearia (pode ser provider tbm)
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true }) // E-mails não podem repetir
  email: string;

  @Column()
  password_hash: string; // Nunca salve a senha crua!

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CLIENT
  })
  role: UserRole;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  clientAppointments: Appointment[];

  @OneToMany(() => Barbershop, (barbershop) => barbershop.owner)
  barbershops: Barbershop[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}