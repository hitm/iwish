$(document).ready(function () {
    var DataRef = new Firebase('https://iwish.firebaseio.com/wishes');
    var myobject = {
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: ''
    };
    var count = 0;
    var div1 = '<div id="one"><input type="text" id="text1" placeholder="wish"><button type="submit" id="btn1">add wish</button></div>';
    var div2 = '<div id="two"><input type="text" id="text2" placeholder="reason"><button type="submit" id="btn2">add reason</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div3 = '<div id="three"><input type="text" id="text3" placeholder="hedge"><button type="submit" id="btn3">add3</button><button type="submit" id="next">next</button></div><div id="list"></div>';
    var div4 = '<div id="four"><input type="text" id="text4" placeholder="piece""><button type="submit" id="btn4">add prices</button><button type="submit" id="finish">finish</button></div><div id="list"></div><div id="list2"></div><div id="list3"></div><div id="list4"></div><div id="login"></div>';
    var div5 = '<div id="five"><input type="email" class="form-control" id="email" placeholder="Email address" required autofocus><input type="password" class="form-control" id="pass" placeholder="Password" required> <br><div id=forspin></div><label class="checkbox"><br><input type="checkbox" class="myCheckbox" value="remember-me"> Remember me</label><br><button class="btn btn-lg btn-primary btn-block" id="btnreg">register</button><br><button class="btn btn-lg btn-primary btn-block" id="btnlog">login</button><br></div>';
    var div6 = '<div id="success">Success!</div>';
    var spiner = '<div><i class="fa fa-spinner fa-lg fa-spin"></i></div>';

    var next_div = div1;
    myobject.addattr = function (tt) {
            var localcount = count + 1;
            count = localcount;
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
        //    записываем в контейнер желание
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
                console.log("Successfully created user account with uid:", userData.uid);
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
                //$.cookie(
            }
        });
    });
});

