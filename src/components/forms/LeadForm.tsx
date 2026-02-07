"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@heroui/react";
import { leadSchema, LeadInput } from "@/lib/leads/validation";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Thank you! We'll be in touch soon.",
        });
        reset();
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto font-mono">
      <div>
        <Input
          {...register("name")}
          placeholder="Your Name"
          fullWidth
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          disabled={isSubmitting}
          className="font-mono"
        />
      </div>

      <div>
        <Input
          {...register("email")}
          placeholder="Email Address"
          type="email"
          fullWidth
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          disabled={isSubmitting}
          className="font-mono"
        />
      </div>

      <div>
        <Input
          {...register("phone")}
          placeholder="Phone (optional)"
          type="tel"
          fullWidth
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
          disabled={isSubmitting}
          className="font-mono"
        />
      </div>

      <div>
        <Input
          {...register("company")}
          placeholder="Company (optional)"
          fullWidth
          disabled={isSubmitting}
          className="font-mono"
        />
      </div>

      <div>
        <Textarea
          {...register("message")}
          placeholder="Message (optional)"
          fullWidth
          disabled={isSubmitting}
          minRows={4}
          className="font-mono"
        />
      </div>

      {submitMessage && (
        <div
          className={`p-3 rounded-md text-sm font-mono ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        color="primary"
        className="font-mono"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
