$(document).ready(function () {
    var DataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var UserDataRef = new Firebase('https://iwish.firebaseio.com/users');
    var myobject = {
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: ''
    };


//   $scope.articles = sync.$asArray();
//    console.log(snapshot.key());


  DataRef.once("value", function(snapshot) {
  var nameSnapshot = snapshot.child(151);
  var name = nameSnapshot.val();
  // name === { first: "Fred", last: "Flintstone"}
  var firstNameSnapshot = snapshot.child("151/heges");
  var firstName = firstNameSnapshot.val();
  // firstName === "Fred"
  //var lastNameSnapshot = snapshot.child("name").child("last");
 // var lastName = lastNameSnapshot.val();
  // lastName === "Flintstone"
 // var ageSnapshot = snapshot.child("age");
 // var age = ageSnapshot.val();
  // age === null (because there is no "age" child in the data snapshot)
 console.log(name);
 console.log(firstName);
});



 //   DataRef.on("value", function(snapshot) {
 // console.log(snapshot.val());
//}, function (errorObject) {
 // console.log("The read failed: " + errorObject.code);
//});
    /*
DataRef.orderByChild("reasons").equalTo(1).on("child_added", function(snapshot) {
  console.log(snapshot.val());
});

DataRef.orderByValue("wishes").equalTo(1).limitToLast(3).on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});

DataRef.orderByValue("wishes").equalTo(25).on("child_added", function(snapshot) {
  console.log(snapshot.key())
});*/

//    var cooki = $.cookie('userId');
//    console.log(cooki);

    var count = 0;
    var div1 = '<div id="one"><input type="text" id="text1" placeholder="wish"><button type="submit" id="btn1">add wish</button></div>';
    var div2 = '<div id="two"><input type="text" id="text2" placeholder="reason"><button type="submit" id="btn2">add reason</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div3 = '<div id="three"><input type="text" id="text3" placeholder="hedge"><button type="submit" id="btn3">add3</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div4 = '<div id="four"><input type="text" id="text4" placeholder="piece""><button type="submit" id="btn4">add prices</button><button type="submit" id="finish">finish</button></div><div id="list"></div><div id="list2"></div><div id="list3"></div><div id="list4"></div><div id="login"></div>';
    var div5 = '<div id="five"><input type="text" id="nickname" placeholder="nickname"><input type="email" class="form-control" id="email" placeholder="Email address" required autofocus><input type="password" class="form-control" id="pass" placeholder="Password" required> <br><div id=forspin></div><label class="checkbox"><br><input type="checkbox" class="myCheckbox" value="remember-me"> Remember me</label><br><button class="btn btn-lg btn-primary btn-block" id="btnreg">register</button><br><button class="btn btn-lg btn-primary btn-block" id="btnlog">login</button><br></div>';
    var div6 = '<div id="success">Success!</div>';
    var spiner = '<div><i class="fa fa-spinner fa-lg fa-spin"></i></div>';
    var next_div = div1;
    var div_userpage = '<div class="div_userpage"><div id="user_info" class="col-md-12"><div id="avatar" class="col-md-2"><img src="http://lorempixel.com//100/150/people"></div><div id= "userhead" class="col-md-9"><h1>user_name</h1><p>user_info</p><p>user_info</p></div><div id="rank" class="col-md-1"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"></div></div><div id="my_wishes" class="col-md-6"><h1>my_wishes</h1><div id="accordeon" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><span><h3 class="panel-title"><a href="#collapse-1" data-parent="#accordeon" data-toggle="collapse">открыть 1 слайд</a></h3></span></div><div id="collapse-1" class="panel-collapse collapse"><div class="panel-body"><p>1ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-2" data-parent="#accordeon" data-toggle="collapse">открыть 2 слайд</a></h3></div><div id="collapse-2" class="panel-collapse collapse"><div class="panel-body"><p>2ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-3" data-parent="#accordeon" data-toggle="collapse">открыть 3 слайд</a></h3></div><div id="collapse-3" class="panel-collapse collapse"><div class="panel-body"><p>3ыыыыыыыыыыыыыыыы</p></div></div></div></div></div><div class = "wish"><span></div></div><div id="others_wishes" class="col-md-6"><h1>other_wishes</h1><div id="accordeon2" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-4" data-parent="#accordeon2" data-toggle="collapse">открыть 1 слайд</a></h3></div><div id="collapse-4" class="panel-collapse collapse"><div class="panel-body"><p>1ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-5" data-parent="#accordeon2" data-toggle="collapse">открыть 2 слайд</a></h3></div><div id="collapse-5" class="panel-collapse collapse"><div class="panel-body"><p>2ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-6" data-parent="#accordeon2" data-toggle="collapse">открыть 3 слайд</a></h3></div><div id="collapse-6" class="panel-collapse collapse"><div class="panel-body"><p>3ыыыыыыыыыыыыыыыы</p></div></div></div></div></div></div>';
        myobject.addattr = function (tt) {
            count++;
            if (next_div === div1) {
                myobject.attr1 = tt;
                next_div = div2;
                $('#container').html(next_div);
                count = 0;
            } else if (next_div === div2) {
                myobject.attr2 = myobject.attr2 + '"reason' + count + '":"' + tt + '",';
                $('#list').html(myobject.attr2);
            } else if (next_div === div3) {
                myobject.attr3 = myobject.attr3 + '"hedge' + count + '":"' + tt + '",';
                $('#list').html(myobject.attr3);
            } else if (next_div === div4) {
                myobject.attr4 = myobject.attr4 + '"price' + count + '":"' + tt + '",';
                $('#list').html(myobject.attr4);
            } else if (next_div === div5) {
                $('#login').html(div5);
            }
        }

        var createuserpage = function(name, wishes, otherswishes){
        var name = $.cookie('userId', null);

        };



//     записываем в контейнер желан ие
//
//        if ($.cookie('userId') == null){
//            console.log('nokuki');
//            $('#container').html(div1);
//        }
//        else{
//            console.log('yeskuki');
//            $('#container').html(div_userpage);
//        }
          $('#container').html(div1);
    //    функция отправки желания
    $('#container').on('click', '#btn1', function () {
        var text = $('#text1').val();
        myobject.addattr(text);
    });
    //    функция добавления причины
    $('#container').on('click', '#btn2', function () {
        var text = $('#text2').val();
        myobject.addattr(text);
        $('#text2').val('');
    });
    //    функция добавления проблемы
    $('#container').on('click', '#btn3', function () {
        var text = $('#text3').val();
        myobject.addattr(text);
        $('#text3').val('');
    });
    //    функция добавления жертвы
    $('#container').on('click', '#btn4', function () {
        var text = $('#text4').val();
        myobject.addattr(text);
        $('#text4').val('');
    });
    //    функция отправки причины и проблемы и перехода к следующему шагу
    $('#container').on('click', '#next', function () {
        if (next_div === div2) {
            next_div = div3;
            var str = myobject.attr2;
            str = str.substring(0, str.length - 1);
            myobject.attr2 = str;
        } else if (next_div === div3) {
            next_div = div4;
            var str = myobject.attr3;
            str = str.substring(0, str.length - 1);
            myobject.attr3 = str;
        }
        $('#container').html(next_div);
        count = 0;
    });
    //    функция отправки жертвы, ввода информации в базу и перехода к регистрации
    $('#container').on('click', '#finish', function () {
        var usersRef = DataRef.child(myobject.attr1);
        var str = myobject.attr4;
        str = str.substring(0, str.length - 1);
        myobject.attr4 = str;
        console.log(myobject);
        var reasons = '{' + myobject.attr2 + '}';
        var json_reasons = JSON.parse(reasons);
        var hedges = '{' + myobject.attr3 + '}';
        var json_hedges = JSON.parse(hedges);
        var prises = '{' + myobject.attr4 + '}';
        var json_prises = JSON.parse(prises);
        console.log(json_reasons);
        console.log(json_hedges);
        console.log(json_prises);

        var testext = {
            "reasons": json_reasons,
            "heges": json_hedges,
            "prices": json_prises,
        };
        usersRef.set(testext);
        $('#list').html(myobject.attr1);
        $('#list2').html("ваши причины:" + " " + myobject.attr2);
        $('#list3').html("ваши преграды:" + " " + myobject.attr3);
        $('#list4').html("ваши жертвы:" + " " + myobject.attr4);
        if (next_div === div4) {
            next_div = div5;
            console.log("перешли к 5");
            $('#container').html(next_div);
        } else {
            console.log("какая-то ошибка");
        }
        // $('#login').html(div5);
    });
    //    функция регистрации

    $('#container').on('click', '#btnreg', function () {
        $('#forspin').html(spiner);
        console.log("начало регистрации");
        var email = $('#email').val();
        var password = $('#pass').val();
        var name = $('#nickname').val();
        DataRef.createUser({
            email: email,
            password: password
        }, function (error, userData) {
            console.log("email");
            console.log("password");
            $('#forspin').html('');
            if (error) {
                console.log("Error creating user:", error);
            } else {
                var remember = $('.myCheckbox').prop('checked');
                console.log("Successfully created user account with uid:", userData.uid);
                UserDataRef.child(userData.uid).set({name: name});
                if (remember === true){
                    $.cookie('userId', authData.uid);

                    }
                else{};


            }
        });
    });

    //    функция входa
    $("#container").on("click", '#btnlog', function () {
        $('#forspin').html(spiner);
        console.log("попытка входа");
        var email = $('#email').val();
        var password = $('#pass').val();
        DataRef.authWithPassword({
            email: email,
            password: password
        }, function (error, authData) {
            $('#forspin').html('');
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                console.log(authData.uid);
                var remember = $('.myCheckbox').prop('checked');
                console.log(remember);
                    if (remember === true){
                        $.cookie('userId', authData.uid);
                    }
                else{};
            }
        });
    });
     $('#container').on('click', '#delkoocies', function () {
        $.cookie('userId', null);
     });
    $('.navbar').on('click', '#userpage', function () {
        console.log('усерпаге');
        $('#container').html(div_userpage);
    });

    $('.navbar').on('click', '#reset', function () {
        console.log('sbros');
        next_div = div1;
        $.cookie('userId', null);
        $('#container').html(next_div);
    });



});

