import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Content } from "./styles";
import api from "../../services/api";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("@Agendador:token", token);
      localStorage.setItem("@Agendador:user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Falha no login, verifique suas credenciais.");
    }
  }

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </Content>
    </Container>
  );
}
