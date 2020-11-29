const { verify } = require('jsonwebtoken');

const Customer = require("../../models/Customer");
const errorHandler = require('../../helpers/errorHandler');

const latLngRules = () => {
  return {
    latLng: "required|latLong"
  };
}

const latLngMessages = () => {
  return {
    "latLng.required": "LatLng is required",
    "latLng.latLong": "LatLng is Invalid"
  };
}

const getCustomerFromAuth = async (req) => {
  const authToken = req.get("Authorization") ? req.get("Authorization").split(" ")[1] : null;

  if (authToken) {
    decodedToken = verify(authToken, process.env.JWT_SECRET);
    const customerId = decodedToken.id;

    const customer = await Customer.findOne({
      where: {
        id: customerId,
        is_active: 1
      }
    });

    if (!customer) {
      throw errorHandler(false, "Invalid Token", 403);
    }

    return customer;
  }

  return null;
}

module.exports = { latLngRules, latLngMessages, getCustomerFromAuth };