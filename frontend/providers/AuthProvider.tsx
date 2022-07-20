import firebase from "firebase/compat/app";
import auth from "../config/firebase/firebaseClient";
import nookies from "nookies";
import { createContext, useState, useEffect, useContext } from "react";

export interface IAuthContext {
  user: firebase.User | null;
  createUser: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  createUser: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  // handle auth logic here...
  const createUser = () => {
    console.log("creating a user");
  };

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
