const express = require('express')
const app = express();
const bodyParser = require("body-parser")
const { animeList,page,search,openVideo,listEpisode } = require("./scrape/Scrape.js");
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/',(req,res) => {
    animeList(data => {
        res.send(data);
    },(err) => {
        res.send(err)
    })
})

app.get("/page/:page",(req,res) => {
    let pages = req.params.page;
    console.log(pages)
    page(page,data => {
        res.send(data);
    })
})

app.get("/search/:query",(req,res) => {
    search(req.params.query,(data) => {
        res.send(data);
    })
})

app.post("/video",(req,res) => {
    let {url} = req.body
    openVideo(url,(data) => {
        res.send(data);
    })
})

app.post("/episode", (req, res) => {
    let { url } = req.body
    listEpisode(url, (data) => {
        res.send(data);
    })
})

app.listen(port, () => console.log("runing on port " + port));