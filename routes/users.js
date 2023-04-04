const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: parseInt(userId), //Profileにデータがないから探せてない。手動で入れてみた。
      },
      include: {
        user: true,
      },
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
