import React, { PropsWithChildren } from "react";

export type UserPageProps = {
  params: {
    id: number
  }
}

export type UserLayoutProps = PropsWithChildren<UserPageProps>;

