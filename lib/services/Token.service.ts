import JWT, { JwtPayload } from "jsonwebtoken";

const JWT_KEY = "!@#$%^&*(!@#$%^&*";
const JWT_KEY2 = "!@#$%^2345&*(!@#$%^&*";
export const GenerateToken = async (user: string) => {
  return await JWT.sign({ userID: user }, JWT_KEY, {
    expiresIn: "1d",
  });
};

export const verifyToken = async (token: string) => {
  const verifydata = (await JWT.verify(token, JWT_KEY)) as JwtPayload;

  const userId = verifydata["userId"];
  return userId;
};

export const GenerateTokenReset = async (user: string) => {
  return await JWT.sign({ userID: user }, JWT_KEY2, {
    expiresIn: "1d",
  });
};

export const verifyTokenReset = async (token: string) => {
  const verifydata = (await JWT.verify(token, JWT_KEY2)) as JwtPayload;

  const userId = verifydata["userId"];
  return userId;
};
