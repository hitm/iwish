$(document).ready(function () {
    //подключаем ветку wishes в firebase
    var DataRef = new Firebase('https://iwish.firebaseio.com');
    //подключаем ветку users в firebase
    var UserDataRef = new Firebase('https://iwish.firebaseio.com/users');
    //подключаем ветку анонимных users в firebase
    var ref = new Firebase('https://iwish.firebaseio.com/users');
    var myobject = {
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: ''
    };
    /*
    пробы алертов при отсутствии анонимов

    если аноним зашел, надо привязать куки к нему,  ане создавать новые. если зашел человек, не должны создаваться новые анонимы

            if (typeof authData === "undefined") {
                alert("анонимус не определен")
            } else {
                alert("анонимус определен")
            };

     if (typeof userId === "undefined") {
                alert("айдишник не определен")
            } else {
                alert("айдишник определен")
            };

    */

    //куки по айди пользователя
    var cookie = $.cookie('userId');
    console.log("Куки по айди пользователя:", cookie);

    //глобальная пустая страница пользователя
    var div_userpage = '';

    //   $scope.articles = sync.$asArray();
    //    console.log(snapshot.key());
    /*
    console.log(authData.uid);
    console.log($.cookie('userId'));
            if ($.cookie('userId') === 'null') {
                */




    // проба куков анонима
    //если куки нули - то дать анонима, иначе загрузить их (не получается сделать анонима регистрированным...)



    if (cookie === 'null' || typeof cookie === undefined) {
        console.log('пустые куки');
        remember: "sessionOnly";
        ref.authAnonymously(function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                authData.nick = 'Guest';
                authData.auth = null;
                ref.child(authData.uid).set(authData);
                console.log("смотрим содержимое объекта authData:", authData);
                console.log("смотрим содержимое authData.uid:", authData.uid);
            }
            $.cookie('userId', authData.uid);
            cookie = $.cookie('userId');
        });
    } else {
        console.log('есть куки', $.cookie('userId'));
        console.log(cookie);
    };





    /*  проба куков анонима
        ref.authAnonymously(function (error, authData) {
            //   if (typeof cookie === "undefined") {
            if (cookie === 'null') {
                console.log('куки не назначены', authData, cookie);
                remember: "sessionOnly"
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    ref.set(authData);
                    cookie = authData;
                    console.log(authData.uid);
                    console.log(authData);
                    console.log(cookie);
                }
            } else {
                console.log(cookie);
                console.log('есть куки', $.cookie('userId'));
                console.log($.cookie('userId'));
                console.log('Куки есть:', cookie, $.cookie('userId'));
            }
        });*/



    /*
            } else {
                console.log('Куки есть:', cookie, $.cookie('userId'));
            };

    */

    /*


          DataRef.on("value", function(snapshot) {
        console.log(snapshot.val());
       }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
       });

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
    });
    */

    var count = 0;
    var div1 = '<div id="one"><input type="text" id="text1" placeholder="wish"><button type="submit" id="btn1">add wish</button></div>';
    var div2 = '<div id="two"><input type="text" id="text2" placeholder="reason"><button type="submit" id="btn2">add reason</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div3 = '<div id="three"><input type="text" id="text3" placeholder="hedge"><button type="submit" id="btn3">add3</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div4 = '<div id="four"><input type="text" id="text4" placeholder="piece""><button type="submit" id="btn4">add prices</button><button type="submit" id="finish">finish</button></div><div id="list"></div><div id="list2"></div><div id="list3"></div><div id="list4"></div><div id="login"></div>';
    var div5 = '<div id="five"><input type="text" id="nickname" placeholder="nickname"><input type="email" class="form-control" id="email" placeholder="Email address" required autofocus><input type="password" class="form-control" id="pass" placeholder="Password" required> <br><div id=forspin></div><label class="checkbox"><br><input type="checkbox" class="myCheckbox" value="remember-me"> Remember me</label><br><button class="btn btn-lg btn-primary btn-block" id="btnreg">register</button><br><button class="btn btn-lg btn-primary btn-block" id="btnlog">login</button><br><button class="btn btn-lg btn-primary btn-block" id="btnanon">enter without registration</button></div>';
    var div6 = '<div id="success">Success!</div>';
    var spiner = '<div><i class="fa fa-spinner fa-lg fa-spin"></i></div>';
    var next_div = div1;

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


    var createuserpage = function (id) {
        UserDataRef.once("value", function (snapshot) {
            var idSnapshot = snapshot.child(id);
            var outid = idSnapshot.val();
            console.log(outid);
            div_userpage = '<div class="div_userpage"><div id="user_info" class="col-md-12"><div id="avatar" class="col-md-2"><img src="http://lorempixel.com//100/150/people"></div><div id= "userhead" class="col-md-9"><h1>' + outid.name + '</h1><p>user_info</p><p>user_info</p></div><div id="rank" class="col-md-1"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"></div></div><div id="my_wishes" class="col-md-6"><h1>my_wishes</h1><div id="accordeon" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><span><h3 class="panel-title"><a href="#collapse-1" data-parent="#accordeon" data-toggle="collapse">открыть 1 слайд</a></h3></span></div><div id="collapse-1" class="panel-collapse collapse"><div class="panel-body"><p>1ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-2" data-parent="#accordeon" data-toggle="collapse">открыть 2 слайд</a></h3></div><div id="collapse-2" class="panel-collapse collapse"><div class="panel-body"><p>2ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-3" data-parent="#accordeon" data-toggle="collapse">открыть 3 слайд</a></h3></div><div id="collapse-3" class="panel-collapse collapse"><div class="panel-body"><p>3ыыыыыыыыыыыыыыыы</p></div></div></div></div></div><div class = "wish"><span></div></div><div id="others_wishes" class="col-md-6"><h1>other_wishes</h1><div id="accordeon2" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-4" data-parent="#accordeon2" data-toggle="collapse">открыть 1 слайд</a></h3></div><div id="collapse-4" class="panel-collapse collapse"><div class="panel-body"><p>1ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-5" data-parent="#accordeon2" data-toggle="collapse">открыть 2 слайд</a></h3></div><div id="collapse-5" class="panel-collapse collapse"><div class="panel-body"><p>2ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-6" data-parent="#accordeon2" data-toggle="collapse">открыть 3 слайд</a></h3></div><div id="collapse-6" class="panel-collapse collapse"><div class="panel-body"><p>3ыыыыыыыыыыыыыыыы</p></div></div></div></div></div></div>';
            $('#container').html(div_userpage);
        });
    };

    //тестовая кнопка кукисов
    $('.navbar').on('click', '#testcookie', function () {
        console.log(cookie);

    });

    //тестовая кнопка
    $('.navbar').on('click', '#testbutton', function () {
       var Ref = new Firebase('https://iwish.firebaseio.com/users/');
       Ref.child(cookie).once("value", function (snapshot, authData) {
       var snap =  snapshot.val();//строчка раз
       Ref.child('new_id').set(snap)//строчка два
       Ref.child(snap.uid).remove();//сточка три
       });


    });

    //вторая тестовая кнопка
    $('.navbar').on('click', '#test2', function () {
        console.log('тестируем вторую кнопку');
        //при нажатии устанавливаем новое содержание старого пользователя
        var Ref = new Firebase('https://iwish.firebaseio.com/users/');
        Ref.child(cookie).once("value", function (snapshot, authData) {
            console.log('все о пользователе', snapshot.val());
      //      authData = 'test';
            json_reasons = '123';
            json_hedges = '456';
            json_prises = '789';
            var testext = {
                "reasons": json_reasons,
                "heges": json_hedges,
                "prices": json_prises,
                "uid": 'фыва',
                "name":'олдж',

            };
            var newuid =
                 {
                   cookie: 'йцукен',
                 };
            Ref.child(cookie).update(testext);
            Ref.update(newuid);
            console.log();
        });
    });

    //переход на страницу пользователя
    $('.navbar').on('click', '#userpage', function () {
         createuserpage(cookie);
        $('#container').html(div_userpage);
    });

    //сброс кукисов
    $('.navbar').on('click', '#reset', function () {
        console.log('sbros');
        next_div = div1;
        $.cookie('userId', null);
        $('#container').html(next_div);
        cookie = null;
    });

    //записывваем в контейнер стартовую часть
    $('#container').html(div1);

    //    добавление желания
    $('#container').on('click', '#btn1', function () {
        var text = $('#text1').val();
        myobject.addattr(text);
    });

    //    добавление причины
    $('#container').on('click', '#btn2', function () {
        var text = $('#text2').val();
        myobject.addattr(text);
        $('#text2').val('');
    });

    //    добавление проблемы
    $('#container').on('click', '#btn3', function () {
        var text = $('#text3').val();
        myobject.addattr(text);
        $('#text3').val('');
    });

    //    добавление жертвы
    $('#container').on('click', '#btn4', function () {
        var text = $('#text4').val();
        myobject.addattr(text);
        $('#text4').val('');
    });

    //    переход к следующему шагу с обрезкой последней запятой
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

    //    отправка жертвы, ввод информации в базу и переход к регистрации
    $('#container').on('click', '#finish', function () {

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
        // usersRef.set(testext);
        // userRef.set(testext);
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
    });

    //анон вход
    $('#container').on('click', '#btnanon', function () {


    });
    //    регистрация
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
                UserDataRef.child(userData.uid).set({
                    name: name
                });
                if (remember === true) {

                    //эти куки заменяют куки анонима, нужно брать от него!!
                    console.log('проверка перезаписи', cookie);
                    $.cookie('userId', userData.uid);
                } else {};
            }
        });
    });

    //    вход
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
                console.log('проверка перезаписи2', cookie);
                cookie = authData.uid;
                console.log('проверка перезаписи3', cookie);
                console.log(authData.uid);
                var remember = $('.myCheckbox').prop('checked');
                console.log(remember);
                if (remember === true) {
                    $.cookie('userId', cookie);
                } else {};
            }
        });
    });

    //удаление кукисов
    $('#container').on('click', '#delkoocies', function () {
        $.cookie('userId', null);
    });



    //пример вывода случайной цитаты
    function sluchaynaya_citata() {
        // Массив, который содержит цитаты-строки:
        var citati = [
    '123',
    'йцу',
    'фыв',
    'ячс'
  ];
        // Генерация случайного номера для выборки из массива citati:
        var nomer = Math.round(Math.random() * (citati.length - 1));
        // Возвращаем строку:
        return citati[nomer];
    }
    document.getElementById("random_citata").innerHTML = sluchaynaya_citata();
});
