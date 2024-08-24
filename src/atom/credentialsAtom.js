const { atom } = require("recoil");

export const credentialsState = atom({
  key: 'credentialsState',
  default: {
    accessToken: "",
    refreshToken: "",
  }
});