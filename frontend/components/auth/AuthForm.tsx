"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  signInDefaultValues,
  signInSchema,
  signUpDefaultValues,
  signUpSchema,
} from "@/lib/schemas";
import { Loader2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import AdminOTP from "./AdminOTP";
import { useMutation } from "@tanstack/react-query";
import {
  signInMutationFn,
  signUpMutationFn,
} from "@/lib/api/tanstack/auth.functions";
import { signal } from "@/lib/api";
import { tanstackGlobalErrorHandler } from "@/utils/error-handler";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const isSignUp = type === "sign-up";
  const schema = isSignUp ? signUpSchema : signInSchema;
  const defaultValues = isSignUp ? signUpDefaultValues : signInDefaultValues;
  const otpRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  // Mutation
  const signUpMutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUpMutationFn,
    onSuccess: () => {
      toast.success("Sign up successful!");
      router.push("/sign-in");
    },
    onError: tanstackGlobalErrorHandler,
  });
  const signInMutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInMutationFn,
    onSuccess: () => {
      toast.success("Sign in successful!");
      window.location.reload();
    },
    onError: tanstackGlobalErrorHandler,
  });
  const isSubmitting = signInMutation.isPending || signUpMutation.isPending;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      if (isSignUp && data.firstName && data.lastName) {
        const signUpData: SignUpType = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          isAdmin: data.isAdmin,
          otp: data.isAdmin ? otpRef.current?.value || "" : "",
        };
        signUpMutation.mutate({ data: signUpData, signal });
      } else {
        const signInData: SignInType = {
          email: data.email,
          password: data.password,
        };
        signInMutation.mutate({ data: signInData, signal });
      }
    } catch (error) {
      toast.error("Sorry an error occurred, please try again later");
    }
  }
  return (
    <Card className="w-[450px] mx-auto">
      <CardHeader>
        <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription>
          {isSignUp
            ? "Become a memebr of us and start shooping!"
            : "Welcome back to Shoop!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            {isSignUp && (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSignUp && (
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <div className="p-3 border rounded-md space-y-3">
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Checkbox
                          id="isAdmin"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel>Are an admin?</FormLabel>
                      <FormMessage />
                    </FormItem>

                    {field.value && <AdminOTP otpRef={otpRef} />}
                  </div>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
