import argon2 from "argon2";

const options = { hashLength: 40, timeCost: 4, memoryCost: 5120 };

export const hashPassword = async (password) => {
  return await argon2.hash(password, options);
};

export const verifyPassword = async (hash, password) => {
  return await argon2.verify(hash, password, options);
};
