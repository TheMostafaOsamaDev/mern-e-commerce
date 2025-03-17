import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectValue,
  Select,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { ProductCategories, SubProductCategories } from "@/lib/product-types";
import { addSingleProductSchema } from "@/lib/schemas";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function SelectCategories({
  form,
}: {
  form: UseFormReturn<z.infer<typeof addSingleProductSchema>>;
}) {
  const categories = useMemo(() => Object.values(ProductCategories), []);
  const subCategories = useMemo(() => Object.values(SubProductCategories), []);

  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem value={category} key={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sub Category" className="w-full" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subCategories.map((category) => (
                  <SelectItem value={category} key={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </>
  );
}
