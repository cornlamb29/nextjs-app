import { users } from "./users";
import { friendships } from "./friendships";
import { posts } from "./posts";
import { User, Post } from "./types";

export const getAllUsers: () => User[] = () => users;
export const getUser: (id: number) => User | undefined = (id) => users.find(u => u.user_id === id)
export const getFriends: (id: number) => User[] = (id) => friendships.filter(f => f.user_id === id || f.friend_id === id).map(f => {
  return getUser(f.friend_id === id ? f.user_id : f.friend_id) as User;
})
export const getPosts: (id: number) => Post[] = (id) => posts.filter(p => p.user_id === id);
