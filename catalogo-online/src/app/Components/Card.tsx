"use client";
import React from "react";
import { CardProps } from "../types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card({ data }: { data: CardProps }) {
  const router = useRouter();

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={data.imagem} alt="Shoes" width={200} height={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.titulo}</h2>
        <p>{data.descricao}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => router.push(`/Info/${data.id}`)}
            className="btn btn-primary"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
