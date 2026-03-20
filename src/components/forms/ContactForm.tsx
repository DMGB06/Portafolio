"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error al enviar el mensaje"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      {/* Campo Nombre */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-muted text-sm">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className="p-3 border-2 rounded-sm bg-transparent text-foreground"
          style={{ borderColor: "rgb(var(--muted))" }}
        />
      </div>

      {/* Campo Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-muted text-sm">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className="p-3 border-2 rounded-sm bg-transparent text-foreground"
          style={{ borderColor: "rgb(var(--muted))" }}
        />
      </div>

      {/* Campo Mensaje */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-muted text-sm">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tu mensaje..."
          rows={5}
          className="p-3 border-2 rounded-sm bg-transparent text-foreground resize-none"
          style={{ borderColor: "rgb(var(--muted))" }}
        />
      </div>

      {/* Botón Enviar */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn mt-2"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {/* Mensaje de éxito */}
      {status === "success" && (
        <p className="text-green-500 text-sm mt-2">
          ¡Mensaje enviado correctamente!
        </p>
      )}

      {/* Mensaje de error */}
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
}
