import multer from 'multer'
import express from 'express'
import mongoose from 'mongoose'

import {checkAuth, handleValidationErrors} from './utils/index.js'
import {UseController, PostController} from './controllers/index.js'
import {registerValidation, loginValidation, postCreateValidation} from './validations/auth.js'



const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json())
app.use('/uploads', express.static('uploads'))

mongoose.connect('mongodb+srv://speedy_zxc:GUqvs8LNO1DKGvSV@cluster0.9dgixtu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB error', err))

app.post('/auth/register', registerValidation, handleValidationErrors, UseController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UseController.login)
app.get('/auth/me', checkAuth, UseController.getMe);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server started on port: 4444')
})