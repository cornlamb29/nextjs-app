import { AtomEffect } from "recoil";

export type LocalStorageResult<T> = (key: string) => AtomEffect<T>;
