import { createContext, useContext } from "react";
import PocketBase from "pocketbase";

const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || "");
const PocketBaseContext = createContext(client);

export const PocketBaseProvider = (props: any) => {
  return (
    <PocketBaseContext.Provider value={client}>
      {props.children}
    </PocketBaseContext.Provider>
  );
};

export const usePocketBase = () => useContext(PocketBaseContext);
