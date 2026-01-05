import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("timestamp with time zone") // Importante: Com fuso horário!
  start_date: Date;

  @Column("timestamp with time zone") // Importante: Com fuso horário!
  end_date: Date;

  // Status do agendamento
  @Column({ default: 'PENDING' })
  status: string; // PENDING, CONFIRMED, CANCELED

  // Quem é o cliente?
  @Column()
  client_id: string;

  @ManyToOne(() => User, (user) => user.clientAppointments)
  @JoinColumn({ name: "client_id" })
  client: User;

  // Quem vai atender? (Provider)
  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Não mapeei o inverso no User pra não poluir, mas poderia.
  @JoinColumn({ name: "provider_id" })
  provider: User;

  // Qual serviço?
  @Column()
  service_id: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "service_id" })
  service: Service;

  @CreateDateColumn()
  created_at: Date;
}