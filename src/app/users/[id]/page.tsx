import React from "react";
import FriendsIconList from "../../../components/FriendsIconList";
import Photo from "../../../components/Photo";
import { UserPageProps } from "./types";


export default function Page({ params }: UserPageProps) {
  return (<>
    <div className="pb-10">
      <FriendsIconList id={ params?.id  } />
    </div>
    <div className="p-5">
      <h2 className="text-lg font-bold">Photos</h2>
      <Photo id={ params?.id  } />
    </div>
  </>);
}
