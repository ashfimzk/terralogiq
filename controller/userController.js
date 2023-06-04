const db = require("../connection/conn");
// const HTTPStatus = require("../helper/HTTPstatus");
const { asyncQuery } = require("../helper/queryHelper");
const { createToken } = require("../lib/jwt");

module.exports = {
    login: async (req, res) => {
        try {
          let { username, password } = req.body;

          if (!username || !password)
            return res.status(404).send({
              isError: true,
              message: "Input must be filled",
              data: null,
            });
          let uid;
          const query = "SELECT * FROM user WHERE username = ? AND password = ?";
          const values = [username, password];
          try {
            const result = await asyncQuery(query, values);
            console.log(result.length);
            if (result.length === 0)
              return res.status(401).send({
                isError: true,
                message: "Username or password not found",
                data: null,
              });
            uid = result[0].uid;
          } catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }
      
          const token = createToken({
            uid: uid,
          });
      
          res.status(200).send({
            isError: false,
            message: "Login Success",
            data: token,
          });
        } catch (error) {
          res.status(500).send("User or password not found");
          console.log(error);
        }
      },
  getProfile: async (req, res) => {
    try {
      const { uid } = req.uid;
      const query = "SELECT username,role FROM user WHERE uid = ?";
      const values = [uid];

      try {
        const result = await asyncQuery(query, values);
        res.status(200).send({
          isError: false,
          message: "Get Profile Succes",
          data: result,
        });
      } catch (err) {
        return res.status(500).send("Internal Server Error");
      }
    } catch (error) {}
  },
};

