"use client";

import { createUser, type State } from "@/lib/actions/patient.action";
import { HeartIcon } from "lucide-react";
import SubmitButton from "@/lib/submit-button";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function PatientForm() {
    const router = useRouter()
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(createUser, initalState);

  useEffect(() => {
    if (state?.status === "success" && state.redirectUrl) {
        router.push(state.redirectUrl);
    } else if (state?.status === "error") {
      console.log(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <HeartIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            Welcome To Medicaps
          </CardTitle>
          <CardDescription className="text-center">
            Get started with appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  minLength={2}
                  maxLength={50}
                  placeholder="John Doe"
                />

                {state?.errors?.["name"]?.[0] && (
                  <p className="text-destructive">
                    {state?.errors?.["name"]?.[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  minLength={2}
                  maxLength={50}
                  placeholder="johndoe@gmail.com"
                />

                {state?.errors?.["email"]?.[0] && (
                  <p className="text-destructive">
                    {state?.errors?.["email"]?.[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                />

                {state?.errors?.["phone"]?.[0] && (
                  <p className="text-destructive">
                    {state?.errors?.["phone"]?.[0]}
                  </p>
                )}
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <SubmitButton text="Get Started" />
        </CardFooter>
      </Card>
    </div>
    </form>

  );
}
