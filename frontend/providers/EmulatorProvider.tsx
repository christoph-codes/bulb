import { connectAuthEmulator, getAuth } from "firebase/auth";
import { createContext, useEffect } from "react";
import auth from "../config/firebase/firebaseClient";

export interface IEmulatorContext {
  children: any;
}

const EmulatorContext = createContext<any>({});

const EmulatorProvider = ({ children }: any) => {
  /**
   * Check for node version and use the emulator for authentication.
   */
  useEffect(() => {
    const unsub = () => {
      if (process.env.NODE_ENV === "development") {
        connectAuthEmulator(auth, "http://localhost:9099");
      }
    };
    return () => unsub();
  }, []);

  return (
    <EmulatorContext.Provider value={{}}>{children}</EmulatorContext.Provider>
  );
};

export default EmulatorProvider;
