"use client";

import React from "react";
import useSWR from "swr";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import fetcher from "../../lib/fetcher";
import { User } from "../../data/types";
import { JSONResponse } from "../../app/api/types";
import { FriendsIconListProps } from "./types";


export default function FriendsIconList({ id }: FriendsIconListProps) {
  const router = useRouter();

  const { data: friends, error: friendError, isLoading: friendLoading } = useSWR<
    { data: User[] },
    JSONResponse
  >(() => (`/api/users/${ id }/friends`), fetcher);

  if (friendError) return <div>{ friendError.message }</div>;
  if (friendLoading) return <div>Loading...</div>;

  return (<div className="p-5">
    <h2 className="text-lg font-bold">Friends</h2>
    {!friends?.data?.length && <>No Friends</>}
    {friends?.data?.map((friend: User, i: number) => (<>
      {i < 4 && <div
        key={i}
        className="relative w-12 h-12 inline-block cursor-pointer relative "
        onClick={() => router.push(`/users/${ friend.user_id }`)}
      >
        <Image
          src={ friend.image }
          alt={ friend.name }
          className="rounded-full p-1 border"
          fill
        />
      </div>}
    </>))}
    {friends && friends?.data?.length > 4 && <div
      className="inline-block ml-5 relative top-[-20px] border rounded-full p-2 cursor-pointer"
      onClick={() => router.push(`/users/${ id }/friends`)}
    >
      all...
    </div>}
</div>)
}
