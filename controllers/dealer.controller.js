const prisma = require("../db");

const dealerForm = async (req, res) => {
  const {
    name,
    company_email,
    companyvendor_name,
    ein,
    company_address,
    phone_number,
    personal_email,
    company_description,
    userId,
  } = req.body;

  const existingEmail = await prisma.dealer.findFirst({
    where: {
      company_email: company_email,
    },
  });

  if (!existingEmail) {
    const result = await prisma.dealer.create({
      data: {
        name,
        company_email,
        companyvendor_name,
        ein,
        company_address,
        phone_number,
        personal_email,
        company_description,
        userId,
      },
      include: {
        user: true, // Esto accede al campo de relación "user" en Dealer
      },
    });
    res.send(result);
  } else {
    return res.status(400).send("Email already exists, couldn't send request");
  }
};

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
  const result = await prisma.dealer.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.send(result);
};

module.exports = { dealerForm, acceptRequest, denieRequest, getDealerRequests };
