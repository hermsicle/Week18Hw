const axios = require('axios');
const cheerio = require('cheerio');

axios.get("https://www.nytimes.com/topic/organization/the-new-york-times").then(urlResponse => {
    let $ = cheerio.load(urlResponse.data);

    $('div.css-1l4spti').each((i, element) => {
        let header = $(element)
            .find('h2').text();
        //console.log(header)
        let summary = $(element)
            .find('p').text();
        //console.log(summary + "\n");
        let url = $(element)
            .find('a').attr('href')
        console.log("https://www.nytimes.com" + url + "\n")
    })
})

// axios.get("https://www.awwwards.com/websites/clean/").then(urlResponse => {
//     let $ = cheerio.load(urlResponse.data);
//     console.log($);
//     // $("figure.rollover").each((i, element) => {
//     //     const imgLink = $(element)
//     //         .find("img")
//     //         .attr("data-srcset")
//     //         .split(", ")[1]
//     //         .split(" ")[0];
//     //     console.log(imgLink, "\n");
//     // });
// });

