const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "権限がありません" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "権限がありません" });
    }

    //認証されたJWTトークンからデコードされたユーザーIDをリクエストオブジェクトに追加しています。
    //以降のハンドラでデコード済みユーザーIDを簡単に取得できる。
    req.userId = decoded.id;

    next();
  });
}

module.exports = isAuthenticated;
