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
        user: true,
      },
    });
    res.send(result);
  } else {
    return res.status(400).send("Email already exists, couldn't send request");
  }
};



module.exports = { dealerForm };
