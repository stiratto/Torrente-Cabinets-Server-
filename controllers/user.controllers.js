const prisma = require("../db");

const pagination = async (req, res) => {
  const result = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },

    skip: +req.query.skip,
    take: +req.query.take,
  });

  res.send(result);
};

const getRegisteredUsers = async (req, res) => {
  const result = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    take: +req.query.take,
  });

  res.status(200).send(result);
};
const getRegisteredUsersByRole = async (req, res) => {
  const result = await prisma.user.findMany({
    where: {
      role: req.params.role,
    },

    take: 5,
  });
  res.status(200).send(result);
};

const getSpecificId = async (req, res) => {
  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).send(result);
};

const getAdmins = async (req, res) => {
  const result = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });
  res.status(200).send(result);
};

module.exports = {
  pagination,
  getRegisteredUsers,
  getSpecificId,
  getRegisteredUsersByRole,
  getAdmins,
};
