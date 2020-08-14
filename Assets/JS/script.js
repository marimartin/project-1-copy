var isbnNumber;
$(document).ready(function () {
    renderBook();
});

function renderBook() {
    $('#searchBook-btn').on('click', function () {
        var title = $('#myInput').val().trim();
        $('#myInput').val('');
        searchBook(title);
    })
}
//var mainDate = dayjs().format('[DD/MM/YYYY]');
// var mainDateEl = title.append(" " + mainDate);
//console.log(mainDate);



function searchBook(title) {
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&download=epub&key=AIzaSyCafPwWf0r8BEYpspHQjofo1RSKo6lqXcU";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var title = '<h5>' + response.items[0].volumeInfo.title + '</h5>';
        var author = '<p>' + response.items[0].volumeInfo.authors + '</p>';
        var catagory = '<p>' + response.items[0].volumeInfo.categories + '</p>';
        //var salability = '<p>'+ response.items[i].volumeInfo.saleInfo.saleability + '</>';
        var bookImage = "<img src=" + response.items[0].volumeInfo.imageLinks.smallThumbnail + ">";
        var bookDiv = $('<div>');
        bookDiv.attr('class', 'bookDiv');
        bookDiv.append(title + author + catagory + bookImage);
        $('#recordedBook').append(bookDiv);

        localStorage.setItem("title", JSON.stringify(title));

        var isbnNumber = response.items[0].volumeInfo.industryIdentifiers[0].identifier;
        console.log(isbnNumber)

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // var goodreadsQueryURL = "https://www.goodreads.com/book/review_counts.json?isbns=" + isbnNumber + "key=cU7MkZMEBPNFmw5qMfbw"; // site that doesn’t send Access-Control-*
        // fetch(proxyurl + goodreadsQueryURL) // https://cors-anywhere.herokuapp.com/https://example.com
        //     .then(response => response.text())
        //     .then(contents => console.log(contents))
        //     .catch(() => console.log("Can’t access " + goodreadsQueryURL + " response. Blocked by browser?"))
        var goodreadsQueryURL = "www.goodreads.com/book/review_counts.json?isbns=" + isbnNumber + "key=cU7MkZMEBPNFmw5qMfbw";

        $.ajax({
            url: (proxyurl + goodreadsQueryURL),
            method: "GET"
        }).then(function (nextResponse) {
            console.log(nextResponse)
        })
    });

}




