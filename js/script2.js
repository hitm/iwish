$(document).ready(function(){
    var DataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var myobject = {attr1:'', attr2:'', attr3:'', attr4:''};
    var count = 0;
    var div1 = '<div id="one"><input type="text" id="text1" placeholder="wish"><button type="submit" id="btn1">add wish</button></div>';
    var div2 = '<div id="two"><input type="text" id="text2" placeholder="reason"><button type="submit" id="btn2">add reason</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div3 = '<div id="three"><input type="text" id="text3" placeholder="hedge"><button type="submit" id="btn3">add3</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div4 = '<div id="four"><input type="text" id="text4" placeholder="piece""><button type="submit" id="btn4">add prices</button><button type="submit" id="finish">finish</button></div><div id="list"></div><div id="list2"></div><div id="list3"></div><div id="list4"></div>';
    var next_div = div1;
    myobject.addattr = function(tt) {
       var localcount = count + 1;
       count = localcount;
   	       if (next_div === div1){
           myobject.attr1 = tt;
           next_div = div2;
           $('#container').html(next_div);
       	   count = 0;
       }
       else if (next_div === div2){
       		myobject.attr2 = myobject.attr2 + '"reason' + count + '":"' + tt + '",';
            $('#list').html(myobject.attr2);
       }
       else if (next_div === div3){
       		myobject.attr3 = myobject.attr3 + '"hedge' + count + '":"' + tt + '",';
            $('#list').html(myobject.attr3);
       }
       else if (next_div === div4){
       		myobject.attr4 = myobject.attr4 + '"price' + count + '":"' + tt + '",';
            $('#list').html(myobject.attr4);
       }

	   }
    $('#container').html(div1);

    $('#container').on('click', '#btn1', function(){
       var text = $('#text1').val();
       myobject.addattr(text);

    });
    $('#container').on('click', '#btn2', function(){
       var text = $('#text2').val();
       myobject.addattr(text);
       $('#text2').val('');
    });
    $('#container').on('click', '#btn3', function(){
       var text = $('#text3').val();
       myobject.addattr(text);
       $('#text3').val('');
    });
    $('#container').on('click', '#btn4', function(){
       var text = $('#text4').val();
       myobject.addattr(text);
       $('#text4').val('');
    });
    $('#container').on('click', '#next', function(){
       if(next_div === div2){
           next_div = div3;
       var str = myobject.attr2;
	   str = str.substring(0,str.length - 1 );
       myobject.attr2 = str;
       }
       else if(next_div === div3){
           next_div = div4;
           var str = myobject.attr3;
	       str = str.substring(0,str.length - 1 );
           myobject.attr3 = str;
       }
       $('#container').html(next_div);
       count = 0;
       });

       $('#container').on('click', '#finish', function(){
      	  var usersRef = DataRef.child(myobject.attr1);
          var str = myobject.attr4;
	      str = str.substring(0,str.length - 1 );
          myobject.attr4 = str;
          console.log(myobject);
          var reasons = '{' + myobject.attr4  + '}';
          console.log(reasons);
          var json_string = JSON.parse( reasons );
          console.log(json_string);
          var testext = {"heges" : json_string,"prices" : {"price1" : "pricetext","price2" : "price2text"},"reasons": {"reason1" : "reasontext","reason2" : "reason2text"}};
           usersRef.set(testext);
        $('#list').html(myobject.attr1);
        $('#list2').html("ваши причины:" + " " + myobject.attr2);
         $('#list3').html("ваши преграды:" + " " + myobject.attr3);
            $('#list4').html("ваши жертвы:" + " " + myobject.attr4);
   	   });

});
