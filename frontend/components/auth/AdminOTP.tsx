import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RefObject } from "react";

export default function AdminOTP({
  otpRef,
}: {
  otpRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <InputOTP maxLength={6} ref={otpRef}>
      <InputOTPGroup className="grid grid-cols-3 w-full">
        <InputOTPSlot index={0} className="w-full h-[45px] text-xl" />
        <InputOTPSlot index={1} className="w-full h-[45px] text-xl" />
        <InputOTPSlot index={2} className="w-full h-[45px] text-xl" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup className="grid grid-cols-3 w-full">
        <InputOTPSlot index={3} className="w-full h-[45px] text-xl" />
        <InputOTPSlot index={4} className="w-full h-[45px] text-xl" />
        <InputOTPSlot index={5} className="w-full h-[45px] text-xl" />
      </InputOTPGroup>
    </InputOTP>
  );
}
