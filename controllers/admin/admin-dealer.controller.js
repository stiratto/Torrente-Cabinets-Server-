import prisma from "../../db.js"
const acceptRequest = async (req, res) => {
  const { userId, id } = req.body;
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "DEALER",
    },
  });

  if (result) {
    await prisma.dealer.delete({
      where: {
        id: id,
      },
    });
  }
};
const denieRequest = async (req, res) => {
  const { id } = req.body;
  const result = await prisma.dealer.delete({
    where: {
      id: id,
    },
  });

  res.send(result);
};

const getDealerRequests = async (req, res) => {
  try {
    const result = await prisma.dealer.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.send(result);
  }catch(err) {
    throw new Error(err)
  }
  
};

export {
   acceptRequest,
   denieRequest,
   getDealerRequests
}
