export type ILoginUser = {
  id: string;
  password: string;
};

// login user response

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
