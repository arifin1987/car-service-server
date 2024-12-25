/**
 * After Login from client side send information from Login.jsx to server side 
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state ? location?.state : "/");
            }
          });
**Create token using jwt.sign, create secret key and set it to env file. Send token to cookie.
**write node and enter then write require('crypto').randomBytes(64).toString('hex')
 * app.post("/jwt", async (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      // set token to cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        })
        .send({ success: true });
    });
** To get data in cookie we need to add these in cors middleware
 *app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
 ** To receive data in client side we need to set, withCredentials: true, in client route
 ** Install cookie parser to get cookie in the server side;

 *app.use(cookieParser()) in server side as a middleware
 *const verifyToken = async (req, res, next) => {
   const token = req.cookies.token;
   if (!token) {
     return res.status(403).send({ message: "Unauthorized access" });
   }
 
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
     if (err) {
       return res.status(403).send({ message: "Unauthorized access" });
     }
     req.user = decoded;
     next();
   });
 };
 *
 *
 *
 *
 */
