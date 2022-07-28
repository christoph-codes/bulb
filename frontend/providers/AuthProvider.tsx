import { useRouter } from "next/router";
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
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}
export interface IUser {
  _id?: string;
  username?: string;
  fname?: string;
  lname?: string;
  email?: string;
  githubUrl?: string;
  jobTitle?: string;
  bio?: string;
  lastLoggedInDate?: Date | null;
}

const AuthContext = createContext<IAuthContext>({
  user: {
    _id: "",
    username: "",
    fname: "",
    lname: "",
    email: "",
    githubUrl: "",
    jobTitle: "",
    bio: "",
    lastLoggedInDate: null,
  },
  setUser: () => {},
});

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(() => {
    const localUser: IUser = getWithExpiry("bulb_user");
    return (
      localUser || {
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

  useEffect(() => {
    if (!user?._id) {
      router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
