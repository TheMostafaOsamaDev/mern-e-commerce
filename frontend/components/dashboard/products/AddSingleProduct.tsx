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
import {
  addSingleProductDefaultValues,
  addSingleProductSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectCategories from "./SelectCategories";
import ImagesUploader from "./ImagesUploader";
import { toast } from "sonner";

export default function AddSingleProduct() {
  const form = useForm<z.infer<typeof addSingleProductSchema>>({
    resolver: zodResolver(addSingleProductSchema),
    defaultValues: addSingleProductDefaultValues,
  });

  function onSubmit(data: z.infer<typeof addSingleProductSchema>) {
    const images = form.getValues("images");

    console.log("Images");
    console.log(images);

    if (images.length < 3) {
      return toast.info("At least 3 images are required");
    } else if (images.length > 5) {
      return toast.info("At most 5 images are required");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are a single product</DialogTitle>
          <DialogDescription>
            At least 3 images and at max 10 images are required.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={"title"}>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" id="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={"price"}>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 1000"
                        id="price"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={"quantity"}>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Ex: 50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SelectCategories form={form} />

            <ImagesUploader form={form} />

            <Button className="w-full">Add the product</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
