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
                <h3>${allNew.headline}</h3>
                <p>${allNew.text}</p>
                </div>
                `
            )
        })
    })
}