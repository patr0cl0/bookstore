const express = require('express');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  const { name } = req.query;

  if (!name) {
    throw Error('Need to provide a name! :(');
  }

  res.render('dashboard', { name });
});

// router.post('/add-book', upload., function(req, res, next) {
//   // console.log(req.body)
//   console.log('FILE')
//   // console.log(req.file.destination)
//   console.log(req.files)
//   // console.log(req.files)

//   res.render('dashboard', { name: 'fernando' });
// });


module.exports = router;
