const cherioo = require('cheerio')
const fetch = require('node-fetch')

module.exports.animeList = (callback = () => {},err = () => {}) => {
    fetch("http://anoboy.org/").then(res => {
        return res.text();
        console.log(res);
    }).then(html => {
        let $ = cherioo.load(html);
        let list = []
        console.log(html)
        $(".depan").each((index,el) => {
            let temp = {};
            temp.title = $(".homejudul",el).text();
            temp.thumbnail = $("amp-img",el).attr('src');
            temp.url = $('.homejudul',el).attr('href');
            list.push(temp);
            console.log(temp)
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


module.exports.page = (page,callback = () => { }, err = () => { }) => {
    fetch("http://anoboy.org/base/"+page).then(res => {
        return res.text();
        console.log(res);
    }).then(html => {
        let $ = cherioo.load(html);
        let list = []
        $(".depan").each((index, el) => {
            let temp = {};
            temp.title = $(".homejudul", el).text();
            temp.thumbnail = $("img", el).attr('src');
            temp.url = $('.homejudul', el).attr('href');
            list.push(temp);
        })
        callback(list);
    }).catch(err => {
        console.log(err);
        err(err);
    })
}