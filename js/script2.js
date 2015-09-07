$(document).ready(function(){
    var DataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var myobject = {attr2:'', attr3:'', attr4:''};
    var mywish = '';

    var count = 0;
    var div1 = '<div id="one"><input type="text" id="text1" placeholder="wish"><button type="submit" id="btn1">add wish</button></div>';
    var div2 = '<div id="two"><input type="text" id="text2" placeholder="reason"><button type="submit" id="btn2">add reason</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div3 = '<div id="three"><input type="text" id="text3" placeholder="hedge"><button type="submit" id="btnhedges">add3</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div4 = '<div id="four"><input type="text" id="text4" placeholder="piece""><button type="submit" id="btn4">add prices</button><button type="submit" id="finish">finish</button></div><div id="list"></div>';
    var next_div = div1;
    myobject.addattr = function(tt) {
       var localcount = count + 1;
       count = localcount;
       var comma = '';
   	       if (next_div === div1){
           mywish = tt;
           next_div = div2;
           $('#container').html(next_div);
       	   count = 0;
       }
       else if (next_div === div2){
            if(count > 1){
           	comma = '",';
          	}
            else{
            comma = '"';
            }
       		myobject.attr2 = myobject.attr2 + '"reason' + count + '":"' + tt + comma;
            $('#list').html(myobject.attr2);
       }
       else if (next_div === div3){
            if(count > 1){
           	comma = '",';
          	}
            else{
            comma = '"';
            }
       		myobject.attr3 = myobject.attr3 + '"hedge' + count + '":"' + tt + comma;
            $('#list').html(myobject.attr3);
       }
       else if (next_div === div4){
            if(count > 1){
           	comma = '",';
          	}
            else{
            comma = '"';
            }
       		myobject.attr4 = myobject.attr4 + '"price' + count + '":"' + tt + comma;
            $('#list').html(myobject.attr4);
       }

	   }
    $('#container').html(div1);

    $('#container').on('click', '#btn1', function(){
       var text = $('#text1').val();
       myobject.addattr(text);
       $('#btn1').remove();
       $('#text1').remove();
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
           myobject.attr2.slice(0, -1);
       }
       else if(next_div === div3){
           next_div = div4;
           myobject.attr3.slice(0, -1);
       }
       $('#container').html(next_div);
       count = 0;
       });

       $('#container').on('click', '#finish', function(){
      	  var usersRef = DataRef.child(mywish);
          myobject.attr4.slice(0, -1);
          console.log(myobject);
          var testext = {"heges" : {"hege1" : "hege1text","hege2" : "hege2text"},"prices" : {"price1" : "pricetext","price2" : "price2text"},"reasons": {"reason1" : "reasontext","reason2" : "reason2text"}};
          usersRef.set(testext);
   	   });

});
