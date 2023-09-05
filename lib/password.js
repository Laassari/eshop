import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async function (password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const verifyPassword = async function (password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
};
