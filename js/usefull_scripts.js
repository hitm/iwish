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
