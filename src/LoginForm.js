import React, { useState, useEffect } from "react";
import { MantineProvider, TextInput, PasswordInput, Button, Container, Card, Title } from "@mantine/core";
import axios from "axios";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:1337/admin/login", {
        email: identifier,
        password: password,
      });
      localStorage.setItem("token_login" , response.data.data.token);
      alert("Login Successful! Token: " + response.data.data.token);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title align="center" order={2} mb={20}>Strapi User Login</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextInput
          label="Email or Username"
          placeholder="Enter your email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
          Login
        </Button>
      </Card>
    </Container>
  );
};


