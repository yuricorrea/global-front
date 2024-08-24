import endpoints from "@/service/endpoints";
import useApi from "./useApi"
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";
import { credentialsState } from "@/atom/credentialsAtom";
import { useRouter } from "next/navigation";
import { setCredentials as setStorageCredentials } from "@/service/storage";
import { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const api = useApi();
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useRecoilState(credentialsState);
  const [errorMsg, setErrorMsg] = useState("");

  const clearErrorMsg = () => {
    setErrorMsg("");
  }

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        clearErrorMsg();
      }, 1000)
    }
  }, [errorMsg]);

  const logUser = (data) => {
    const { accessToken, refreshToken } = data;
    setUser({
      uid: data.uid,
      email: data.email,
      emailVerified: data.emailVerified,
      inviteCode: data.inviteCode,
      exp: data.exp,
      iat: data.iat,
    })
    setCredentials({
      accessToken,
      refreshToken,
    })
    setStorageCredentials({ accessToken, refreshToken })
    router.replace("/user/dashboard");
  }

  const login = async ({ email, password }) => {
    setLoading(true);
    const response = await api.post(endpoints.auth.LOGIN, { email, password });
    setLoading(false);
    if (!response.success) {
      return setErrorMsg("Login/Senha inválido");
    }
    const { data } = response;
    logUser(data);
  }

  const signup = async ({ email, password, phone, referral }) => {
    setLoading(true);
    const response = await api.post(endpoints.auth.REGISTER, { 
      email: email, password: password, phone: phone, referralCode: referral 
    });

    setLoading(false);
    if (!response.success) {
      return setErrorMsg(response?.data?.error || "Algo deu errado.");
    }
    const { data } = response;
    logUser(data);
  }

  return {
    login, signup, clearErrorMsg, user, credentials, errorMsg, loading
  }
}

export default useAuth;