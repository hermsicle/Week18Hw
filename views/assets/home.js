$(document).ready(() => {
    renderNews()
});

// $('#scrapeBtn').on('click', () => {
//     console.log('This works');
//     renderNews();
// })

$('.scrapeBtn').on('click', (event) => {
    event.preventDefault()
    console.log('This ')
    NEWNAME()
})

$(".news-container").on("click", ".dbBtn", doIt)

$('#clearBtn').on('click', () => {
    emptyNews();
})
function NEWNAME() {
    console.log("WERE IN THE FUNCTION")
    $.ajax({
        type: "GET",
        url: "/api/scrape"
    }).then(x => console.log("there's something here now", x))
}
function doIt() {
    let thisId = ($(this).data("id"))
    let already = localStorage.getItem("saved")
    console.log("already", already)
    thisId += "," + already
    localStorage.setItem("saved", thisId)
}

//Create function to render News
const renderNews = () => {
    $.ajax({
        type: "GET",
        url: "/api/all"
    }).then(allNews => {
        //console.log(allNews);

        allNews.forEach(allNew => {
            $('.news-container').prepend(
                `
                <div class="news">
                <h3 class="dbheader">${allNew.headline}</h3>
                <p class="dbSummary">${allNew.summary}</p>
                <p class="dbUrl">https://www.nytimes.com${allNew.url}</p>
                <button class="dbBtn" data-id=${allNew._id}>Add to Saved Articles</button>

                </div>
                `
            )
        })
    })
}

//Create function to empty the Db
emptyNews = () => {
    $.ajax({
        type: "DELETE",
        url: "/api/delete"
    }).then(emptyNews => {
        console.log('news is empty')
    })
}

//Create function that scrapes the news
scrapeNews = () => { }