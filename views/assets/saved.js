renderAllNews = (id, cb) => {
    $.ajax({
        type: 'GET',
        url: `/api/find/${id}`
    }).then(news => cb(news))
}

$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    console.log(newsId);

    renderAllNews(newsId, article => {
        console.log(article);
        $('#articleHeadline').text(article.headline);
        $('#articleSummary').text(article.summary)
    })
})

