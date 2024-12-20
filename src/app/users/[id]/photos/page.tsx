import React from "react";
import { UserPageProps } from "../types";
import PhotosList from "../../../../components/PhotosList";


export default function Page({ params }: UserPageProps) {

  return (<>
    <h2 className="text-lg font-bold">Photos</h2>
    <div className="p-5 flex">
      <PhotosList id={ params.id } />
    </div>
  </>);
}
