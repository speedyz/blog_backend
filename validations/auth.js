import  {body} from 'express-validator'

export const registerValidation = [
    body('email', 'incorrect format email').isEmail(),
    body('password', 'Password must contain at least 6 characters').isLength({min: 6}),
    body('fullName','Name must contain at least 3 characters').isLength({min: 3}),
    body('avatarUrl','Incorrect URL').optional().isURL(),
];

export const loginValidation = [
    body('email', 'incorrect format email').isEmail(),
    body('password', 'Password must contain at least 6 characters').isLength({min: 6}),
];

export const postCreateValidation = [
    body('title', 'Enter the title of the article').isLength({min: 3}.isString),
    body('text', 'Enter the text of the article').isLength({min: 10}.isString),
    body('tags','Invalid tag format: specify an array').optional().isArray(),
    body('avatarUrl','Incorrect URL').optional().isString(),
];