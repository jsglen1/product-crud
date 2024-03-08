import ProductForm from "@/components/product-form/productForm";
import React from "react";

export default function PageProductEditId({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col items-center p-5">
      <ProductForm paramsId={params.id} />
    </div>
  );
}
