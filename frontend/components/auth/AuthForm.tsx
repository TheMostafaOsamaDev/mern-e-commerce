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
import { deleteUser, signIn, signOut, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { betterAuthGlobalErrorHandler } from "@/utils/error-handler";
import * as bcrypt from "bcryptjs";
import { axiosBase } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import AdminOTP from "./AdminOTP";

export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const isSignUp = type === "sign-up";
  const schema = isSignUp ? signUpSchema : signInSchema;
  const defaultValues = isSignUp ? signUpDefaultValues : signInDefaultValues;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsSubmitting(true);

    try {
      if (isSignUp && data.firstName && data.lastName) {
        const otpValue = otpRef.current?.value;
        if (data.isAdmin && otpValue) {
          try {
            const res = await axiosBase.post("/auth/check-otp", {
              otp: otpValue,
            });

            if (!res.data) {
              throw new Error();
            }
          } catch (error) {
            setIsSubmitting(false);
            return toast.error("Invalid OTP");
          }
        } else if (data.isAdmin && !otpValue) {
          setIsSubmitting(false);
          return toast.error("Please enter the OTP");
        }

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
          // @ts-ignore
          isAdmin: data.isAdmin,
          pass: hashedPassword,
          name: `${data.firstName} ${data.lastName}`,
          fetchOptions: {
            onSuccess: async () => {
              toast.success("Account created successfully!");
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
            onSuccess: async () => {
              toast.success("Signed in successfully!");
            },
            onError: betterAuthGlobalErrorHandler,
          },
          callbackURL: "/",
        });
      }
    } catch (error) {
      toast.error("Sorry an error occurred, please try again later");
    } finally {
      setIsSubmitting(false);
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
