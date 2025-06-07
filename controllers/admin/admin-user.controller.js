import {prisma} from "../../db.js"

// Get requests controller

const registerRequests = async (req, res) => {
  const requests = await prisma.registeredUsers.findMany();
  res.send(requests);
};

// Accept request controller

const acceptRequest = async (req, res) => {
  // Finds a valid request
  const validRequest = await prisma.registeredUsers.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  // If there is not a valid request, send an error

  if (!validRequest) {
    return res.status(500).send("Request inválida");
  }

  // Create a user with the data and password from the validRequest
  const user = await prisma.user.create({
    data: {
      email: validRequest.email,
      password: validRequest.password,
    },
  });

  // Delete the row where the request was

  const deletedRegisterRow = await prisma.registeredUsers.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  // Send the user and the deleted row

  res.send({ user, deletedRegisterRow });
};

// Denie request controller
const denieRequest = async (req, res) => {
  // Finds a valid request

  const validRequest = await prisma.registeredUsers.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  // If there isn't a valid request, send an error
  if (!validRequest) {
    return res.status(500).send("Request inválida");
  }

  // Delete the request where the id is equal to the id that is sent in the URL params

  const deletedUser = await prisma.registeredUsers.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  // Send the user
  res.send({ deletedUser });
};

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


export {
  registerRequests,
  acceptRequest,
  denieRequest,
  getAdmins,
  getSpecificId,
  getRegisteredUsers,
  getRegisteredUsersByRole,
  pagination
};

