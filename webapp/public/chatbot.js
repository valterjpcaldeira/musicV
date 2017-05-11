$(function () {

    var socket = io();
    var myMsg = "";
    var auth = WeDeploy.auth('auth.musicv.wedeploy.io');  

    var currentUser = auth.currentUser;

    $('#chatbot-send').on('click', function(event){
        //socket.emit('chat message', $('#chatbot-input').val());
        //$('#chatbot-input').val('');
        return false;
    });
    socket.on('people connected', function(num){
      $('#onlinePeolple').attr("data-badge", num);
    });

    $('#chatbot-trigger').on('click', function(event){
        event.preventDefault();
        var $chatbot = $('#chatbot');

        if($chatbot.hasClass('open')){
            $('#chatbot-trigger').find("i").removeClass("crossIcon");
            $('#chatbot-trigger').find("i").addClass("chatIcon");
            $('#chatbot-trigger').removeClass("chatOpen");
            $('#chatbot-trigger').addClass("chatClosed");
            $chatbot.stop().fadeOut(function(){
                $(this).removeClass('open');
                $(".message-block").remove();
            });
        } else {
            $('#chatbot-trigger').find("i").addClass("crossIcon");
            $('#chatbot-trigger').find("i").removeClass("chatIcon");
            $('#chatbot-trigger').addClass("chatOpen");
            $('#chatbot-trigger').removeClass("chatClosed");
            $chatbot.stop().fadeIn(function(){
                $(this).addClass('open');
                /*$('#chatbot .message-waiting').stop().fadeIn(); 
                setTimeout(function(){ 
                    printMessage('Olá! Eu sou o Assistente Virtual do MusicV.'); 
                    $('#chatbot .message-waiting').stop().fadeIn();
                    setTimeout(function(){  printMessage('Se precisar de alguma ajuda, escreva o que precisa. Para uma ajuda mais eficaz, coloque as questões individualmente.'); },2000);
                },1000);*/
            });
        }
    });

    socket.on('chat message', function(msg){
        if(msg.text !== myMsg){
           printMessage(msg);  
        }
    });

    function send(event){
        event.preventDefault();



        var wrapper = $('#chatbot .chat-wrapper');
        var val = $('#chatbot-input').val();
        var chat = $('#chatbot .chat');
        var html = '<div class="message-block"><p class="message in"><span>' + val + '</span></p></div>';

        var d = new Date();
        myMsg = val;
        var message = new Object();
        message.text = val;
        message.time = d.getHours() + ":"+ d.getMinutes();
        message.auth = currentUser.name;
        socket.emit('chat message', message);



        if(wrapper.height() > wrapper.parent().height()){
            chat.scrollTop(wrapper.outerHeight()-wrapper.parent().outerHeight() );
        }

        $('#chatbot-input').val('').focus();

        $(html).insertBefore($('#chatbot .chat-wrapper .message-waiting'));
        var element = $(".chat");
        element[0].scrollTop = element[0].scrollHeight;

        //sendResponse(val);
    }

    $("#chatbot-input").keypress(function(e) {
        if(e.which == 13) {
            send(e);
        }
    });

    $('#chatbot-send').on('click', function(event){
        send(event);
    });

    function printMessage(mensagem){
        $('#chatbot .message-waiting').stop().hide();

        var html = '<div class="message-block"><p class="message out"><span>' + mensagem.text + '</span><span>' + mensagem.time + '</span><span>' + mensagem.auth + '</span></p></div>';
        $(html).insertBefore($('#chatbot .chat-wrapper .message-waiting'));

    }



  });

