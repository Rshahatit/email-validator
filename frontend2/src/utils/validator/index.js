const validator = {
  email: email => /\S+@\S+\.\S+/.test(email)
};

export default validator;
