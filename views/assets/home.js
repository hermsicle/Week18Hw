$(document).ready(() => {
    renderNews();
});


$(document).on('click', '.dbBtn', function () {
    const id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
        type: 'PATCH',
        url: `/api/saved/${id}`,
        data: { saved: true },
    }).then(res => console.log(res))
})

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

$('.scrapeBtn').on('click', () => {
    //event.preventDefault()
    scrapeNews();
    renderNews();
    // $('.notice').empty();
    // $('.options').empty();
})

$('#clearBtn').on('click', () => {
    emptyNews();
    renderNews();
})

function scrapeNews() {
    $.ajax({
        type: "GET",
        url: "/api/scrape"
    }).then(() => {
        console.log('news have been scraped')
    })
}

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
