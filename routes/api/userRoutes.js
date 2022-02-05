const router = require("express").Router();

const {allUsers,oneUser,addUser,updateUser,deleteUser,addFriend,deleteFriend} = require("../../controllers/userController.js");

router.route("/").get(allUsers).post(addUser);

router.route("/:userId").get(oneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;