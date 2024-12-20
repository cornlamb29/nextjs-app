import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { getAllUsers } from "../data";


export default function UserList(): React.ReactElement {
  const users = getAllUsers();

  return (<div className="bg-slate-50 flex-wrap flex p-6">
    {users.map((user) => (
      <div
        className="basis-1/5 m-3 border p-2.5 rounded rounded-2xl border-gray-300 bg-white cursor-pointer"
      >
        <div className="relative w-72 h-72">
          <Link href={ `/users/${user.user_id}` }>
            <Image
              src={user.image}
              alt={user.name}
              className="rounded-2xl"
              fill
            />
          </Link>
        </div>
        <h2 className="text-2xl m-4 mt-7 font-semibold w-64">{ user.name }</h2>
        <h2 className="text-lg m-4 font-light w-64">{ user.occupation }</h2>
      </div>
    ))}
  </div>)
}
