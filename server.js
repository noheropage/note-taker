const express = require('express')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./db/routes/apiRoutes')(app)
require('./db/routes/htmlRoutes')(app)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});