import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { Gender } from "../../data/types";
import { SidebarNavigationProps } from "./types";
import "./style.scss";


export default function SidebarNavigation({ user, friends }: SidebarNavigationProps) {
  return (<nav className="mr-2.5 pt-2.5 w-64">
      <div className="place-items-center w-[255]">
        <div className="place-items-center border-b w-52 pb-10">
          <div className="relative w-16 h-16 mt-5">
            <Link href={ `/users/${ user.user_id }` }>
              <Image
                src={ user.image }
                alt={ user.name }
                className="rounded-full p-1.5"
                fill
              />
            </Link>
          </div>
          <h4 className="font-bold mt-2.5">{ user.name }</h4>
          <p className="text-sm">{ user.location }</p>

          <p className="font-bold text-xs mt-5">Friends</p>
          <p className="text-xs">{friends ? friends.length : 0}</p>
        </div>

        <div className="place-items-center border-b w-52 py-10">
          <ul>
            <li className="text-sm pb-5">{ user.description }</li>
            <li className="text-sm"><span>Occupation:</span> { user.occupation }</li>
            <li className="text-sm"><span>Gender:</span>{ user.gender === Gender.Male ? 'male' : 'female' }</li>
            <li className="text-sm"><span>Birthday:</span> { user.dob }</li>
          </ul>
        </div>
      </div>

      <ul className="p-0 m-0 list-none place-items-left">
        <li className="display list-none">
          <Link href="/users" className="block px-2.5 py-5">Users</Link>
        </li>
        <li className="display list-none">
          <Link href={ `/users/${ user.user_id }/friends` } className="block px-2.5 py-5">Friends</Link>
        </li>
        <li className="display list-none">
          <Link href={ `/users/${ user.user_id }/posts` } className="block px-2.5 py-5">Posts</Link>
        </li>
      </ul>
    </nav>
  );
}
