(function(){

    'use strict';
    var username = "",
        retroMembers = [],
        $panels = $('.panel'),
        $overlay = $('.overlay'),
        uniqueId = 0,
        bankForm = '<li class="draft" draggable="true"><form id="blankItem" >' +
        '<input type="text" name="item" value="test"/>' +
        '<button type="submit" class="submit">Submit</button>' +
        //'<button class="edit hidden" aria-hidden="true">Edit</button>' +
        '<button class="delete hidden" aria-hidden="true" >delete</button>' +
        '</form></li>';


    var socket = io();

    //getting the username
    $('#capture-username').on('submit', function(e){
        e.preventDefault();
        username = $('#m').val().trim();
        //exsistingUser = retroMembers[username].length;
        if (username !== "" ){//} && exsistingUser !== -1){
            closeOverlay();
            init();
        }else{
            $(this).addClass('error');
            $('.error-messsage').removeClass('hidden').attr('aria-hidden', 'false');
        }


    });
    $('#m').on('focus', function(){
        $(this).siblings('label').addClass('active-input');
        $(this).attr('placeholder','')
    });
    $('#m').on('blur', function(){
        $(this).siblings('label').removeClass('active-input');
        $(this).attr('placeholder','username')
    })


    var init = function(){
        renderUsername();
        insertDraft();


        $('#retro-board').on('blur','.panel input', blurInput );
        $('#retro-board').on('keyup', 'input', activeItem );
    };

    var blurInput = function(e){
        inputValue = $(this).val();
        if(inputValue === ""){
            $(this).parent().parent().remove();
        }
    };

    var activeItem = function(){
        $(this).parent().parent().removeClass('draft');
        insertDraft();
    };

    var insertDraft = function(){
        $panels.each(function(){
            uniqueId += 1;
            var draftCount = $(this).find('ul > li.draft').length;
            if(draftCount < 1){
                $(this).find('ul').append($(bankForm).attr('id', "item-"+ uniqueId ));
            }
        });
        matchPanelHeight();
    };

    var renderUsername = function(){
        $('.username span').text(username);
    };

    //Retroboard
    var matchPanelHeight = function(){
        var maxHeight = 0;
        $panels.height('auto');
        $panels.each(function(){
            if ($(this).outerHeight() > maxHeight){
                maxHeight = $(this).outerHeight();
            }
        });
        $panels.height(maxHeight);
    };

    //Utills
    var openOverlay = function(){
        $overlay.removeClass('hidden').attr('aria-hidden', 'true');
    };

    var closeOverlay = function(){
        $overlay.addClass('hidden').attr('aria-hidden', 'false');
    };

})();
