$(document).ready(() => {
    console.log('testing to see if page works')
})

rednerAllNews = (id, cb) => {
    $.ajax({
        type: 'GET',
        url: `/api/find/${id}`
    }).then(news => cb(news))
}