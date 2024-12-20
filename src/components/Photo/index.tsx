"use client";

import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import fetcher from "../../lib/fetcher";
import { JSONResponse } from "../../app/api/types";
import { PhotoProps } from "./types";


export default function Photo({ id }: PhotoProps) {
  const router = useRouter();
  const { data: photos, error: photosError, isLoading: photoLoading } = useSWR<
    { data: string[] },
    JSONResponse
  >(() => (`/api/users/${ id }/photos`), fetcher, {
    refreshInterval: process.env.API_REFRESH_INTERVAL
  });

  if (photosError) return <div>{ photosError.message }</div>;
  if (photoLoading) return <div>Loading...</div>;
  if (!photos) return null;

  return (
    <div
      className="relative w-72 h-72 cursor-pointer"
      onClick={() => router.push(`/users/${id}/photos`)}
    >
      <Image
        src={`/images/albums/${ id }/${ photos?.data[0] }`}
        alt=""
        className="rounded p-1 border"
        fill
      />
    </div>
  )
}