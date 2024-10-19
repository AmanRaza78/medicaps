"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({text}:{text:string}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>Please Wait....</Button>
      ) : (
        <Button type="submit" className="w-full">{text}</Button>
      )}
    </>
  );
}