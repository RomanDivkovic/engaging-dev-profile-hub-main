import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "./Contact";
import "@testing-library/jest-dom";
import { Toaster } from "@/components/ui/toaster";

global.scrollTo = jest.fn();

// Mock emailjs
jest.mock("@emailjs/browser", () => ({
  send: jest.fn(() => Promise.resolve()),
}));
// Mock config import
jest.mock("../emailjs.config", () => ({
  SERVICE_ID: "test_service",
  TEMPLATE_ID: "test_template",
  PUBLIC_KEY: "test_key",
}));

describe("Contact form", () => {
  it("renders the contact form", () => {
    render(
      <>
        <Toaster />
        <Contact />
      </>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    render(
      <>
        <Toaster />
        <Contact />
      </>
    );
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Use findByText now that Toaster is rendered
    expect(
      await screen.findByText(/message sent successfully/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <>
        <Toaster />
        <Contact />
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(
      await screen.findAllByText(/must be at least|enter a valid email/i)
    ).not.toHaveLength(0);
  });

  it("shows error toast on send failure", async () => {
    const emailjs = jest.requireMock("@emailjs/browser");
    emailjs.send.mockImplementationOnce(() =>
      Promise.reject(new Error("fail"))
    );
    render(
      <>
        <Toaster />
        <Contact />
      </>
    );
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(
      await screen.findByText(/could not send your message/i)
    ).toBeInTheDocument();
  });

  it("disables the button while submitting", async () => {
    let resolvePromise;
    const emailjs = jest.requireMock("@emailjs/browser");
    emailjs.send.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );
    render(
      <>
        <Toaster />
        <Contact />
      </>
    );
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(
      await screen.findByRole("button", { name: /sending/i })
    ).toBeDisabled();
    resolvePromise();
  });
});
