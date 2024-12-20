import React from "react";
import FriendsList from "../../../../components/FriendsList";
import { UserPageProps } from "../types";


export default function Page({ params }: UserPageProps) {
  return (<div className="p-5">
    <h2 className="text-lg font-bold">Friends</h2>
    <FriendsList id={ params.id } />
  </div>);
}
