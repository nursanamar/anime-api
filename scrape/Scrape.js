const cherioo = require('cheerio')
const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie')(nodeFetch)


async function getCookie() {
    let req = await fetch("http://anoboy.org");
    return req.headers.get("set-cookie")
}


module.exports.animeList = async (callback = () => {},err = () => {}) => {
    fetch("http://anoboy.org/anime-list-sub-indo/",{
        headers : {
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
        }
    }).then(res => {
        return res.text();
    }).then(html => {
        let $ = cherioo.load(html);
        let list = {} 
        list.ongoing = []
        list.abjacd = []
        console.log(html)
        $(".OnGoing").each((index,el) => {
            let temp = {};
            temp.title = $("a",el).text();
            temp.url = $('a',el).attr('href');
            list.ongoing.push(temp);
            // console.log(temp)
        })
        
        let res = {
            status: "success",
            data : list
        }
        callback(res);
    }).catch(err => {
        console.log(err);
        err(err);
    })
}


module.exports.search = (query,callback = () => { }, err = () => { }) => {
    fetch("http://anoboy.org/?s="+query).then(res => {
        return res.text();
        console.log(res);
    }).then(html => {
        let $ = cherioo.load(html);
        let list = []
        $(".depan").each((index, el) => {
            let temp = {};
            temp.title = $(".homejudul", el).text();
            temp.thumbnail = $("amp-img", el).attr('src');
            temp.url = $('.homejudul', el).attr('href');
            list.push(temp);
        })
        let status = {
            status : "success",
            count : list.length,
            data : list
        }
        callback(status);
    }).catch(err => {
        console.log(err);
        err(err);
    })
}


module.exports.openVideo = (url,callback = () => {},err = () => {}) => {
    fetch(url).then(res => {
        
        return res.text()
    }).then(html => {
        let $ = cherioo.load(html);
        let result = {
            video: $("source").attr("src"),
            type : $("source").attr("type") 
        }
        let res = {
            status : "success",
            data : result
        }
        
        callback(res);
    }).catch(err => {
        err(err);
        console.log(err)
    })
}

module.exports.listEpisode = (url, callback = () => { }, err = () => { }) => {
    fetch(url).then(res => {

        return res.text()
    }).then(html => {
        let $ = cherioo.load(html);
        let result = []
        $('.lcp_catlist > li').each((index,el) => {
            let temp = {}
            temp.title = $("a",el).text();
            temp.url = $("a",el).attr("href");
            result.push(temp); 
        })
        let res = {
            status: "success",
            data: result
        }

        callback(res);
    }).catch(err => {
        err(err);
        console.log(err)
    })
}


module.exports.page = (page,callback = () => { }, err = () => { }) => {
    fetch("http://anoboy.org/base/"+page).then(res => {
        return res.text();
        console.log(res);
    }).then(html => {
        let $ = cherioo.load(html);
        let list = []
        console.log(html)
        $(".depan").each((index, el) => {
            let temp = {};
            temp.title = $(".homejudul", el).text();
            temp.thumbnail = $("img", el).attr('src');
            temp.url = $('.homejudul', el).attr('href');
            list.push(temp);
            console.log(temp)
        })
        console.log(list)
        callback(list);
    }).catch(err => {
        console.log(err);
        err(err);
    })
}