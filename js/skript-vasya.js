$(document).ready(function(){
    var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var online = 0;
    var my_wish = "";
    var div_wish = '<div id="wish_div"><h1>Привет!</h1> <p>Пришло время загадать своё первое желание!</p><input type="text" id="wishInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="wish" >Захотеть &raquo;</button></div>';
    var btn_id = "";
    var btn_add = '<button type="submit" class="btn btn-primary" id="add" >добавить</button>';
    var div_reason = '<div id="reasons_div"><p>Ваше желание:</p>' + my_wish + '<p>Для его исполнения, вам нужно указать, для чего вам это нужно.</p><input class="span2" id="reasonInput" type="text" placeholder="причина"><button type="submit" class="btn btn-primary" id="add_reason" >добавить</button></div><button type="submit" class="btn btn-primary" id="step_4" >добавить</button></div>';
    var div_price = '<div><h1>жертва</h1><input type="text" id="priceInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="toprice" >Захотеть &raquo;</button></div>';
    var div_hedge = '';
        if(online === 0){
            reason_started = false;
            var div_step = '<div id="step">шаг 1 из 4</div>';
            $('.hero-unit').html(div_step + div_wish);
             console.log("step1");
        }
     $('.container').on('click', '#wish', function(){
        my_wish = $('#wishInput').val();
        myDataRef.child(my_wish).set({wish: my_wish});
        var div_step = '<div id="step">шаг 2 из 4</div>';
        $('.hero-unit').html(div_step + div_reason);
        console.log("step2");
     });
     $('.container').on('click', '#add_reason', function(){
        console.log("step3");
        if (reason_started = false){
            var wishRef = new Firebase('https://iwish.firebaseio.com/wishes');
            my_reason = $('#reasonInput').val();
            wishRef.child(my_wish + '/reasons').set({reason: my_reason});
           //reason_started = true;
            $('#reasonInput').val('');
        }
        else{
            var wishRef = new Firebase('https://iwish.firebaseio.com/wishes');
            my_reason = $('#reasonInput').val();
            wishRef.child(my_wish + '/reasons').set({reason: my_reason});
        }

         console.log(my_reason);
        //var div_step = '<div id="step">шаг 3 из 4</div>';
        //$('.hero-unit').html(div_step + div_price);
     });
     $('.container').on('click', '#add_reason', function(){
        console.log("step4");
        var wishRef = new Firebase('https://iwish.firebaseio.com/wishes/');
        my_price = $('#priceInput').val();
        wishRef.child(my_price).set({price: my_price});
         var div_step = '<div id="step">шаг 3 из 4</div>';
        $('.hero-unit').html(div_step + div_price);
     });

});
