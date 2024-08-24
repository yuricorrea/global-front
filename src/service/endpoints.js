const endpoints = {
  auth: {
    REGISTER: '/auth/signup',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    GET_ME: '/auth/me',
    SEND_VERIFY_EMAIL: '/auth/verifyemail',
  },
  gateway: {
    DEPOSIT: '/gateway/deposit',
    WITHDRAW: '/gateway/withdraw',
    PAYMENTS: '/gateway/listpayments',
    BALANCE: '/gateway/getbalance',
    DAILY_REWARD: '/gateway/dailygift',
    REDEEM_BONUS: '/gateway/redeembonus',
  },
  orders: {
    GET: '/orders/get',
    WITHDRAW: '/orders/withdraw',
  },
  products: {
    ALL: '/products/get',
    BUY: '/products/buy',
  },
  referral: {
    GET: '/referral/get'
  }
};

export default endpoints;
