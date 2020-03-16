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
                <p class="commentSection">User Comments: ${article.comment}</p>
                <input class="commentBox" data-id=${article._id} type="text" placeholder="Add Comment Here..">
                </input>
                <button class="commentBtn" data-id=${article._id}>Add Comment</button>
                <button class="deleteBtn" data-id=${article._id}>Delete Article</button>
                </div>
                `
            )
        });
    })
})

$(document).on('click', '.deleteBtn', function () {
    const id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
        type: "DELETE",
        url: `/api/delete/${id}`
    }).then(window.location.reload(true))
})
$(document).on('click', '.commentBtn', function () {
    const id = $(this).attr('data-id');
    console.log(id);
    const comment = $('.commentBox').val();
    console.log(comment);
    $.ajax({
        type: "PATCH",
        url: `/api/comments/${id}`,
        data: { comment: comment }
    }).then(res => console.log(res))
    window.location.reload(true)
})
