import React from "react";
import SidebarNavigation from "../../../components/SidebarNavigation";
import { getFriends, getUser } from "../../../data";
import { UserLayoutProps } from "./types";

export default async function UserLayout({
  children,
  params
}: UserLayoutProps) {

  const user = await getUser(Number(params.id));
  const friends = await getFriends(Number(params.id));

  return (<>
    <SidebarNavigation user={ user! } friends={ friends }/>
    <section className="flex flex-col overflow-x-hidden w-full">
      { children }
    </section>
  </>);
}