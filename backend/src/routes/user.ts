import { Router } from "express";
import { UserRepository } from "../repository/user-repository";

const userRepository = new UserRepository();
const router = Router();

router.get("/", (req, res) => {
  userRepository.getUsers().then(result => res.send(result));
});

router.get("/:userId", (req, res) => {
  userRepository.getUser(req.params.userId).then(result => res.send(result));
});

router.post("/", (req, res) => {
  userRepository.createUser(req.body).then(result => res.send(result));
});

router.put("/:userId", (req, res) => {
  userRepository.updateUser(req.params.userId, req.body)
    .then(() => res.send("OK"));
});

router.delete("/:userId", (req, res) => {
  userRepository.deleteUser(req.params.userId).then(() => res.send("OK"));
});

export default router;
