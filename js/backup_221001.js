let entireHeight = 0;
let scrollY = 0;
let scrollValues = [];
let increasing = false;
let contents = document.body.querySelectorAll(".area_block");
let content_height = document.querySelector(".area_block").scrollHeight;
let topMenu_height = document.querySelector(".top_manu").offsetHeight;

window.onscroll = animation;

function animation() {
    scrollY = window.scrollY;
    insertValue(scrollY);

    if (scrollValues.length == 2) {
        if (scrollValues[1] - scrollValues[0] > 0) {
            increasing = true;
        } else {
            increasing = false;
        }
    }

    let num = Math.floor(scrollY / content_height);
    let visualArea = contents[num].querySelector('.information_area');
    if (0 <= num && num <= 10) {
        let Range = contents[num].offsetHeight * 0.3;
        let rate = (scrollY - contents[num].offsetTop) / Range;
        let currentContentY_start = content_height * num
        let currentContentY_end = content_height * (num + 1)
        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                visualArea.querySelector('.information_title').style.opacity = 0;
                visualArea.style.opacity = rate;
            }
            else if (currentContentY_start + (contents[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.6)) {
                rate = ((scrollY - contents[num].offsetTop)-(contents[num].offsetHeight * 0.3)) / Range;
                if (rate>0){
                    visualArea.querySelector('.information_title').style.opacity = rate;
                }
            }
        }
    }
}

function insertValue(scroll) {
    if (scrollValues.length == 2) {
        scrollValues.shift(scrollValues[0]);
        scrollValues.push(scroll);
    } else {
        scrollValues.push(scroll);
    }
}