export const getProductImageUrl = (image: string) => {
  return `${process.env.NEXT_PUBLIC_API_STATIC_URL}/uploads/products/${image}`;
};
