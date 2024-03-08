"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { type productTypeResponse } from "@/interfaces/product.type";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ProductList() {
  const [productList, setproductList] = useState<productTypeResponse[]>([]);

  async function getProducts() {
    try {
      axios
        .get("/api/product")
        .then((response) => {
          setproductList(response.data);
        })
        .catch((error) => {
          alertErrorProduct(error);
          return [];
        });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const alertErrorProduct = (error: string) => {
    Swal.fire({
      title: "Producto",
      text: error,
      icon: "error",
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-10 p-5 justify-center">
      {productList &&
        productList.map(({ id, name, description, price }) => (
          <Link
            key={id}
            href={"/product/" + id}
            className="flex flex-col justify-center rounded-md p-5 bg-slate-100 text-black w-72 h-40 overflow-hidden overflow-ellipsis cursor-pointer "
          >
            <h2>Producto: {name}</h2>
            <h3>Descripcion: {description}</h3>
            <p>Precio: {price}</p>
          </Link>
        ))}
    </div>
  );
}
