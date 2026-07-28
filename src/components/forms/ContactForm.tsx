"use client";

import { useState } from "react";
import { DEFAULT_LOCALE, getDictionary, useTranslations } from "@/i18n";

export default function ContactForm() {
  const { t, locale, isReady } = useTranslations();
  const dict = isReady ? t : getDictionary(DEFAULT_LOCALE);
  const { form } = dict;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || form.errorGeneric);
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : form.errorGeneric
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-muted text-sm">
          {form.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={form.namePlaceholder}
          className="field-input"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-muted text-sm">
          {form.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={form.emailPlaceholder}
          className="field-input"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-muted text-sm">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={form.messagePlaceholder}
          rows={5}
          className="field-input field-input-area"
        />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn mt-2">
        {status === "loading" ? form.submitting : form.submit}
      </button>

      {status === "success" && (
        <p className="status-success text-sm mt-2">{form.success}</p>
      )}

      {status === "error" && (
        <p className="status-error text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
}
