import React from "react";
import { UserPageProps } from "../types";
import PostList from "../../../../components/PostsList";


export default function Page({ params }: UserPageProps) {
  return (<div className="p-5">
    <h2 className="text-lg font-bold">Posts</h2>
    <PostList id={ params.id } />
  </div>);
}
