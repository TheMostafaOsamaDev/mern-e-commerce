"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  signInDefaultValues,
  signInSchema,
  signUpDefaultValues,
  signUpSchema,
} from "@/lib/schemas";
import { Loader2, LogIn, UserPlus } from "lucide-react";
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
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { betterAuthGlobalErrorHandler } from "@/utils/error-handler";
import * as bcrypt from "bcryptjs";

export default function AuthDialog({ type }: { type: "sign-in" | "sign-up" }) {
  const isSignUp = type === "sign-up";
  const schema = isSignUp ? signUpSchema : signInSchema;
  const defaultValues = isSignUp ? signUpDefaultValues : signInDefaultValues;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsSubmitting(true);

    if (isSignUp && data.firstName && data.lastName) {
      let hashedPassword = "";
      try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(data.password, salt);
      } catch (error) {
        return toast.error("Sorry an error occurred, please try again later");
      }

      await signUp.email({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        pass: hashedPassword,
        name: `${data.firstName} ${data.lastName}`,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully!");
            setIsOpen(false);
          },
          onError: betterAuthGlobalErrorHandler,
        },
        callbackURL: "/",
      });
    } else {
      await signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully!");
            setIsOpen(false);
          },
          onError: betterAuthGlobalErrorHandler,
        },
        callbackURL: "/",
      });
    }

    setIsSubmitting(false);
  }
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant={isSignUp ? "default" : "outline"}>
          {isSignUp ? (
            <>
              <UserPlus /> Sign up
            </>
          ) : (
            <>
              <LogIn /> Sign in{" "}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {isSignUp ? "Sign up" : "Sign in"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {isSignUp
                ? "Sign up to start shooping!"
                : "Welcome back, Let's start shooping!"}
            </DialogDescription>
          </DialogHeader>
        </div>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>
        </FormProvider>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Login with Google</Button>
      </DialogContent>
    </Dialog>
  );
}
