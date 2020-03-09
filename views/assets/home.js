$(document).ready(() => {
    scrapeNews();
});

//Create function to empty the Db
emptyNews = () => {
    $.ajax({
        type: "DELETE",
        url: "/api/delete"
    }).then(emptyNews => {
        console.log('news is empty')
        $('.news-container').empty();
    })
}

//Create function to render News
const renderNews = () => {
    $.ajax({
        type: "GET",
        url: "/api/all"
    }).then(allNews => {
        allNews.forEach(allNew => {
            $('.news-container').append(
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

$('.scrapeBtn').on('click', (event) => {
    event.preventDefault()
    renderNews();
    $('.notice').empty();
    $('.options').empty();
})

$('#clearBtn').on('click', () => {
    emptyNews();
})

function scrapeNews() {
    console.log("WERE IN THE FUNCTION now")
    $.ajax({
        type: "GET",
        url: "/api/scrape"
    }).then(allNews => {
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

// function doIt() {
//     let thisId = ($(this).data("id"))
//     let already = localStorage.getItem("saved")
//     console.log("already", already)
//     thisId += "," + already
//     localStorage.setItem("saved", thisId)
// }

//$(".news-container").on("click", ".dbBtn", doIt)




