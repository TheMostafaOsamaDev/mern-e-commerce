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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectCategories from "./SelectCategories";
import ImagesUploader from "./ImagesUploader";

export default function AddSingleProduct() {
  const form = useForm<z.infer<typeof addSingleProductSchema>>({
    resolver: zodResolver(addSingleProductSchema),
    defaultValues: addSingleProductDefaultValues,
  });

  function onSubmit(data: z.infer<typeof addSingleProductSchema>) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="w-4xl">
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
                    <FormLabel htmlFor={"price"}>Title</FormLabel>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={"title"}>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product title"
                        id="title"
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
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
