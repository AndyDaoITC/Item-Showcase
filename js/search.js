$("#searchitem-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#product-container .product-child").filter(function () {
        $(this).toggle($(this).children('h3').text().toLowerCase().indexOf(value) > -1)
    });
});
