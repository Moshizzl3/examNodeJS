import { readable, writable } from "svelte/store";
import { io } from "socket.io-client";

export const BASE_URL = readable("http://localhost:8080");

export const webSocket = writable(io("http://localhost:8080"));

const getCookie = (key) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === key ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export const cookie = readable(getCookie("token"));
