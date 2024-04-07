import User from '../models/UserModel.js';
import mongoose from 'mongoose';
import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { UnauthorizedError } from '../errors/customErrors.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // if (errorMessages[0].startsWith('no task')) {
        //   throw new NotFoundError(errorMessages);
        // }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('first name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('userName')
    .notEmpty()
    .withMessage('username is required')
    .custom(async (userName) => {
      const user = await User.findOne({ userName });
      if (user) {
        throw new BadRequestError('userName already exists');
      }
    }),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 3 })
    .withMessage('password must be at least 10 characters long'),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/
  // )
  // .withMessage(
  //   'password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character'
  // ),
]);

export const validateLoginInput = withValidationErrors([
  body('userName').notEmpty().withMessage('userName is required'),
  body('password').notEmpty().withMessage('password is required'),
]);

// export const validateTaskInput = withValidationErrors([
//   body('title').notEmpty().withMessage('title is required'),
//   body('description').notEmpty().withMessage('description is required'),
// ]);

// export const validateIdParam = withValidationErrors([
//   param('id').custom(async (value) => {
//     const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
//     if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
//     const task = await Task.findById(value);
//     if (!task) throw new NotFoundError(`no task with id ${value}`);
//   }),
// ]);

// export const validateOwner = withValidationErrors([
//   param('id').custom(async (value, { req }) => {
//     const task = await Task.findById(value);
//     const isOwner =
//       req.user.userId === task.createdBy.toString() ||
//       req.user.role === 'admin';
//     if (!isOwner)
//       throw new UnauthorizedError('not authorized to access this route');
//   }),
// ]);

// export const validateUpdateUserInput = withValidationErrors([
//   body('firstName').notEmpty().withMessage('first name is required'),
//   body('lastName').notEmpty().withMessage('last name is required'),
//   body('userName')
//     .notEmpty()
//     .withMessage('username is required')
//     .custom(async (userName, { req }) => {
//       const user = await User.findOne({ userName });
//       if (user && user._id.toString() !== req.user.userId) {
//         throw new BadRequestError('userName already exists');
//       }
//     }),
//   body('email')
//     .notEmpty()
//     .withMessage('email is required')
//     .isEmail()
//     .withMessage('invalid email format')
//     .custom(async (email, { req }) => {
//       const user = await User.findOne({ email });
//       if (user && user._id.toString() !== req.user.userId) {
//         throw new BadRequestError('email already exists');
//       }
//     }),
// ]);
