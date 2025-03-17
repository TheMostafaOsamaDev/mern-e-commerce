import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormMessage } from "@/components/ui/form";
import { axiosBase } from "@/lib/api";
import { addSingleProductSchema } from "@/lib/schemas";
import { getProductImageUrl } from "@/utils";
import { CloudUpload, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ImagesUploader({
  form,
}: {
  form: UseFormReturn<z.infer<typeof addSingleProductSchema>>;
}) {
  const [images, setImages] = useState<string[]>(form.getValues("images"));
  const [isPending, setIsPending] = useState(false);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsPending(true);

    try {
      const files = event.target.files;
      if (files) {
        if (files.length + form.getValues("images").length > 5) {
          toast.error("You can only upload up to 5 images");
          return;
        }

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        const res = await axiosBase.post("/uploader/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data: { name: string }[] = res.data;

        form.setValue("images", [
          ...form.getValues("images"),
          ...data.map((image) => image.name),
        ]);

        setImages([...images, ...data.map((image) => image.name)]);
      } else {
        toast.info("No files selected");
      }
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <div className="w-full h-24 relative border-2 border-dashed rounded transition-colors hover:bg-secondary  grid place-items-center">
            {isPending ? (
              <Loader2
                size={26}
                className=" animate-spin mx-auto text-primary/70"
              />
            ) : (
              <div className="space-y-2">
                <CloudUpload size={26} className="mx-auto text-primary/70" />
                {images.length >= 5 ? (
                  <p className="text-xs font-medium text-primary/65">
                    You reached the maximum limit of 5 images
                  </p>
                ) : (
                  <p className="text-xs font-medium text-primary/65">
                    Drag and drop or click to upload images
                  </p>
                )}
              </div>
            )}

            <FormControl>
              <input
                type="file"
                className="w-full h-full absolute opacity-0 cursor-pointer"
                multiple
                accept="image/png, image/jpeg"
                name={field.name}
                onBlur={field.onBlur}
                onChange={onFileChange}
                disabled={images.length >= 5 || isPending}
              />
            </FormControl>

            <FormMessage />
          </div>
        )}
      />

      {/* Image Preview Section */}
      {form.getValues("images").length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Button
                variant={"destructive"}
                size={"icon"}
                className="rounded-full absolute -top-1 -right-1 size-6 cursor-pointer"
                onClick={() => {
                  const newImages = [...images];
                  newImages.splice(index, 1);
                  setImages(newImages);
                  form.setValue("images", newImages);
                }}
              >
                <X size={20} />
              </Button>

              <img
                src={getProductImageUrl(image)}
                alt={`Preview ${index + 1}`}
                className="size-14 object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
