"use client";
import axios from "axios";
import { type productTypeResponse } from "@/interfaces/product.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

export default function PageProductId({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [product, setProduct] = useState<productTypeResponse>();

  async function getProduct() {
    try {
      axios
        .get(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/product/" + params.id)
        .then((response) => {
          setProduct(response.data);
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
    getProduct();
  }, []);

  const handleRouteProductDeleted = () => {
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

  async function deleteProducts(productId: number) {
    try {
      axios
        .delete(
          process.env.NEXT_PUBLIC_DOMAIN_URL +
            "/api/product/" +
            productId.toString()
        )
        .then((response) => {
          handleRouteProductDeleted();
        })
        .catch((error) => {
          alertErrorProduct(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteProduct = (productId: number) => {
    deleteProducts(productId);
  };

  return (
    <>
      {product != null ? (
        <section className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <div className="flex flex-col w-96 h-2/6 justify-center">
            <div className="p-6 bg-white w-full rounded-t-md text-black">
              <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
              <h4 className="text-4xl font-bold">{product.price}$</h4>
              <p className="text-slate-700">{product.description}</p>
            </div>
            <div className="flex w-full p-3 justify-center space-x-3 bg-gray-900 rounded-b-md items-center">
              <Link
                href={"/product/edit/" + product.id}
                className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white p-1 rounded-md px-2"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  handleDeleteProduct(product.id);
                }}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white p-1 rounded-md px-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
