$(document).ready(function () {
    $("#crudSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#crudTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('#updateBtn').hide();

    // Regular expression to validate if text is a number or not
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    if (localStorage.getItem('studyTools') != '' && localStorage.getItem('studyTools') != null) {
        var availableTools = JSON.parse(localStorage.getItem('studyTools'));
        if (availableTools.length > 0) {
            for (let availableTool of availableTools) {
                var formatPrice = availableTool.price.toLocaleString('it-IT', {style : 'currency', currency: 'VND'})
                var formatSalePrice = availableTool.salePrice.toLocaleString('it-IT', {style : 'currency', currency: 'VND'})
                var htmlAvailible = `
                    <tr data-id=${availableTool.idProduct}>
                        <td>${availableTool.idProduct}</td>
                        <td>${availableTool.name}</td>
                        <td>${formatPrice}</td>
                        <td>${formatSalePrice}</td>
                        <td><img src='${availableTool.link}' width='100' /></td>
                        <td>
                            <i class="fa-solid fa-trash text-danger mr-2 btn-remove" style="cursor: pointer;"></i>
                            <i class="fa-solid fa-pen text-primary btn-edit" style= "cursor: pointer;"></i>
                        </td>
                    </tr>
                `;
                $('#crudTable > tbody:last-child').append(htmlAvailible);
                var productHtml = `
                    <div class="col-md-3 product-child mt-3 mb-3">
                        <img class="item-img" src="${availableTool.link}" width="100%">
                        <h3 class="name">${availableTool.name}</h3>
                        <p class="price">${formatSalePrice}<sup class="Sup"><del>${formatPrice}</del></sup></p>
                        <button class="addToCart">Add To Cart</button>
                    </div>
                `;
                $('#product-container').append(productHtml);
            }
        }
    }

    $('#addBtn').click(function () {

        //Check required
        if ($('#name').val() === '') {
            $('#name-error').show();
            $('#name-error').text('Name is required!');
            return false;
        }
        $('#name-error').hide();
        if ($('#price').val() === '') {
            $('#price-error').show();
            $('#price-error').text('Price is required!');
            return false;
        }
        $('#price-error').hide();
        if ($('#sale-price').val() === '') {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale price is required!');
            return false;
        }
        $('#sale-price-error').hide();    
        if ($('#link').val() === '') {
            $('#link-error').show();
            $('#link-error').text('Link is required!')
            return false;
        }
        $('#link-error').hide();

        var name = $('#name').val();
        //Check if price is a number
        if (!isNumeric($('#price').val())) {
            $('#price-error').show();
            $('#price-error').text('Price should be a number!')
            return false;
        }
        $('#price-error').hide();
        //Check if sale price is a number
        if (!isNumeric($('#sale-price').val())) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Price should be a number!')
            return false;
        }
        $('#sale-price-error').hide();
        var price = Number($('#price').val());
        var salePrice = Number($('#sale-price').val());

        //Check negative value
        if(price < 0) {
            $('#price-error').show();
            $('#price-error').text('Price must be greater than 0!')
            return false;
        }
        $('#price-error').hide();
        if(salePrice < 0) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Price must be greater than 0!')
            return false;
        }
        $('#sale-price-error').hide();

        if (salePrice > price) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale price must be equal or less than price!');
            return false;
        }

        $('#sale-price-error').hide();

        var link = $('#link').val();
        if(!validURL(link)) {
            $('#link-error').show();
            $('#link-error').text('Link is invalid!');
            return false;
        }

        var idProduct = (Math.random() + 1).toString(36).substring(7);
        var formatPrice = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        var formatSalePrice = salePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        var html = `
            <tr id='tr-${idProduct}' data-id=${idProduct}>
                <td>${idProduct}</td>
                <td>${name}</td>
                <td>${formatPrice}</td>
                <td>${formatSalePrice}</td>
                <td><img src='${link}' width='100' /></td>
                <td>
                    <i class="fa-solid fa-trash text-danger mr-2 btn-remove" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-pen text-primary btn-edit" style="cursor: pointer;"></i>
                </td>
            </tr>
        `;

        $('#crudTable > tbody:last-child').append(html);

        var studyTool = {
            'idProduct': idProduct,
            'link': link,
            'name': name,
            'price': price,
            'salePrice': salePrice
        };

        if (localStorage.getItem('studyTools') == '' || localStorage.getItem('studyTools') == null) {
            var studyTools = [];
        } else {
            var studyTools = JSON.parse(localStorage.getItem('studyTools'));
        }

        studyTools.push(studyTool);

        localStorage.setItem('studyTools', JSON.stringify(studyTools));

        $('#link').val('');
        $('#name').val('');
        $('#price').val('');
        $('#sale-price').val('');
    
    });

    //Delete record
    $('#crudTable').on('click','.btn-remove', function() {
        var isDelete = confirm('Do you want to delete this product?')
        if (isDelete) {
            var dataId = $(this).parent().parent().data('id'); // data-id
            if (localStorage.getItem('studyTools') != '' && localStorage.getItem('studyTools') != null) { // Kiểm tra localStorage đã tồn tại chưa
                var availableTools = JSON.parse(localStorage.getItem('studyTools'));
                if (availableTools.length > 0) { // nếu như có data
                    for (let key in availableTools) {
                        if (dataId === availableTools[key].idProduct) { // nếu như dataId === idProduct nào đó trong localStorage
                            availableTools.splice(key, 1); // Xóa đi phần tử đó trong localStorage
                        }
                    }
                    localStorage.setItem('studyTools', JSON.stringify(availableTools));
                }
            }
            $(this).parent().parent().remove();
            $('#link').val('');
            $('#name').val('');
            $('#price').val('');
            $('#sale-price').val('');
            $('#addBtn').show();
            $('#updateBtn').hide();
        }
    });

    $('#crudTable').on('click', '.btn-edit', function() {
        var dataId = $(this).parent().parent().data('id');
        if (localStorage.getItem('studyTools') != '' && localStorage.getItem('studyTools') != null) {
            var availableTools = JSON.parse(localStorage.getItem('studyTools'));
            if (availableTools.length > 0) {
                for (let key in availableTools) {
                    if (dataId === availableTools[key].idProduct) {
                        $('#link').val(availableTools[key].link);
                        $('#name').val(availableTools[key].name);
                        $('#price').val(availableTools[key].price);
                        $('#sale-price').val(availableTools[key].salePrice);
                    }
                }
            }
        }
        $('#addBtn').hide();
        $('#updateBtn').show();
        $('#updateBtn').attr('data-id', dataId);
    });

    // Handle logic update
    $('#updateBtn').click(function () {
        var dataId = $(this).data('id'); // data-id
        // Check required
        if ($('#name').val() === '') {
            $('#name-error').show();
            $('#name-error').text('Name is required !')
            return false;
        }
        $('#name-error').hide();
        if ($('#price').val() === '') {
            $('#price-error').show();
            $('#price-error').text('Price is required !')
            return false
        }
        $('#price-error').hide();
        if ($('#sale-price').val() === '') {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale price is required !')
            return false;
        }
        $('#sale-price-error').hide();
        if ($('#link').val() === '') {
            $('#link-error').show();
            $('#link-error').text('Link is required !')
            return false;
        }
        $('#link-error').hide();


        var name = $('#name').val();
        // Check price is a number
        if (!isNumeric($('#price').val())) {
            $('#price-error').show();
            $('#price-error').text('Price must be a number !')
            return false;
        }
        $('#price-error').hide();
        // Check sale price is a number
        if (!isNumeric($('#sale-price').val())) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be a number !')
            return false;
        }
        $('#sale-price-error').hide();

        var price = Number($('#price').val()); // convert string to number
        var salePrice = Number($('#sale-price').val()); // convert string to number
        
        // Check negative value
        if (price < 0) {
            $('#price-error').show();
            $('#price-error').text('Price must be greater than 0 !')
            return false;
        }
        $('#price-error').hide();
        if (salePrice < 0) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be greater than 0 !')
            return false;
        }

        // Check sale price > price
        if (salePrice > price) {
            $('#sale-price-error').show();
            $('#sale-price-error').text('Sale Price must be less than Price !')
            return false;
        }
        $('#sale-price-error').hide();

        // Validate link
        var link = $('#link').val();
        if (!validURL(link)) {
            $('#link-error').show();
            $('#link-error').text('Link is invalid !')
            return false;
        }

        var formatPrice = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}); 
        var formatSalePrice = salePrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

        // Update data to localStorage

        var studyTools = JSON.parse(localStorage.getItem('studyTools')); // old data
        for (let key in studyTools) {
            if (dataId === studyTools[key].idProduct) { // nếu như dataId === idProduct nào đó trong localStorage
                studyTools[key].link = link;
                studyTools[key].name = name;
                studyTools[key].price = price;
                studyTools[key].salePrice = salePrice;
            }
        }

        // Biến mảng dữ liệu thì chuỗi (string), vì localStorage chỉ có thể lữu chuỗi hoặc số
        localStorage.setItem('studyTools', JSON.stringify(studyTools));

        // Update realtime data trên table
        $(`#tr-${dataId} td:nth-child(2)`).html(name); // thay thế name
        $(`#tr-${dataId} td:nth-child(3)`).html(formatPrice); // thay thế price
        $(`#tr-${dataId} td:nth-child(4)`).html(formatSalePrice); // thay thế sale price
        $(`#tr-${dataId} td:nth-child(5)`).html(`<img src='${link}' width='100' />`); // thay thế price

        $('#link').val('');
        $('#name').val('');
        $('#price').val('');
        $('#sale-price').val('');
        $('#addBtn').show();
        $('#updateBtn').hide();
    });
});