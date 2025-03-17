import { FormField } from "@/components/ui/form";
import { addSingleProductSchema } from "@/lib/schemas";
import { CloudUpload } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function ImagesUploader({
  form,
}: {
  form: UseFormReturn<z.infer<typeof addSingleProductSchema>>;
}) {
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <div className="w-full h-36 relative border-2 border-dashed rounded transition-colors hover:bg-secondary  grid place-items-center">
          <div className="space-y-2">
            <CloudUpload size={32} className="mx-auto text-primary/70" />
            <p className="text-xs font-medium text-primary/65">
              Drag and drop or click to upload images
            </p>
          </div>

          <input
            type="file"
            className="w-full h-full absolute opacity-0 cursor-pointer"
            multiple
          />
        </div>
      )}
    />
  );
}
