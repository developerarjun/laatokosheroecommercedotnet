function addCartItem(pId = null)
{
    if(pId == null){
        var reqData = {
            "foodNote": $('#modelItemInstruction').val(),
            "productId": parseInt($('#modelItemId').val()),
            "quantity": parseInt($('#qtyVal').val())
        };
        $('#modelItemInstruction').val('');
    }else{
        var reqData = {
            "productId": pId,
            "quantityDelta": 1,
        };
    }
    udpateCartItem(reqData)
};

function deleteCartItem(cartItemId)
{
    udpateCartItem(cartItemId, 'delete');
}

function cartQtyUpdate(pId, type)
{
    var tempQty =  parseInt($('.pro-qty-'+pId).val());
    if(type == 0){
        if(tempQty != 1 && tempQty > 0){
            tempQty = tempQty - 1;
        }
    }else{
        if(tempQty < 50){
            tempQty = tempQty + 1;
        }
    }
    var reqData = {
        "productId": parseInt(pId),
        "quantity": tempQty
    };
    udpateCartItem(reqData)
}

function udpateCartItem(reqData, type = 'post')
{
    $('.show-amount').hide();
    $('.show-loading').show();
    $('.checkout-status').addClass("disabled");

    if(type == 'post'){
        url = "/cart-item";
        type = 'POST';
    }else{
        url = "/cart-item" + '/' + reqData;
        type = 'DELETE';
    }
    $.ajax
    ({
        url: url,
        type: type,
        data: reqData,
        // headers: {'X-CSRF-TOKEN': "{{ csrf_token() }}"},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response)
        {
            // console.log(response);
            $('#foodNameModal').modal('hide')
            if(Object.keys(response).length != 0){
                $('.cartListUL').empty();
                $('.cartListSummary').empty();
                if(response.cartItems.length > 0){
                    $('.cartPanelBox').show();
                    $('.cartEmptyBox').hide();

                    $.each(response.cartItems, function( i, val ) {
                        // console.log( i + ": " + val );
                        var sNote = '';
                        if(val.Note != '' && val.Note != 'null' && val.Note != null){
                            sNote = val.Note;
                        }
                        var liData = '<li>'+
                            '<div class="slt-upper">'+
                            '<h5>'+ val.ProductName +'<span class="s-note">'+sNote+'</span></h5>'+
                            '<p>Rs. '+ val.ActualRate +'</p>'+
                            '</div>'+
                            '<div class="slt-lower">'+
                                '<button type="button" class="btn btn-plain btn-edit checkout-status" data-bs-toggle="modal" data-bs-target="#foodNameModal" data-bs-id="'+ val.ProductId +'" data-bs-name="'+ val.ProductName +'" data-bs-price="'+ val.ActualRate +'" data-bs-image="' + val.ImageUrl + '" data-bs-sNote="' + val.Note +'"><i class="far fa-edit"></i></button>'+
                                '<div class="slt-num">'+
                                    '<button type="button" class="btn btn-plain btn-cart-num checkout-status" onclick="javascript:cartQtyUpdate('+ val.ProductId +', 0);"><i class="fas fa-minus" aria-hidden="true"></i></button>'+
                                    '<input type="number" class="pro-qty-'+ val.ProductId +'" value="'+ val.Quantity +'">'+
                                    '<button type="button" class="btn btn-plain btn-cart-num checkout-status" onclick="javascript:cartQtyUpdate('+ val.ProductId +', 1);"><i class="fas fa-plus" aria-hidden="true"></i></button>'+
                                '</div>'+
                                '<button type="button" class="btn btn-plain btn-del checkout-status" onclick="javascript:deleteCartItem('+ val.CartItemId + ')"><i class="far fa-trash-alt"></i></button>'+
                            '</div>'+
                        '</li>';
                        $('.cartListUL').append(liData);

                        var liData = '<li>'+
                            '<div class="slt-upper">'+
                            '<h5>'+ val.ProductName +'<span class="ms-3"><small class="me-2">X</small>'+ val.Quantity +'</span><span class="s-note">'+sNote+'</span></h5>'+
                            '<p>Rs. '+ (val.ActualRate * val.Quantity).toFixed(2) +'</p>'+
                            '</div>'+
                        '</li>';
                        $('.cartListSummary').append(liData);
                    });
                }else{
                    $('.cartPanelBox').hide();
                    $('.cartEmptyBox').show();
                }

                $('.subTotalId').text(response.cartBillDetails.Subtotal.toFixed(2));
                $('.scId').text(response.cartBillDetails.SCAmount.toFixed(2));
                $('.vatId').text(response.cartBillDetails.VatAmount.toFixed(2));
                $('.grandTotalId').html('<strong>Rs. ' + response.cartBillDetails.GrandTotal.toFixed(2) + '</strong>');
                $('.mobile-total').html('<strong>Total = Rs. ' + response.cartBillDetails.GrandTotal.toFixed(2) + '</strong>');
                $('.payAbleTotalId').html('<strong>Rs. ' + response.cartBillDetails.GrandTotal.toFixed(2) + '</strong>');
                $('#cartNo').text('('+response.cartItems.length+')');

                $('.show-loading').hide();
                $('.show-amount').show();
                $('.checkout-status').removeClass('disabled');
                $('.cart-notempty').show();

                activeUrl = window.location.href;
                checkRoute = activeUrl.split('/');
                if(checkRoute[checkRoute.length - 1] == 'checkout-process'){
                    location.reload();
                }

                $.toast({
                    heading: 'success',
                    text: `Cart Updated.`,
                    showHideTransition: 'plain',
                    icon: 'success',
                    position: 'top-right',
                });
            }else{
                $('.cart-notempty').hide();
                $.toast({
                    heading: 'Warning',
                    text: `Error in Cart.`,
                    showHideTransition: 'plain',
                    icon: 'info',
                    position: 'top-right',
                });
            }
        },
        error: function(response)
        {
            // console.log(response);
            $('.show-loading').hide();
            $('.show-amount').show();
            $('.checkout-status').removeClass('disabled');
        }
    });

    
}

