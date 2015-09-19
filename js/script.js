$(document).ready(function () {
    //подключаем ветку wishes в firebase
    // var WishRef = new Firebase('https://iwish.firebaseio.com/wishes');
    //todo вычистить все snapshot, они во многих местах переопределяются
    //todo не перезаписывать то, что дает нам firebase при регистрации, а только дополнять соответствующими желаниями
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
    var typeOfUser = '';

    //куки по айди пользователя
    var cookie = $.cookie('userId');
    console.log("Куки по айди пользователя:", cookie);

    //глобальная пустая страница пользователя
    var div_userpage = '';


    //проверка Аноним или Известный
    var anonCheck = new Firebase('https://iwish.firebaseio.com/users/' + cookie + '/provider');

    function readusertype() {
        anonCheck.orderByValue().on("value", function (snapshot) {
            console.log('проверка анонимности', snapshot.val());
            typeOfUser = snapshot.val()
        });
    };

    //третья тестовая кнопка
    $('.navbar').on('click', '#test3', function () {
        readusertype();
    });



    // проба куков анонима
    //если куки нули - то дать анонима, иначе загрузить их (не получается сделать анонима регистрированным...)
    if (cookie === 'null' || typeof cookie === 'undefined') {
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
                myobject.attr1 = tt; //= myobject.attr1 + '"wish' + count + '":"' + tt + '"';
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
        //переход на страницу пользователя
    $('.navbar').on('click', '#userpage', function () {
        createuserpage(cookie);
        //  $('#container').html(div_userpage);
    });

    //тестовая кнопка кукисов
    $('.navbar').on('click', '#testcookie', function () {
        console.log(cookie);

    });

    //тестовая кнопка
    $('.navbar').on('click', '#testbutton', function () {
        UserDataRef.child(cookie).once("value", function (snapshot, authData) {
            var snap = snapshot.val(); //строчка раз
            UserDataRef.child('new_id').set(snap); //строчка два
            UserDataRef.child(snap.uid).remove(); //сточка три
        });
    });

    //вторая тестовая кнопка
    $('.navbar').on('click', '#test2', function () {


        ref.orderByChild("wishes").once("child_added", function (snapshot) {
            // console.log(snapshot.val());

            //  wishes = "1y3y1y";
            console.log(snapshot.val());
            console.log(snapshot.val().wishes);
            var arr = Object.keys(snapshot.val().wishes);

            arr.forEach(function (item, i, arr) {
                console.log(i, item);
                console.log(snapshot.val().wishes);
                console.log(Object.keys(snapshot.val().wishes));
                DataRef = new Firebase('https://iwish.firebaseio.com/' + cookie);
                DataRef.child('wishes').once("value", function (snapshot) {
                    var snap = snapshot.val(); //строчка раз
                    console.log(snap);
                });
            });

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });
    /*

        //третья тестовая кнопка
        $('.navbar').on('click', '#test3', function () {
            console.log('третья кнопка');
            count = 0;
            var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes");
            ref.orderByValue().on("child_added", function (snapshot) {
                count++;
                console.log("wish" + count + " " + snapshot.key());
                qwerty = snapshot.key();
                ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty);
                ref.orderByValue().on("value", function (snapshot) {
                    count = 0;
                    ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/reasons");
                    ref.orderByValue().on("child_added", function (snapshot) {
                        count++;
                        console.log("reason" + count + " " + snapshot.val());
                    });
                    count = 0;
                    ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/heges");
                    ref.orderByValue().on("child_added", function (snapshot) {
                        count++;
                        console.log("hedge" + count + " " + snapshot.val());
                    });
                    count = 0;
                    ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/prices");
                    ref.orderByValue().on("child_added", function (snapshot) {
                        count++;
                        console.log("price" + count + " " + snapshot.val());
                    });
                });
            });
        });

    */

    //загрузка всех желаний пользователя с их иерархией
    function wishLoad() {
        console.log('третья кнопка');
        var wishCount = 0;
        var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes");
        ref.orderByValue().on("child_added", function (snapshot) {
            wishCount++;
            console.log("wish" + wishCount + " " + snapshot.key());
            qwerty = snapshot.key();
            var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty);
            ref.orderByValue().on("value", function (snapshot) {
                var reasonCount = 0;
                var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/reasons");
                ref.orderByValue().on("child_added", function (snapshot) {
                    reasonCount++;
                    console.log("reason" + reasonCount + " " + snapshot.val());
                });
                var hedgesCount = 0;
                var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/heges");
                ref.orderByValue().on("child_added", function (snapshot) {
                    hedgesCount++;
                    console.log("hedge" + hedgesCount + " " + snapshot.val());
                });
                var pricesCount = 0;
                var ref = new Firebase("https://iwish.firebaseio.com/users/" + cookie + "/wishes/" + qwerty + "/prices");
                ref.orderByValue().on("child_added", function (snapshot) {
                    pricesCount++;
                    console.log("price" + pricesCount + " " + snapshot.val());
                });
            });
        });
    };

    //сброс кукисов
    $('.navbar').on('click', '#reset', function () {
        console.log('sbros');
        next_div = div1;
        $.cookie('userId', null);
        $('#container').html(next_div);
        cookie = null;
    });

    //записывваем в контейнер стартовую часть
    onload = function () {
        console.log("начинаем работу c", cookie)
        $('#container').html(div1);
    };

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
        console.log("загружаем объект", myobject);
        wishes = myobject.attr1;
        var reasons = '{' + myobject.attr2 + '}';
        var json_reasons = JSON.parse(reasons);
        var hedges = '{' + myobject.attr3 + '}';
        var json_hedges = JSON.parse(hedges);
        var prises = '{' + myobject.attr4 + '}';
        var json_prises = JSON.parse(prises);

        console.log("загрузили:");
        console.log(wishes);
        console.log(json_reasons);
        console.log(json_hedges);
        console.log(json_prises);
        console.log(wishes);

        WishRef = UserDataRef.child(cookie);
        inWishRef = WishRef.child('wishes');
        inSomeWishRef = inWishRef.child(wishes);

        inSomeWishRef.update({
            "reasons": json_reasons,
            "heges": json_hedges,
            "prices": json_prises,
        });

        if (next_div === div4) {
            next_div = div5;
            console.log("перешли к 5");


            if (typeOfUser === 'anonymus' || typeOfUser === null) {

                $('#container').html(next_div);
            } else {
                createuserpage(cookie);
            };



            //todo протестировать "если пользователь зарегистрирован, не на регистрацию, а сразу на страницу пользователя"

        } else {
            console.log("какая-то ошибка в окончании задания желания");
        }
    });

    //анон вход (не реализован!)
    $('#container').on('click', '#btnanon', function () {});

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
                UserDataRef.child(cookie).once("value", function (snapshot, authData) {
                    var snap = snapshot.val(); //строчка раз
                    UserDataRef.child(userData.uid).set(snap); //строчка два
                    UserDataRef.child(snap.uid).remove(); //сточка три
                    cookie = userData.uid;
                    UserDataRef.child(cookie).update({
                        email: email,
                        name: name,
                        provider: 'user',
                        nick: null,
                        uid: null,
                        expires: null,
                        token: null
                    });
                });
                if (remember === true) {
                    //todo проверка сохранения куков только при чекбоксе Запомнить, иначе не сохранять куки
                    //эти куки заменяют куки анонима, нужно брать от него!!
                    //console.log('проверка перезаписи', cookie);
                    //$.cookie('userId', userData.uid);
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
                //          console.log('проверка перезаписи2', cookie, authData);
                cookie = authData.uid;

                WishRef = UserDataRef.child(cookie);
                WishRef.update({
                    "token": authData.token
                });
                //                console.log('проверка перезаписи3', cookie);
                console.log(authData.uid);
                var remember = $('.myCheckbox').prop('checked');
                console.log(remember);
                if (remember === true) {
                    $.cookie('userId', cookie);
                } else {};
                createuserpage(cookie);

            }
        });
    });

    function createuserpage(id) {

        // todo переопределить переменные и использовать  function wishLoad() для получения данных по желаниям пользователя (желательна проверка!)


        /*
        попытка номер 2
        UserDataRef.child(id).once("value", function (snapshot) {
            var snap = snapshot.val(); //строчка раз
            console.log(snap);
            var qwe = snapshot.child(id + '/wishes/1у3у1у/heges');
            console.log(qwe);
            var heges1 = qwe.val();
            console.log(heges1);
        });

        */

        UserDataRef.once("value", function (snapshot) {
            var idSnapshot = snapshot.child(id);
            //  var myWishes = idSnapshot.child("wishes");
            var outid = idSnapshot.val();
            //       var qwer = idSnapshot.child("wishes/1y3y1y");
            console.log(outid);
            var qwe = snapshot.child(id + '/wishes/1у3у1у/heges');
            console.log(qwe);
            var heges1 = qwe.val();
            console.log(heges1);
            var wish1 = (Object.keys(outid.wishes)); //получение ключей желаний внутри юзера в виде "wish1[1]"
            var x = wish1[2];
            //      var myWishes = idSnapshot.child("wishes/" + wish1);
            //      var myHedges = idSnapshot.child("wishes/" + wish1 + "/heges");
            //      var asdf = myHedges.val();
            //      var wish1 = (Object.keys(myHedges))
            //      console.log(wish1);
            //     console.log(asdf);
            //      console.log(myHedges.heges);
            //      console.log(myWishes);
            var thiswish = outid.wishes;

            console.log(thiswish);
            console.log(wish1);

            var qwe = snapshot.child(id + '/wishes/' + wish1[1] + '/heges');
            var heges1 = qwe.val();
            console.log(heges1);
            var hegess = (Object.keys(heges1));
            console.log(hegess);
            (Object.keys(qwe.val()))

            //var hdgs = thiswish.heges; //пока неверно определена, не работает. продолжить работу с этого места..
            //  console.log(thiswish);
            div_userpage = '<div class="div_userpage"><div id="user_info" class="col-md-12"><div id="avatar" class="col-md-2"><img src="http://lorempixel.com//100/150/people"></div><div id= "userhead" class="col-md-9"><h1>' + outid.name + '</h1><p>user_info</p><p>user_info</p></div><div id="rank" class="col-md-1"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"><img src="http://lorempixel.com/g/50/50/"></div></div><div id="my_wishes" class="col-md-6"><h1>my_wishes</h1><div id="accordeon" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><span><h3 class="panel-title"><a href="#collapse-1" data-parent="#accordeon" data-toggle="collapse">' + wish1[0] + '</a></h3></span></div><div id="collapse-1" class="panel-collapse collapse"><div class="panel-body"><p>' + wish1[0] + '</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-2" data-parent="#accordeon" data-toggle="collapse">' + wish1[1] + '</a></h3></div><div id="collapse-2" class="panel-collapse collapse"><div class="panel-body"><p>' + wish1[1] + '</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-3" data-parent="#accordeon" data-toggle="collapse">' + wish1[2] + '</a></h3></div><div id="collapse-3" class="panel-collapse collapse"><div class="panel-body"><p>' + wish1[1] + '</p></div></div></div></div></div><div class = "wish"><span></div></div><div id="others_wishes" class="col-md-6"><h1>other_wishes</h1><div id="accordeon2" class="panel-group"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-4" data-parent="#accordeon2" data-toggle="collapse">открыть 1 слайд</a></h3></div><div id="collapse-4" class="panel-collapse collapse"><div class="panel-body"><p>1ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-5" data-parent="#accordeon2" data-toggle="collapse">открыть 2 слайд</a></h3></div><div id="collapse-5" class="panel-collapse collapse"><div class="panel-body"><p>2ыыыыыыыыыыыыыыыы</p></div></div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="#collapse-6" data-parent="#accordeon2" data-toggle="collapse">открыть 3 слайд</a></h3></div><div id="collapse-6" class="panel-collapse collapse"><div class="panel-body"><p>3ыыыыыыыыыыыыыыыы</p></div></div></div></div></div></div>';
            $('#container').html(div_userpage);
        });
    };


    //удаление кукисов
    $('#container').on('click', '#delkoocies', function () {
        $.cookie('userId', null);
    });
});
