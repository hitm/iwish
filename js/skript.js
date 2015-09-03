$(document).ready(function(){
    var wishDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var reasonDataRef = new Firebase('https://iwish.firebaseio.com/reasons');
    var online = 0;
    var my_wish = "";
    var my_reason= "";
    var my_hedge= "";
    var my_price= "";

    var div_wish = '<div><h1>Привет!</h1> <p>Пришло время загадать своё первое желание!</p><input type="text" id="wishInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="wish" >Захотеть &raquo;</button></div>';
    var div_reason = '<div><h1>причина</h1><input type="text" id="reasonInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="reason" >Захотеть &raquo;</button></div>';
    var div_hedge = '<div><h1>преграда</h1><input type="text" id="hedgeInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="hedge" >Захотеть &raquo;</button></div>';
    var div_price = '<div><h1>жертва</h1><input type="text" id="priceInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="price" >Захотеть &raquo;</button></div>';
    var div_online = '<div><p>Вы онлайн</p></div>'


    if(online === 0){
        var div_step = '<div>шаг 1 из 4</div>';
            $('.hero-unit').html(div_step + div_reason);
        }
    else{

    $('.hero-unit').html(div_online);
    };

     $('#wish').on('click', function wishFunction(){
        my_wish = $('#wishInput').val();
        wishDataRef.child(my_wish).set({wish: my_wish});
        var div_step = '<div>шаг 2 из 4</div>';
        $('.hero-unit').html(div_step + div_reason);
        console.log("wish");
     });


     $('#reason').on('click', function reasonFunction() {
        my_reason = $('#reasonInput').val();
        reasonDataRef.child(my_reason).set({reason: my_reason});
        var div_step = '<div>шаг 3 из 4</div>';
        $('.hero-unit').html(div_step + div_hedge);
        console.log("hedge");
     });












    /*

     $('#add_reason').on('click', function() {
        reason = $('#reasonInput').val();
        myDataRef.child(my_wish).set({wish: my_wish});
        var div_step = '<div id="step">шаг 3 из 4</div>';
        $('.hero-unit').html(div_step + div_hedge);
        console.log("hedge");
        //var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes/' + wish + ');
     });




     $('#add_hedge').on('click', function() {
        hedge = $('#hedgeInput').val();
        myDataRef.child(reason).set({reason: reason});
        var div_step = '<div id="step">шаг 3 из 4</div>';
        $('.hero-unit').html(div_step + div_hedge);
        console.log("hedge");
        //var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes/' + wish + ');
     });
    */
         /*    var btn_id = "";
        var btn_add = '<button type="submit" class="btn btn-primary" id="add" >добавить</button>';*/



});
