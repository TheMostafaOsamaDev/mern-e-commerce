import { updateProfile } from "@/actions/auth.actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) redirect("/sign-in");

  return (
    <Card className="w-[450px] mx-auto">
      <CardHeader>
        <CardTitle>Update your profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={updateProfile}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={user.email}
              placeholder="Email"
              disabled
              name="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              defaultValue={user.firstName}
              placeholder="First Name"
              name="firstName"
              id="firstName"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              defaultValue={user.lastName}
              placeholder="Last Name"
              name="lastName"
              id="lastName"
            />
          </div>

          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
