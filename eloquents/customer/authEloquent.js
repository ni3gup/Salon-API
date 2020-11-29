const Gender = require('../../models/Gender');

const getGender = async () => {
  try {
    return await Gender.findAll({
      attributes: ['id', 'name'],
      where: {
        is_active: 1
      }
    });
  } catch (error) {
    throw error;
  }
}

const signupRules = async () => {
  return {
    name: "required",
    email: "required|email",
    name: "required",
    phone: "required|minLength:10|maxLength:13",
    dob: "required|dateFormat:YYYY-MM-DD",
    password: "required|minLength:6|same:confirm_password",
    confirm_password: "required|minLength:6",
    gender_id: `required|in:${(await getGender()).map(gender => gender.id).join(',')}`
  };
}

const signupMessages = async () => {
  return {
    "email.required": "Email is required",
    "email.email": "Email is invalid",
    "name.required": "Name is required",
    "phone.required": "Phone is required",
    "phone.minLength": "Phone must be atleast 10 characters",
    "phone.maxLength": "Phone must not be more than 13 characters",
    "dob.required": "Date of birth is required",
    "dob.dateFormat": "Date of birth must be in YYYY-MM-DD format",
    "password": "Password is required",
    "password.minLength": "Password must be atleast 6 characters",
    "password.same": "Password must be same as confirm password",
    "confirm_password": "Confirm Password is required",
    "confirm_password.minLength": "Confirm Password must be atleast 6 characters",
    "gender_id.required": "Gender is required",
    "gender_id.in": `Gender must be one of these ${(await getGender()).map(gender => gender.name).join(', ')}`
  };
}

const loginRules = () => {
  return {
    email: "required|email",
    password: "required|minLength:6"
  };
}

const loginMessages = () => {
  return {
    "email.required": "Email is required",
    "email.email": "Email is invalid",
    "password": "Password is required",
    "password.minLength": "Password must be atleast 6 characters"
  };
}

module.exports = { signupRules, signupMessages, loginRules, loginMessages };