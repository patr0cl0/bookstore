const express = require('express');
const multer = require('multer');
const url = require('url');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { name, 'own-book-name': ownBookName, 'wished-book-name': whisedBookName } = req.body;
    const { referer } = req.headers;

    const [userKey, username] = url.parse(referer).query.split('=');
    fs.mkdir(`uploads/${username}`, () => {

      cb(null, `uploads/${username}`)
    });
  },
  filename: (req, file, cb) => {
    const bookname = file.originalname
    if (!bookname) {
      throw Error('Bad request, no file name provided');
    }

    const [mime, type] = file.mimetype.split('/');

    cb(null, `${bookname.replace(' ', '_')}-${Date.now().toString()}.${type}`) ;
  },
});

const upload = multer({ storage });

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', function (req, res, next) {
  const { name } = req.query;

  console.log(name)

  if (!name) {
    throw Error('Need to provide a name! :(');
  }

  res.render('dashboard', { name });
});

router.post('/add-book', upload.single('image'), function (req, res, next) {
  const { referer } = req.headers;

  res.redirect(referer);
});


module.exports = router;
