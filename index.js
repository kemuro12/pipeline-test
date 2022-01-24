const express = require('express')
const app = express();

app.get('/', (req, res) => {
	res.send("hello 2v");
})

app.listen(3001);
