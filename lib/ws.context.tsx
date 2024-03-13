import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

type ProviderProps = {
  socket: Socket | undefined;
  children: ReactNode;
};

const Context = createContext<Socket | undefined>(undefined);

export function useSocket() {
  return useContext(Context);
}

export function SocketProvider({ socket, children }: ProviderProps) {
  return <Context.Provider value={socket}>{children}</Context.Provider>;
}
