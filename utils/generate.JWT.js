import jwt from "jsonwebtoken";

export default async (playload, time) => {
  const token = await jwt.sign(playload, process.env.JWT_SECRET_KEY, {
    expiresIn: time,
  });
  return token;
};
