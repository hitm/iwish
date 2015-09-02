$(document).ready(function(){
    var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var online = 0;
    var my_wish = "";
    var step = 1;
    var div_wish = '<div id="wish_div"><h1>Привет!</h1> <p>Пришло время загадать своё первое желание!</p><input type="text" id="wishInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="wish" >Захотеть &raquo;</button></div>';
    var btn_id = "";
    var btn_add = '<button type="submit" class="btn btn-primary" id="add" >добавить</button>';
    var div_reason = '<div id="reasons_div"><p>Ваше желание:</p>' + my_wish + '<p>Для его исполнения, вам нужно указать, для чего вам это нужно.</p><input class="span2" id="reason" type="text" placeholder="причина"><button type="submit" class="btn btn-primary" id="add_reason" >добавить</button></div>';
    var div_price = '';
    var div_hedge = '';
        if(online === 0){
            var div_step = '<div id="step">шаг 1 из 4</div>';
            $('.hero-unit').html(div_step + div_wish);
        }
     $('#wish').on('click', function() {
        my_wish = $('#wishInput').val();
        myDataRef.child(my_wish).set({wish: my_wish});

        $('.hero-unit').html();
        console.log("wish");
     });
     $('#add_reason').on('click', function() {
        console.log("mywish");
        //var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes/' + wish + ');
     });
});
