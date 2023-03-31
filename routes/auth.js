const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//新規登録（name, email, password(hashed)）
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});

//ログインしてトークン取得(email, password照合)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //emailでユーザーを探してくる
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(401)
      .json({ error: "メールアドレスかパスワードが間違っています" });
  }

  //パスワード検証
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "パスワードが間違っています" });
  }

  //JWT認証OK＝ログイン完了
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //ログインできたの証明を発行
  res.json({ token });
});

module.exports = router;
