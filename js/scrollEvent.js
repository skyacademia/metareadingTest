let entireHeight = 0;
let scrollY = 0;
let scrollValues = [];
let increasing = false;
let content_areas = document.body.querySelectorAll(".area_block");
let contents = document.body.querySelectorAll(".information_area");
let content_area_height = document.querySelector(".area_block").scrollHeight;
let topMenu_height = document.querySelector(".top_manu").offsetHeight;
let indicaters = document.querySelectorAll(".indicateUnit");
window.onscroll = animation;
window.onload = loadAnimation;
for (let i = 0; i < 10; i++) {
    indicaters[i].addEventListener("click", function (event) {
        let num = event.target.getAttribute('id');
        window.scrollTo(0, num * content_area_height);
        for (let j = 0; j < 10; j++) {
            if (j != i) {
                indicaters[j].classList.remove('indicateSelected');
            }
        }
    });
}

function loadAnimation() {
    scrollY = window.scrollY;

    let num = Math.floor(scrollY / content_area_height);
    insertValue(num);

    document.getElementById(`${num}`).classList.add('indicateSelected');

    if (0 <= num && num <= 10) {
        let Range = contents[num].offsetHeight * 0.3;
        let rate = (scrollY - content_areas[num].offsetTop) / Range;
        let currentContentY_start = content_area_height * num
        let currentContentY_end = content_area_height * (num + 1)

        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                contents[num].querySelector('.information_title').style.opacity = 0;

                contents[num].animate([{ opacity: 0 }, { opacity: rate }], { duration: 1000 });
                contents[num].style.opacity = rate;
            }
            else if (currentContentY_start + (contents[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.6)) {
                rate = ((scrollY - content_areas[num].offsetTop) - (contents[num].offsetHeight * 0.3)) / Range;
                if (rate > 0) {
                    contents[num].querySelector('.information_title').style.opacity = 0;

                    contents[num].animate([{ opacity: 0 }, { opacity: rate }], { duration: 1000 });
                    contents[num].style.opacity = rate;

                    contents[num].querySelector('.information_title').animate(
                        [{ opacity: 0, transform: `translate(0, 20%)` }, { opacity: rate, transform: `translate(0, ${20 - (rate * 20)}%)` }],
                        { duration: 1000 });
                    contents[num].querySelector('.information_title').style.opacity = rate;
                    contents[num].querySelector('.information_title').style.transform = `translate(0, ${20 - (rate * 20)}%)`;
                }
            }
            else if ((currentContentY_start + (contents[num].offsetHeight * 0.6) <= scrollY)) {
                contents[num].querySelector('.information_title').style.opacity = 0;

                contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
                contents[num].style.opacity = 1;

                contents[num].querySelector('.information_title').animate(
                    [{ opacity: 0, transform: `translate(0, 20%)` }, { opacity: 1, transform: `translate(0, 0)` }],
                    { duration: 1000 });
                contents[num].querySelector('.information_title').style.opacity = 1;
                contents[num].querySelector('.information_title').style.transform = "translate(0, 0)";
            }
        }
    }
}


function animation() {
    scrollY = window.scrollY;

    let num = Math.floor(scrollY / content_area_height);
    insertValue(num);

    document.getElementById(`${num}`).classList.add('indicateSelected');
    if (scrollValues.length == 2) {
        if (scrollValues[1] - scrollValues[0] > 0) {
            contents[num - 1].style.opacity = 1;
            contents[num - 1].querySelector('.information_title').style.opacity = 1;
            contents[num - 1].querySelector('.information_title').style.transform = 'translate(0,0)'
            document.getElementById(`${num - 1}`).classList.remove('indicateSelected');
        } else if (scrollValues[1] - scrollValues[0] < 0) {
            contents[num + 1].style.opacity = 0;
            contents[num + 1].querySelector('.information_title').style.opacity = 0;
            contents[num + 1].querySelector('.information_title').style.transform = 'translate(0,20%)'
            document.getElementById(`${num + 1}`).classList.remove('indicateSelected');
        }
    }

    if (0 <= num && num <= 10) {
        let Range = contents[num].offsetHeight * 0.3;
        let rate = (scrollY - content_areas[num].offsetTop) / Range;
        let currentContentY_start = content_area_height * num;
        let currentContentY_end = content_area_height * (num + 1);
        if (rate > 1) {
            rate = 1;
        } else if (rate < 0) {
            rate = 0;
        }
        console.log("배경:" + rate);
        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                if (0 < rate && rate <= 1) {
                    contents[num].querySelector('.information_title').style.opacity = 0;
                    contents[num].style.opacity = rate;
                }
            }
            else if (currentContentY_start + (contents[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.6)) {
                contents[num].style.opacity = rate;
                rate = ((scrollY - content_areas[num].offsetTop) - (contents[num].offsetHeight * 0.3)) / Range;
                if (rate > 1) {
                    rate = 1;
                } else if (rate < 0) {
                    rate = 0;
                }
                if (0 < rate && rate <= 1) {
                    console.log("텍스트:" + rate);
                    contents[num].querySelector('.information_title').style.opacity = rate;
                    contents[num].querySelector('.information_title').style.transform = `translate(0, ${20 - (rate * 20)}%)`;
                }
            } else if (currentContentY_start + (contents[num].offsetHeight * 0.6) <= scrollY) {
                contents[num].querySelector('.information_title').style.opacity = 1;
                contents[num].querySelector('.information_title').style.transform = `translate(0, 0)`;
            }
        }
    }
    if (scrollY == 0) {
        document.getElementById('0').classList.remove('indicateSelected');
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