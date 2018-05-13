const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'fileUpload' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(5555, () => {
  console.log('app running on port.', server.address().port)
})

app.post('/video', upload.single('file'), async (req, res) =>
  res.status(200).send({ fileName: req.file.filename })
)
