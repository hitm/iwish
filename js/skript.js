$(document).ready(function(){
    var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var online = 0;
    var my_wish = "";
    var step = 1;
    var div_wish = '<h1>Привет!</h1> <p>Пришло время загадать своё первое желание!</p><input type="text" id="wishInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="wish" >Захотеть &raquo;</button>';
    var btn_id = "";
    var btn_add = '<button type="submit" class="btn btn-primary" id="' + btn_id + '" >добавить</button>';
    var div_reason = '<p>Ваше желание:</p>' + my_wish + '<p>Для его исполнения, вам нужно указать, для чего вам это нужно.</p>;
    var div_price = '';
    var div_hedge = '';
        if(online === 0){
            var step = 1;
            var div_step = '<div id="step">шаг ' + step + ' из 4</div>';
            $('.hero-unit').html(div_step + div_wish);
        }
     $('#wish').on('click', function() {
        my_wish = $('#wishInput').val();
        myDataRef.child(my_wish).set({wish: my_wish});
        var message1 = '''</br> <p>чтобы ваше желание исполнилось, укажите:</p> <div id="field1"><p>Зачем?</p><input class="span2" id="reason" type="text" placeholder="причина"><button type="submit" class="btn btn-primary" id="add_reason" >добавить</button>  </div>';
    $('.hero-unit').html(message1);
     console.log("wish");
     });
    $('#add_reason').on('click', function() {
        console.log("mywish");
        //var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes/' + wish + ');
    });
});
