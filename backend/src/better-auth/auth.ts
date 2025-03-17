import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  database: global.mySqlPool,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
      pass: {
        type: 'string',
        required: true,
      },
      isAdmin: {
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
});
