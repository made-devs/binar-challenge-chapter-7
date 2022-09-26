const db = require("../../models");

module.exports = async (req, res) => {
  const { code, userId } = req.body;

  const checkIfRoomExists = await db.UserGameRoom.findOne({
    where: { roomCode: code },
  });

  // handle when room exist
  if (checkIfRoomExists) {
    checkIfRoomExists.gameGuestUserId = userId;
    await checkIfRoomExists.save();

    return res.json({
      status: true,
      code,
      mode: "guest",
      message: "you are guest",
    });
  }

  await db.UserGameRoom.create({
    roomCode: code,
    gameMasterUserId: userId,
  });

  res.json({
    status: true,
    code,
    mode: "master",
    message: "you are game master",
  });
};
