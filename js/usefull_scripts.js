//  пробы алертов при отсутствии анонимов
// если аноним зашел, надо привязать куки к нему,  а не создавать новые. если зашел человек, не должны создаваться новые анонимы

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





//      показ введенных данных желания
$('#list').html(myobject.attr1);
$('#list2').html("ваши причины:" + " " + myobject.attr2);
$('#list3').html("ваши преграды:" + " " + myobject.attr3);
$('#list4').html("ваши жертвы:" + " " + myobject.attr4);



//перевод в строку
var path = sampleChatRef.toString();






    function getParent(snapshot) {
  // You can get the reference (A Firebase object) from a snapshot
  // using .ref().
  var ref = snapshot.ref();
  // Now simply find the parent and return the name.
  return ref.parent().name();
}

var testRef = new Firebase("https://iwish.firebaseio.com/users/"+cookie);
testRef.once("value", function(snapshot) {
  // Should alert "Name of the parent: foo".
  alert("Name of the parent: " + getParent(snapshot));
});




//проверка имени при создании нового пользователя
    function go() {
  var username = prompt('Username?', '');
  var userData = { name: username };
  tryCreateUser(username, userData);
}

var users_location = 'https://iwish.firebaseio.com';

function userCreated(username, success) {
  if (!success) {
    alert('user ' + username + ' already exists!');
    go();
  } else {
    alert('Successfully created ' + username);
  }
}

// Tries to set /users/<username> to the specified data, but only
// if there's no data there already.
function tryCreateUser(username, userData) {
  var usersRef = new Firebase(users_location+'/newusers');
  usersRef.child(username).transaction(function(currentUserData) {
    if (currentUserData === null)
      return userData;
  }, function(error, committed) {
    userCreated(username, committed);
  });
}
    go();














  //    backup регистрация
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
