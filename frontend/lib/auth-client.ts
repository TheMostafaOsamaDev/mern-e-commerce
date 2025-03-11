import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/auth";

export const { signUp, signIn, deleteUser, signOut } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
