const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//呟き取得用API(最新の10投稿まで取得)
//もっと見るボタンで次の10件をリクエストしても可
//フォローしてるユーザーだけ取得は未実装(Userモデルを変更する必要あり)
router.get("/get_post", async (req, res) => {
  const allPosts = await prisma.post.findMany();

  if (!allPosts) {
    return res.json({ message: "投稿がありません" });
  }

  return res.json({ allPosts });
});

//投稿用API
router.post("/post", isAuthenticated, async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "投稿内容がありません" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId, //だれが投稿したのかがこれで判別可能
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;