import { body, check, validationResult } from "express-validator";

export const signupValidationRules = () => {
  return [
    body("mail").isEmail().withMessage("Not a valid mail"),
    body("mail").notEmpty().withMessage("Mail cannot be empty"),
    body("password1")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 characters long"),
    check("password1").custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};

export const postValidationRules = () => {
  return [body("text").notEmpty().withMessage("A post cannot be empty")];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(400).json({
    errors: extractedErrors,
  });
};
