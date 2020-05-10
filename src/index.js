const express = require('express')
const app = express();
const scrapper = require('linkedin-scrapper');
const path = require('path');
const port = 3000


app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.redirect("public/index.html")
})

app.post('/api/getuser', async (req, res) => {
    try {
        var url = req.body.url;
        var profile = await scrapper({
            url: url
        })
        res.status(200);
        res.send(profile);
    } catch (e) {
        res.status(500);
    }

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
