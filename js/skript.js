$(document).ready(function(){
    var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    console.log("started");
 $('#wish').on('click', function() {
    var wish = $('#wishInput').val();
    myDataRef.child(wish).set({wish: wish});
    var message1 = '<div id="step">шаг 2 из 4</div><p>Вы загадали</p> </br> <p>чтобы ваше желание исполнилось, укажите:</p> <div id="field1"><p>Зачем?</p><input class="span2" id="reason" type="text" placeholder="причина"><button type="submit" class="btn btn-primary" id="add_reason" >добавить</button>  </div>';
    $('.hero-unit').html(message1);
     console.log("wish");
 });
  $('#add_reason').on('click', function() {
     //var myDataRef = new Firebase('https://iwish.firebaseio.com/wishes/' + wish + ');
  });
    console.log(wish);
});
