let entireHeight = 0;
let scrollY = 0;
let scrollValues = [];
let increasing = false;
let content_areas = document.body.querySelectorAll(".area_block");
let contents = document.body.querySelectorAll(".information_area");
let content_area_height = document.querySelector(".area_block").scrollHeight;
let indicaters = document.querySelectorAll(".indicateUnit");

window.onload = loadAnimation;
const isMobile = detectMobileDevice();

if (isMobile == true) {
    window.onscroll = animationInMoblie;
} else if (isMobile == false) {
    window.onscroll = animation;
}

for (let i = 0; i < 10; i++) {
    indicaters[i].addEventListener("click", function (event) {
        let num = event.target.getAttribute('id');
        window.scrollTo(0, num * content_area_height);
        contents[num].querySelector(".information_title").style.opacity = 0;
        contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
        contents[num].style.opacity = 1;

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
    text_area = contents[num].querySelector('.information_title')

    document.getElementById(`${num}`).classList.add('indicateSelected');

    if (0 <= num && num <= 10) {
        let Range = contents[num].offsetHeight * 0.3;
        let rate = (scrollY - content_areas[num].offsetTop) / Range;
        let currentContentY_start = content_area_height * num
        let currentContentY_end = content_area_height * (num + 1)

        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                text_area.style.opacity = 0;

                contents[num].animate([{ opacity: 0 }, { opacity: rate }], { duration: 1000 });
                contents[num].style.opacity = rate;
            }
            else if (currentContentY_start + (contents[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.6)) {
                rate = ((scrollY - content_areas[num].offsetTop) - (contents[num].offsetHeight * 0.3)) / Range;
                if (rate > 0) {
                    if (isMobile == false) {
                        text_area.style.opacity = 0;

                        contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
                        contents[num].style.opacity = 1;

                        text_area.animate(
                            [{ opacity: 0, transform: `translate(0, 20%)` }, { opacity: rate, transform: `translate(0, ${20 - (rate * 20)}%)` }],
                            { duration: 1000 });
                        text_area.style.opacity = rate;
                        text_area.style.transform = `translate(0, ${20 - (rate * 20)}%)`;
                    }
                    else if (isMobile == true) {
                        text_area.style.opacity = 0;
                        contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
                        contents[num].style.opacity = 1;
                        text_area.classList.add("animation");
                    }
                }
            }
            else if ((currentContentY_start + (contents[num].offsetHeight * 0.6) <= scrollY)) {
                text_area.style.opacity = 0;
                if (isMobile == false) {
                    contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
                    contents[num].style.opacity = 1;

                    text_area.animate(
                        [{ opacity: 0, transform: `translate(0, 20%)` }, { opacity: 1, transform: `translate(0, 0)` }],
                        { duration: 1000 });
                    text_area.style.opacity = 1;
                    text_area.style.transform = "translate(0, 0)";
                }
                else if (isMobile == true) {
                    contents[num].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
                    contents[num].style.opacity = 1;
                    text_area.classList.add("animation");
                }
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
        if (num > 0) {
            if (contents[num - 1].style.opacity == 0) {
                contents[num - 1].style.opacity = 1;
            }
        }
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
        let currentContentY_start = content_area_height * num;
        let currentContentY_end = content_area_height * (num + 1);
        let text_area = contents[num].querySelector('.information_title');
        let rate = (scrollY - content_areas[num].offsetTop) / Range;
        let entireRate = (scrollY - content_areas[num].offsetTop) / content_areas[num].offsetHeight;
        if (rate > 1) {
            rate = 1;
        } else if (rate < 0) {
            rate = 0;
        }
        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                if (0 < rate && rate <= 1) {
                    text_area.style.opacity = 0;
                    if (rate > contents[num].style.opacity) {
                        contents[num].style.opacity = rate;
                    }
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
                    text_area.style.opacity = rate;
                    text_area.style.transform = `translate(0, ${20 - (rate * 20)}%)`;
                }
            } else if (currentContentY_start + (contents[num].offsetHeight * 0.6) <= scrollY) {
                text_area.style.opacity = 1;
                text_area.style.transform = `translate(0, 0)`;
            }
        }
        if (0.7 < entireRate) {
            changingRate = (((scrollY - content_areas[num].offsetTop) - (content_areas[num].offsetHeight * 0.7)) / content_areas[num].offsetHeight * 0.3) * 10
            contents[num + 1].querySelector('.information_title').style.opacity = 0;
            contents[num + 1].style.opacity = changingRate;
        }
    }
    if (scrollY == 0) {
        document.getElementById('0').classList.remove('indicateSelected');
    }
}

function animationInMoblie() {
    scrollY = window.scrollY;
    
    let num = Math.floor(scrollY / content_area_height);
    insertValue(num);

    document.getElementById(`${num}`).classList.add('indicateSelected');
    if (scrollValues.length == 2) {
        if (scrollValues[1] - scrollValues[0] > 0) {
            contents[num - 1].style.opacity = 1;
            document.getElementById(`${num - 1}`).classList.remove('indicateSelected');
        } else if (scrollValues[1] - scrollValues[0] < 0) {
            contents[num + 1].style.opacity = 0;
            contents[num + 1].querySelector('.information_title').classList.remove("animation_fadein");
            contents[num + 1].querySelector('.information_title').classList.add("animation_fadeout");
            document.getElementById(`${num + 1}`).classList.remove('indicateSelected');
        }
    }

    if (0 <= num && num <= 10) {
        let Range = contents[num].offsetHeight * 0.3;
        let currentContentY_start = content_area_height * num;
        let currentContentY_end = content_area_height * (num + 1);
        let text_area = contents[num].querySelector('.information_title');
        let rate = (scrollY - content_areas[num].offsetTop) / Range;
        let entireRate = (scrollY - content_areas[num].offsetTop) / content_areas[num].offsetHeight;
        if (rate > 1) {
            rate = 1;
        } else if (rate < 0) {
            rate = 0;
        }
        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.3)) {
                if (0 < rate && rate <= 1) {
                    text_area.style.opacity = 0;
                    if (num > 0) {
                        if (contents[num].style.opacity < 1) {
                            contents[num].style.opacity += rate;
                        }
                        if (contents[num - 1].style.opacity == 0) {
                            contents[num - 1].style.opacity = 1;
                            contents[num - 1].querySelector('.information_title').classList.add("animation_fadein");
                        }
                    }
                    else if (num == 0) {
                        contents[num].style.opacity = rate;
                    }
                }
            }
            else if (currentContentY_start + (contents[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (contents[num].offsetHeight * 0.6)) {
                if (text_area.classList.contains("animation_fadein") == false) {
                    text_area.classList.remove("animation_fadeout");
                    text_area.classList.add("animation_fadein");
                }
            }
        }
        if (0.7 < entireRate) {
            changingRate = (((scrollY - content_areas[num].offsetTop) - (content_areas[num].offsetHeight * 0.7)) / content_areas[num].offsetHeight * 0.3) * 10
            contents[num + 1].querySelector('.information_title').style.opacity = 0;
            contents[num + 1].style.opacity = changingRate;
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

function detectMobileDevice() {
    const minWidth = 900
    return window.innerWidth < minWidth
}