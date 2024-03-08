"use client";
import React, { useEffect, useState } from "react";
import {
  productTypeResponse,
  type productTypeRequest,
} from "@/interfaces/product.type";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Props {
  paramsId?: string;
}

export default function ProductForm({ paramsId }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState<productTypeRequest>({
    name: "",
    description: "",
    price: 0,
  });

  const cleanFormData = () => {
    setFormData({ ...formData, name: "", description: "", price: 0 });
  };

  const handleRoute = () => {
    router.refresh();
    router.push("/");
  };

  const alertErrorProduct = (error: string) => {
    Swal.fire({
      title: "Producto",
      text: error,
      icon: "error",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paramsId != null) {
      axios
        .patch("/api/product/" + paramsId, formData)
        .then((response) => {
          cleanFormData();
          handleRoute();
        })
        .catch((error) => {
          alertErrorProduct(error);
        });
    } else {
      axios
        .post("/api/product", formData)
        .then((response) => {
          cleanFormData();
          handleRoute();
        })
        .catch((error) => {
          alertErrorProduct(error);
        });
    }
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  async function getProduct(paramsId: string) {
    try {
      axios
        .get("/api/product/" + paramsId)
        .then((response) => {
          const data: productTypeResponse = response.data;
          setFormData({
            ...formData,
            price: data.price,
            name: data.name,
            description: data.description,
          });
        })
        .catch((error) => {
          alertErrorProduct(error);
          return null;
        });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    if (paramsId != null) {
      getProduct(paramsId);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-96 mt-12 p-5 space-y-1  bg-gray-900 rounded-md"
    >
      <h1 className="text-center pb-2">
        {paramsId != null ? <p>Editar produto</p> : <p>Crear producto</p>}
      </h1>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="mancuernas"
        className="rounded-md px-2 py-1 text-black"
      />
      <label htmlFor="description">Descripcion</label>
      <textarea
        rows={3}
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="5 kilogramos"
        className="rounded-md px-2 py-1 text-black"
      />
      <label htmlFor="price">Precio</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="99.99"
        className="rounded-md px-2 py-1 text-black"
      />

      <div className="flex items-center justify-center w-full pt-3">
        <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white p-1 rounded-md px-2 w-full">
          {paramsId != null ? <p>Editar</p> : <p>Crear</p>}
        </button>
      </div>
    </form>
  );
}
