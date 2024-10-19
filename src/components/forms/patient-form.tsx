"use client";

import { createUser, type State } from "@/lib/actions/patient.action";
import SubmitButton from "@/lib/submit-button";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { useEffect } from "react";

export default function PatientForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(createUser, initalState);

  useEffect(() => {
    if (state?.status === "success") {
      console.log(state.message);
    } else if (state?.status === "error") {
      console.log(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there 👋</h1>
        <p className="text-dark-700">Get started with appointments.</p>

        <Input
          id="name"
          type="text"
          name="name"
          minLength={2}
          maxLength={50}
          placeholder="John Doe"
        />

        {state?.errors?.["name"]?.[0] && (
          <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
        )}

        <Input
          id="email"
          type="email"
          name="email"
          minLength={2}
          maxLength={50}
          placeholder="johndoe@gmail.com"
        />

        {state?.errors?.["email"]?.[0] && (
          <p className="text-destructive">{state?.errors?.["email"]?.[0]}</p>
        )}

        <Input
          id="phone"
          type="text"
          name="phone"
          minLength={2}
          maxLength={50}
          placeholder="John Doe"
        />

        {state?.errors?.["phone"]?.[0] && (
          <p className="text-destructive">{state?.errors?.["phone"]?.[0]}</p>
        )}

        <SubmitButton text="Get Started" />
      </section>
    </form>
  );
}
