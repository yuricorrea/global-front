const { atom } = require("recoil");

export const userState = atom({
  key: 'userState',
  default: {
    uid: "",
    email: "",
    emailVerified: false,
    exp: 0,
    iat: 0,
    inviteCode: "",
    phone: ""
  }
});