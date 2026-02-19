"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11),
  subject: z.string().min(5),
  message: z.string().min(5),
});

interface ContactFormProps {
  dict: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    success: string;
    error: string;
  };
}

export function ContactForm({ dict }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name + Phone side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.namePlaceholder}
                    {...field}
                    className="bg-white border-gray-100 h-14 rounded-2xl px-6 shadow-sm focus:border-[#0FA5A1] focus:ring-[#0FA5A1]/20 transition-all font-medium text-gray-600 placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#12323A] font-medium ml-1 mb-2 block">
                  {dict.phoneLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={dict.phonePlaceholder}
                    {...field}
                    className="bg-white border-gray-100 h-14 rounded-2xl px-6 shadow-sm focus:border-[#0FA5A1] focus:ring-[#0FA5A1]/20 transition-all font-medium text-gray-600 placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#12323A] font-medium ml-1 mb-2 block">
                {dict.subjectLabel}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dict.subjectPlaceholder}
                  {...field}
                  className="bg-white border-gray-100 h-14 rounded-2xl px-6 shadow-sm focus:border-[#0FA5A1] focus:ring-[#0FA5A1]/20 transition-all font-medium text-gray-600 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#12323A] font-medium ml-1 mb-2 block">
                {dict.messageLabel}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={dict.messagePlaceholder}
                  className="min-h-[200px] bg-white border-gray-100 rounded-3xl p-6 shadow-sm focus:border-[#0FA5A1] focus:ring-[#0FA5A1]/20 transition-all font-medium text-gray-600 placeholder:text-gray-400 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-14 bg-[#0FA5A1] hover:bg-[#0c8a87] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : dict.send}
        </Button>
        {submitStatus === "success" && (
          <p className="text-green-600 text-sm mt-2">{dict.success}</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-sm mt-2">{dict.error}</p>
        )}
      </form>
    </Form>
  );
}
