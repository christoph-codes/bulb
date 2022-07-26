import firebase from "firebase/compat/app";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { getWithExpiry, setWithExpiry } from "../utils/helper";

export interface IAuthContext {
  user: firebase.User | null;
  setUser: Dispatch<SetStateAction<firebase.User | null>>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(() => {
    const localUser = getWithExpiry("bulb_user");
    return (
      localUser || {
        loggedInStatus: false,
        _id: "",
        username: "",
        fname: "",
        lname: "",
        email: "",
        githubUrl: "",
        jobTitle: "",
        bio: "",
        lastLoggedInDate: "",
      }
    );
  });
  useEffect(() => {
    setWithExpiry("bulb_user", user, 3600000);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