var myModalEl = document.getElementById('foodNameModal')
myModalEl.addEventListener('show.bs.modal', function (event) {

    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var pName = button.getAttribute('data-bs-name')
    var pPrice = button.getAttribute('data-bs-price')
    var pId = button.getAttribute('data-bs-id')
    var pImage = button.getAttribute('data-bs-image')
    var sNote = button.getAttribute('data-bs-sNote')
    var pQty = 1;
    var totalCost = pPrice;

    // Update the modal's content.
    var modelId = myModalEl.querySelector('#modelItemId')
    var modelCartItemId = myModalEl.querySelector('#modelCartItemId')
    var modalTitle = myModalEl.querySelector('#modelItemName')
    var modalPrice = myModalEl.querySelector('#modelItemPrice')
    var modelQuantity = myModalEl.querySelector('#qtyVal')
    var modelTotalCost = myModalEl.querySelector('#modelTotalCost')
    var modelItemImage = myModalEl.querySelector('#modelItemImage')
    var modelItemInstruction = myModalEl.querySelector('#modelItemInstruction')
    var addtoCart = myModalEl.querySelector('#cartAddBtn')

    modelId.value = pId
    modelCartItemId.value = ''
    modalTitle.textContent = pName
    modalPrice.textContent = 'Rs. ' + pPrice
    if(pImage){
        modelItemImage.src = pImage
    }else{
        modelItemImage.src = 'assets/images/home-banner-1.jpg'
    }
    modelItemInstruction.value = sNote

    $.ajax
    ({
        url: '/cart/product' + '/' + pId,
        type: 'get',
        // async: false,
        success: function(response)
        {
            // console.log(response);
            var cartBtnName = 'Add To Cart'
            if(Object.keys(response).length != 0){
                pQty = response.Quantity
                totalCost = parseFloat(parseInt(pQty) * parseFloat(pPrice)).toFixed(2)
                cartBtnName = 'Update Cart'
            }
            modelQuantity.value = pQty
            modelTotalCost.textContent = 'Rs. ' + totalCost
            addtoCart.textContent = cartBtnName
        },
        error: function(response)
        {
            // console.log(response);
        }
    });
})

$('#qtyMinus').click(function(){    
    var preQty = parseInt($('#qtyVal').val());
    var pPrice = $('#modelItemPrice').text();
    pPrice = parseFloat(pPrice.replace('Rs. ', '')).toFixed(2);;
    if(preQty == 1){
        $('#qtyMinus').attr('disabled', true);
        $('#qtyVal').val(1);
        $('#modelTotalCost').text('Rs. ' + pPrice);
    }else if(preQty <= 50){
        $('#qtyMinus').attr('disabled', false);
        $('#qtyPlus').attr('disabled', false);
        $('#qtyVal').val(preQty - 1);
        $('#modelTotalCost').text('Rs. ' + parseFloat(pPrice * (preQty - 1)).toFixed(2));
    }
});

$('#qtyPlus').click(function(){
    var preQty = parseInt($('#qtyVal').val());
    var pPrice = $('#modelItemPrice').text();
    pPrice = parseFloat(pPrice.replace('Rs. ', '')).toFixed(2);;

    if(preQty == 1){
        $('#qtyVal').val(preQty + 1);
        $('#qtyMinus').attr('disabled', false);
        $('#modelTotalCost').text('Rs. ' + parseFloat(pPrice * (preQty + 1)).toFixed(2));
    }else if(preQty < 50){
        $('#qtyVal').val(preQty + 1);
        $('#modelTotalCost').text('Rs. ' + parseFloat(pPrice * (preQty + 1)).toFixed(2));
        $('#qtyPlus').attr('disabled', false);
    }else{
        $('#qtyPlus').attr('disabled', true);
    }
});
