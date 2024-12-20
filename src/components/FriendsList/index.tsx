"use client";

import React from "react";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import fetcher from "../../lib/fetcher";
import { User } from "../../data/types";
import { JSONResponse } from "../../app/api/types";
import { FriendsListProps } from "./types";


export default function FriendsList({ id }: FriendsListProps) {
  const router = useRouter();
  const { data: friends, error: friendError, isLoading: friendLoading } = useSWR<
    { data: User[] },
    JSONResponse
  >(() => (`/api/users/${ id }/friends`), fetcher, {
    refreshInterval: process.env.API_REFRESH_INTERVAL
  });

  if (friendError) return <div>{ friendError.message }</div>;
  if (friendLoading) return <div>Loading...</div>;

  return (<>
    {!friends?.data?.length && <>No Friends</>}
    {friends?.data?.map((friend: User) => (
      <div
        key={friend.user_id}
        className="relative w-40 h-40 m-1 inline-block cursor-pointer relative "
        onClick={() => router.push(`/users/${ friend.user_id }`)}
      >
        <Image
          src={ friend.image }
          alt={ friend.name }
          className="rounded p-1 border"
          fill
        />
      </div>
    ))}
  </>);
}
