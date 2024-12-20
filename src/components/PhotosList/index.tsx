"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import fetcher from "../../lib/fetcher";
import { JSONResponse } from "../../app/api/types";
import { PhotosListProps } from "./types";



export default function PhotosList({ id }: PhotosListProps) {
  const { data: photos, error: photosError, isLoading: photoLoading } = useSWR<
    { data: string[] },
    JSONResponse
  >(() => (`/api/users/${ id }/photos`), fetcher, {
    refreshInterval: process.env.API_REFRESH_INTERVAL
  });

  if (photosError) return <div>{ photosError.message }</div>;
  if (photoLoading) return <div>Loading...</div>;

  return (<>
    {photos?.data.map((photo: string) => (
      <div
        key={ photo }
        className="relative w-72 h-72 cursor-pointer"
      >
        <Image
          src={`/images/albums/${ id }/${ photo }`}
          alt=""
          className="rounded p-1 border"
          fill
        />
      </div>
    ))}
  </>);
}
