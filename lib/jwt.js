import jwt from 'jsonwebtoken'

module.exports.generateToken = (email) =>
  new Promise((resolve, reject) => {
    jwt.sign({ email }, process.env.TOKEN_SECRET, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

module.exports.verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
