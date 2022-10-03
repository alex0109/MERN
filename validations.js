import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Unvalid email format').isEmail(),
    body('password', 'Password length must be min 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Name must be longer than 3 letters').isLength({ min: 3 }),
    body('avatarURL', 'Must URL for picture').optional().isURL()
]

export const registerValidation = [
    body('email', 'Unvalid email format').isEmail(),
    body('password', 'Password length must be min 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Name must be longer than 3 letters').isLength({ min: 3 }),
    body('avatarURL', 'Must URL for picture').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Please enter title').isLength({ min: 3 }).isString(),
    body('text', 'Please enter text').isLength({ min: 3 }).isString(),
    body('tags', 'Uncorrect tags format(must be array)').optional().isArray(),
    body('imageURL', 'Must URL for picture').optional().isURL()
]