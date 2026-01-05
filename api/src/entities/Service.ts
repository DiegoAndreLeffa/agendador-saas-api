import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Barbershop } from "./Barbershop";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Ex: "Corte na Tesoura"

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  duration: number; // Duração em MINUTOS (Ex: 30, 45, 60)

  @Column()
  barbershop_id: string;

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.services)
  @JoinColumn({ name: "barbershop_id" })
  barbershop: Barbershop;
}