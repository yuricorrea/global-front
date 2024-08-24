import { useState, useEffect } from "react";
import useApi from "./useApi";
import { getCredentials, getReferralCode, setReferralCode } from "@/service/storage";
import endpoints from "@/service/endpoints";
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";

const useSession = () => {
  const [loaded, setLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const api = useApi();
  const [user, setUser] = useRecoilState(userState);

  const init = async () => {
    try {
      const { data } = await api?.get(endpoints.auth.GET_ME);
      if (data.uid) {
        const localData = getReferralCode(data.uid);
        let code = localData?.code;
        let phone = localData?.phone;
        if (!code) {
          const response = await api.get(endpoints.referral.GET);
          code = response.data.referralCode;
          phone = response.data.phone;
          setReferralCode({ uid: data.uid, code, phone });
        }
        setUser({
          ...data,
          inviteCode: code,
          phone,
        });
        setAuthorized(true);
      }
    } catch (e) {
      console.log(e);
    }
    setLoaded(true);
  }

  useEffect(() => {
    const { accessToken } = getCredentials();
    if (accessToken) {
      init();
    } else {
      setLoaded(true);
    }
  }, [])

  return { loaded, authorized, user, init }

}

export default useSession;