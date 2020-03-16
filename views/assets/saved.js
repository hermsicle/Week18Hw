renderAllNews = cb => {
    $.ajax({
        type: 'GET',
        url: `/api/saved/`
    }).then(news => cb(news))
}

$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    console.log(newsId);

    renderAllNews(articles => {
        console.log(articles);
        articles.forEach(article => {
            $('.savedContainer').append(
                `
                <div class="news">
                <h3 class="dbheader">${article.headline}</h3>
                <p class="dbSummary">${article.summary}</p>
                <p class="dbUrl">https://www.nytimes.com${article.url}</p>
                <button class="dbBtn" data-id=${article._id}>Add to Saved Articles</button>
                </div>
                `
            )
        });
    })
})

