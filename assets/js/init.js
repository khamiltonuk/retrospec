(function(){

    'use strict';
    var username = "",
        retroMembers = [],
        $panels = $('.panel'),
        $overlay = $('.overlay');


    var socket = io();

    //getting the username
    $('#capture-username').on('submit', function(e){
        username = $('#m').val().trim();
        //exsistingUser = retroMembers[username].length;
        if (username !== "" ){//} && exsistingUser !== -1){
            closeOverlay();
            init();
        }else{
            $(this).addClass('error');
            $('.error-messsage').removeClass('hidden').attr('aria-hidden', 'false');
        }

        e.preventDefault();
    });

    var init = function(){
        renderUsername();
    };

    var renderUsername = function(){
        $('.username span').text(username);
    }

    //Retroboard
    var matchPanelHeight = function(){
        $panels.height('auto');
        maxHeight = 0;
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
