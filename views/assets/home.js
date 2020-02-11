$(document).ready(() => {

});

$('.scrape').on('click', () => {
    console.log('This works');
    renderNews();
})

//Create function to render News
renderNews = () => {
    $.ajax({
        type: "GET",
        url: "/api/all"
    }).then(allNews => {
        console.log(allNews);

        allNews.forEach(allNew => {
            $('.news-container').prepend(
                `
                <div class="news">
                <h3 class="dbheader">${allNew.headline}</h3>
                <p class="dbSummary">${allNew.summary}</p>
                <p class="dbUrl">https://www.nytimes.com${allNew.url}</p>
                <button class="dbBtn">Add to Saved Articles</button>
                </div>
                `
            )
        })
    })
}