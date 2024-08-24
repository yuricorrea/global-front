export const getCredentials = () => {
  const data = localStorage.getItem("auth");
  try {
    return JSON.parse(data) || {};
  } catch (e) {
    return null;
  }
}

export const setCredentials = ({ accessToken, refreshToken }) => {
  const data = JSON.stringify({ accessToken, refreshToken });
  localStorage.setItem("auth", data);
}

export const getReferralCode = (uid) => {
  const data = localStorage.getItem("referral");
  try {
    const referral = JSON.parse(data);
    if (referral.uid === uid) return { code: referral.code, phone: referral.phone };
    return null;
  } catch (e) {
    return null;
  }
}

export const setReferralCode = ({ uid, code, phone }) => {
  const data = JSON.stringify({ uid, code, phone });
  localStorage.setItem("referral", data);
}