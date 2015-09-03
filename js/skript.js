$(document).ready(function(){

    var wishDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var online = 0;
    var my_wish = "";
    var my_reason= "";
    var my_hedge= "";
    var my_price= "";
    var step=1;


    console.log("qqq");
$("#chmyDiv1").click(function () {
  var div_online = '<div id="online_div"><p>Вы онлайн</p><button type="submit" class="btn btn-primary" id="chmyDiv2">поменять</button></div>';
       $('.hero-unit').html(div_online);
       step=step+1;
    console.log(step);

     });

if(step===1){
    $("#chmyDiv2").click(function () {
        var div_wish = '<div id="wish_div"><h1>Привет!</h1> <p>Пришло время загадать своё первое желание!</p><input type="text" id="wishInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="toreason" >Захотеть &raquo;</button></div>';
        $('.hero-unit').html(div_wish);
        step=step+1;
        console.log(step);
    });
}

    if(step===2){
       $("#toreason").click(function () {
           var div_reason = '<div><h1>причина</h1><input type="text" id="reasonInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="tohedge" >Захотеть &raquo;</button></div>';
           $('.hero-unit').html(div_reason);
           step=step+1;
           console.log(step);
       });
    }

        if(step===3){
            $("#tohedge").click(function () {
                var div_hedge = '<div><h1>преграда</h1><input type="text" id="hedgeInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="toprice" >Захотеть &raquo;</button></div>';
                $('.hero-unit').html(div_reason);
                step=step+1;
                console.log(step);
            });
        }
        else{
           $("#toprice").click(function () {
               var div_price = '<div><h1>жертва</h1><input type="text" id="priceInput" placeholder="я хочу"><button type="submit" class="btn btn-primary" id="nextPage" >Захотеть &raquo;</button></div>';
               $('.hero-unit').html(div_reason);
               console.log("t");
               step=step+1;
            });
        }
});

       // $(this).replaceWith('<div id="price"><h1>жертва</h1><button type="submit" class="btn btn-primary">Захотеть</button></div>');


  /*
    $('chmyDiv1').on('click', function (){
       // my_wish = $('#wishInput').val();
       // wishDataRef.child(my_wish).set({wish: my_wish});
       // var div_step = '<div>шаг 2 из 4</div>';
       // $('.hero-unit').html(div_step + div_reason);
        $('.hero-unit').html(div_online);
        console.log("wish");
        return false
     });

    if(chmyDiv1!=0){

        console.log("!=0");

    }
    else{
         console.log("=0");

    }

       console.log("next step");









   console.log("asd");


 //   $('.hero-unit').html(div_price);



   /* $("#myDiv1").click(function () {
        $(this).replaceWith('<div id="price"><h1>жертва</h1><button type="submit" class="btn btn-primary">Захотеть</button></div>');
    });

    $("#price").click(function () {
        $(this).replaceWith('<div id="hedge"><h1>преграда</h1><button type="submit" class="btn btn-primary">Захотеть</button></div>');
    });


//$('#init').on('click',function () {

  // Заменяем параграф в #myDiv1 новым параграфом
 // $('#myDiv1>p').replaceWith( "<p>Новый параграф с текстомqwe</p>" );

 // });
*/



/*
 $('#wish').on('click', function wishFunction(){
        my_wish = $('#wishInput').val();
        wishDataRef.child(my_wish).set({wish: my_wish});
        var div_step = '<div>шаг 2 из 4</div>';
        $('.hero-unit').html(div_step + div_reason);
        console.log("wish");
     });

   /*
    if(online === 0){
        var div_step = '<div>шаг 1 из 4</div>';
            $('.hero-unit').html(div_step + div_wish);
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
        return false
     });

/*
     $('#reason').on('click', function reasonFunction() {
        my_reason = $('#reasonInput').val();
        reasonDataRef.child(my_reason).set({reason: my_reason});
        var div_step = '<div>шаг 3 из 4</div>';
        $('.hero-unit').html(div_step + div_hedge);
        console.log("hedge");
        return false
     });







*/




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




