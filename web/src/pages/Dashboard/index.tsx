import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Calendar,
  Schedule,
  Section,
  Appointment,
} from "./styles";
import api from "../../services/api";

interface AppointmentData {
  id: string;
  start_date: string;
  client: {
    name: string;
    // avatar_url: string; // Futuramente
  };
}

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Carrega os agendamentos sempre que a data mudar
  useEffect(() => {
    // Pegar o token salvo
    const token = localStorage.getItem("@Agendador:token");

    // Se não tiver token, deveria redirecionar pro login (vamos ignorar por enquanto)
    if (!token) return;

    if (!selectedDate) return;

    api
      .get("/appointments", {
        params: {
          date: format(selectedDate, "yyyy-MM-dd"), // Envia no formato que o backend espera
        },
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token
        },
      })
      .then((response) => {
        setAppointments(response.data);
      });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <h1>Bem-vindo, Barbeiro</h1>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Sair
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Calendar>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
          />
        </Calendar>

        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {selectedDate && (
              <span>
                {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
            )}
            <span>Dia da semana</span>
          </p>

          <Section>
            <strong>Manhã / Tarde</strong>

            {appointments.length === 0 && <p>Nenhum agendamento neste dia.</p>}

            {appointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>{format(new Date(appointment.start_date), "HH:mm")}</span>

                <div>
                  <img
                    src="https://avatars.githubusercontent.com/u/100?v=4" // Placeholder
                    alt={appointment.client.name}
                  />
                  <strong>{appointment.client.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
}
