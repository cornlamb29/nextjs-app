"use client";

import React from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { JSONResponse } from "../../app/api/types";
import { Post } from "../../data/types";
import { PostsProps } from "./types";


export default function PostList({ id }: PostsProps) {
  const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<
    { data: Post[] },
    JSONResponse
  >(() => (`/api/users/${ id }/posts`), fetcher, {
    refreshInterval: process.env.API_REFRESH_INTERVAL
  });

  if (postsError) return <div>{ postsError.message }</div>;
  if (postsLoading) return <div>Loading...</div>;

  return (<>
    {!posts?.data?.length && <>No Posts</>}
    {posts?.data?.map((post: Post) => (
      <p className="relative mb-10">
        { post.content }
        <span className="block text-sm">{ post.date }</span>
      </p>
    ))}
  </>);
}
