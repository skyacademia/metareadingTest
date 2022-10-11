var entireHeight = document.body.scrollHeight;
var components = document.getElementsByClassName('content_area');

var changingPointer1 = document.querySelector('.top_container');
var changingPointer2 = document.querySelector('.content_area');
var changingPointer3 = document.getElementsByClassName('.content_area')[1];

var startPoint1 = (changingPointer1.scrollHeight / 2) + changingPointer1.offsetTop;
var endPoint1 = (changingPointer1.scrollHeight * 0.7) + changingPointer1.offsetTop;

var startPoint2 = (changingPointer2.scrollHeight / 2) + changingPointer2.offsetTop;
var endPoint2 = (changingPointer2.scrollHeight * 0.7) + changingPointer2.offsetTop;

var startPoint3 = (changingPointer1.scrollHeight / 2) + changingPointer1.offsetTop;
var endPoint3 = (changingPointer1.scrollHeight / 2) + changingPointer1.offsetTop;


var infoObject = {
    1 : {
        pointer : changingPointer1,
        start : startPoint1,
        end : endPoint1,
        component : components[0],
    },
    2:{
        pointer : changingPointer2,
        start : startPoint2,
        end : endPoint2,
        component : components[1],
    },
    3:{
        pointer : changingPointer3,
        start : startPoint3,
        end : endPoint3,
        component : components[2],
    },
}

var changingComponent = document.querySelector('.content_area');
document.onscroll = animation(1);

function animation(i) {
    var objectinfo = infoObject[i];
    var scrollY = window.scrollY;
    if (scrollY < objectinfo['start']){
        if (objectinfo['components']?.classList.contains('appear') == false) {
            objectinfo['components']?.classList.add('appear');
        }
        objectinfo[components].classList.add('disappear');
    }
    else if (objectinfo['start']<=scrollY<objectinfo['end']) {
        if (objectinfo['components']?.classList.contains('disappear') == true) {
            objectinfo['components']?.classList.remove('disappear');
            objectinfo['components']?.offsetWidth;
        }
        objectinfo['components']?.classList.add('appear');
    }
}