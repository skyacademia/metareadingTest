let entireHeight = 0;
let scrollY = 0;
let scrollY_values = [];
let increasing = false;
let content_areas = document.body.querySelectorAll(".information_area");
let page_areas = document.body.querySelectorAll(".area_block");
let page_area_hight = document.querySelector(".area_block").scrollHeight; // 페이지별 높이
let indicaters = document.querySelectorAll(".indicateUnit");

// 마지막 페이지 카드 리스트 동작을 위한 변수들
let prev_btn = document.querySelector('#prev_btn');
let next_btn = document.querySelector('#next_btn');
let list_container = document.querySelector('.container');
let btn_count = 0; // 카드 리스트 카운트 용
let brunch_length = document.querySelectorAll('.brunch').length;

// 마지막 페이지 카드 리스트 드래그 동작을 위한 변수들
let slide = document.body.querySelector(".list_viewer");
let startPoint = 0;
let endPoint = 0;


window.onload = loadAnimation;

const isMobile = detectMobileDevice();

if (isMobile == false) {
    window.onscroll = animation;

} else if (isMobile == true) {
    window.onscroll = animation;
    settingSlide();
}
next_btn.addEventListener("click", nextSlide)
prev_btn.addEventListener("click", prevSlide)

settingIndicater(); // 인디케이터 선택시 해당페이지로 이동하기 위한 기능 설정


function settingIndicater() {
    let i = 0
    for (i = 0; i < 10; i++) {
        indicaters[i].addEventListener("click", indicaterFunction);
    }

    function indicaterFunction(event) {
        let num = event.target.getAttribute('id');
        window.scrollTo(0, num * page_area_hight);
        content_areas[num].querySelector(".information_title").style.opacity = 0;
        animateBackground(pageNum=num,opacityRate=1);
        if (scrollY_values.length == 2) {
            if (findScrollDirection() > 0) {
                for (let j = 0; j < i; j++) {
                    content_areas[j].style.opacity = 1;
                    content_areas[j].querySelector('.information_title').style.opacity = 1;
                    content_areas[j].querySelector('.information_title').style.transform = 'translate(0,0)';
                }
            } else if (findScrollDirection() < 0) {
                for (let j = 9; j > i; j--) {
                    content_areas[j].style.opacity = 0;
                    content_areas[j].querySelector('.information_title').style.opacity = 0;
                    content_areas[j].querySelector('.information_title').style.transform = 'translate(0,20%)';
                }
            }
        }
        for (let j = 0; j < 10; j++) {
            if (j != i) {
                indicaters[j].classList.remove('indicateSelected');
            } else {
                indicaters[j].classList.add('indicateSelected');
            }
        }
    }
}

function settingSlide() {
    slide.addEventListener("touchstart", startSlide);
    slide.addEventListener("touchend", endSlide);

    function endSlide(event) {
        endPoint = event.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
        if (startPoint < endPoint) {
            // 오른쪽으로 스와이프 된 경우(이전)
            if (btn_count > 0) {
                prevSlide();
            }
        } else if (startPoint > endPoint) {
            // 왼쪽으로 스와이프 된 경우(다음)
            if (btn_count < brunch_length - 1) {
                nextSlide();
            }
        }
    };
    function startSlide(e) {
        startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
    }
}



function loadAnimation() {
    scrollY = window.scrollY;
    let num = Math.floor(scrollY / page_area_hight);
    insertValue(num);

    let text_area = content_areas[num].querySelector('.information_title');

    // 인디케이터 설정
    removeAllIndicaters();
    setIndicater(num);

    if (0 <= num && num <= 10) {
        let Range = content_areas[num].offsetHeight * 0.3;
        let rate = (scrollY - page_areas[num].offsetTop) / Range;
        let currentContentY_start = page_area_hight * num
        let currentContentY_end = page_area_hight * (num + 1)

        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (content_areas[num].offsetHeight * 0.3)) {
                text_area.style.opacity = 0;
                animateBackground(pageNum = num, opacityRate = rate);
            }
            else if (currentContentY_start + (content_areas[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (content_areas[num].offsetHeight * 0.6)) {
                rate = ((scrollY - page_areas[num].offsetTop) - (content_areas[num].offsetHeight * 0.3)) / Range;
                text_area.style.opacity = 0;
                if (rate > 0) {
                    if (isMobile == false) {
                        animateBackground(pageNum = num, opacityRate = 1);
                        animateText(rate = rate);
                    }
                    else if (isMobile == true) {
                        animateBackground(pageNum = num, opacityRate = 1);
                        animateText();
                    }
                }
            }
            else if ((currentContentY_start + (content_areas[num].offsetHeight * 0.6) <= scrollY)) {
                text_area.style.opacity = 0;
                if (isMobile == false) {
                    let changingRate = (((scrollY - page_areas[num].offsetTop) - (page_areas[num].offsetHeight * 0.7)) / page_areas[num].offsetHeight * 0.3) * 10
                    animateBackground(pageNum = num, opacityRate = 1);
                    animateText(rate = 1);
                    if (num + 1 < 10) {
                        animateBackground(pageNum = num + 1, opacityRate = changingRate);
                    }
                }
                else if (isMobile == true) {
                    animateBackground(pageNum = num, opacityRate = 1);
                    animateText();
                }
            }
        }

    }

   
    function animateText(rate = null) {
        if (isMobile == false) {
            text_area.animate(
                [{ opacity: 0, transform: `translate(0, 20%)` }, { opacity: rate, transform: `translate(0, ${20 - (rate * 20)}%)` }],
                { duration: 1000 });
            text_area.style.opacity = rate;
            text_area.style.transform = `translate(0, ${20 - (rate * 20)}%)`;
        }
        else if (isMobile == true) {
            if (text_area.classList.contains("animation_fadein") == false) {
                text_area.classList.remove("animation_fadeout");
                text_area.classList.add("animation_fadein");
            }
        }
    }
}

function animation() {
    // 비율을 계산하기 위한 세팅
    scrollY = window.scrollY; // 스크롤시 위치 y값

    let num = Math.floor(scrollY / page_area_hight); // 현재 페이지 확인
    insertValue(num);

    // 인디케이터 설정
    removeAllIndicaters();
    setIndicater(num);

    turnOffNextPage(num); // 다음 페이지가 보이지 않도록 세팅

    if (0 <= num && num <= 10) {
        let Range = content_areas[num].offsetHeight * 0.3; // 실제 보여지는 페이지 범위(30%)에 해당하는 길이
        let currentContentY_start = page_area_hight * num; // 페이지(동작을 위한 영역 포함) 시작지점
        let currentContentY_end = page_area_hight * (num + 1); // 페이지(동작을 위한 영역 포함) 끝지점
        let text_area = content_areas[num].querySelector('.information_title'); // 실체 컨텐츠 영역
        let rate = (scrollY - page_areas[num].offsetTop) / Range; // Range에 대해 어디까지 왔는지에 대한 비율((현재 스크롤위치 - 현재페이지의 시작위치)/range)
        let entireRate = (scrollY - page_areas[num].offsetTop) / page_areas[num].offsetHeight; // 페이지 높이에 대해 어디까지 왔는지에 대한 비율
        if (rate > 1) {
            rate = 1; // 현재 위치가 range에 해당하는 길이보다 더 길면 1로 설정
        } else if (rate < 0) {
            rate = 0; // 현재 위치가 range에 해당하는 길이에 오지 않으면 0으로 설정
        }
        // 스크롤 위치가 페이지 범위 내에 있으면 진행
        if (currentContentY_start <= scrollY && scrollY < currentContentY_end) {
            // 스크롤 위치가 페이지 30% 범위 내에 있으면 진행
            if (currentContentY_start <= scrollY && scrollY < currentContentY_start + (content_areas[num].offsetHeight * 0.3)) {
                if (0 <= rate && rate <= 1) {
                    text_area.style.opacity = 0;
                    // rate가 현재 페이지배경 투명도보다 크면 해당 rate으로 투명도를 설정한다(목적 : rate에 맞게 투명도 설정하기 위해)
                    if (rate > content_areas[num].style.opacity) {
                        content_areas[num].style.opacity = rate;
                    }
                }
            }
            // 스크롤 위치가 페이지 30% 이상 60% 범위 내에 있으면 텍스트 애니메이션 진행
            else if (currentContentY_start + (content_areas[num].offsetHeight * 0.3) <= scrollY && scrollY < currentContentY_start + (content_areas[num].offsetHeight * 0.6)) {
                content_areas[num].style.opacity = rate; // 페이지 배경화면의 투명도를 rate로 설정(1로 고정)

                if (isMobile == false) {
                    /* 
                텍스트 애니메이션을 위한 rate 재설정((현재 스크롤위치 - 현재페이지의 시작위치)-현재 페이지에서 30%의 지점) / range)
                = 스크롤 위치가 현재 페이지의 30% 지점을 기점으로 어느 비율까지 왔는지 계산
                */
                    rate = ((scrollY - page_areas[num].offsetTop) - (content_areas[num].offsetHeight * 0.3)) / Range;
                    if (rate > 1) {
                        rate = 1;
                    } else if (rate < 0) {
                        rate = 0;
                    }
                    if (0 < rate && rate <= 1) {
                        text_area.style.opacity = rate; // 텍스트가 보이도록 투명도 조절
                        text_area.style.transform = `translate(0, ${20 - (rate * 20)}%)`; // 움직이며 나타나도록 텍스트 translate 비율 조절
                    }
                }
                else if (isMobile == true) {
                    if (text_area.classList.contains("animation_fadein") == false) {
                        text_area.classList.remove("animation_fadeout");
                        text_area.classList.add("animation_fadein");
                    }
                }
            }
            // 스크롤 위치가 페이지의 60% 지점 이상이면 텍스트 애니메이션 종료 및 고정
            else if (currentContentY_start + (content_areas[num].offsetHeight * 0.6) <= scrollY) {
                content_areas[num].style.opacity = 1;
                if (isMobile == false) {
                    text_area.style.opacity = 1;
                    text_area.style.transform = `translate(0, 0)`;
                }
                else if (isMobile == true) {
                    if (text_area.classList.contains("animation_fadein") == false) {
                        text_area.classList.remove("animation_fadeout");
                        text_area.classList.add("animation_fadein");
                    }
                }
            }
        }
        // 스크롤 위치가 페이지의 70% 이상이면 다음 페이지의 배경화면이 미리 나타도록 다음 페이지의 배경화면 투명도를 조절
        if (0.7 < entireRate) {
            /*
            배경화면 투명도를 조절 위한 changingRate 설정((현재 스크롤위치 - 현재페이지의 시작위치)-현재 페이지에서 70%의 지점) / range)) 
            스크롤 위치가 현재 페이지의 70% 지점을 기점으로 어느 비율까지 왔는지 계산
            */
            changingRate = (((scrollY - page_areas[num].offsetTop) - (page_areas[num].offsetHeight * 0.7)) / page_areas[num].offsetHeight * 0.3) * 10 // 빠른 변화를 위해 10배속
            // 다음 페이지의 배경화면 투명도 조절
            content_areas[num + 1].querySelector('.information_title').style.opacity = 0;
            content_areas[num + 1].style.opacity = changingRate;
        }
    }
    // 페이지가 맨 위에 있으면 인디케이터 선택이 안되도록 함
    if (scrollY == 0) {
        document.getElementById('0').classList.remove('indicateSelected');
    }
}

// 목적 : 인디케이터에 의한 이동 후 스크롤 올렸을 때 다음 페이지가 보이지 않기 위한 기능
function turnOffNextPage(num) {
    if (scrollY_values.length == 2) {
        // 스크롤을 이동 시 다음 페이지를 안 보이도록 초기화(배경이 어두워지고, 애니메이션은 시작지점으로 이동)
        if (num + 1 < page_areas.length) { // 다음페이지가 존재하고
            if (content_areas[num + 1].style.opacity > 0) { // 다음페이지가 보인다면 다음페이지를 가림
                if (isMobile == false) {
                    turnOff(page = num + 1, opacity = 0, translate = 20);
                }
                else if (isMobile == true) {
                    turnOff(page = num + 1);
                }
                // 마지막페이지의 리스트 세팅을 초기화
                if (btn_count > 0 || list_container.style.transform != `translate(0%)`) {
                    btn_count = 0;
                    list_container.style.transform = `translate(0%)`;
                }
            }
        }
    }

    function turnOff(page, opacity = null, translate = null) {
        if (content_areas[page].style.opacity >= 0) {
            if (isMobile == false) {
                content_areas[page].style.opacity = opacity;
                content_areas[page].querySelector('.information_title').style.opacity = opacity;
                content_areas[page].querySelector('.information_title').style.transform = `translate(0,${translate}%)`;
            }
            else if (isMobile == true) {
                content_areas[page].style.opacity = opacity;
                content_areas[page].querySelector('.information_title').classList.remove("animation_fadein");
                content_areas[page].querySelector('.information_title').classList.add("animation_fadeout");
                document.getElementById(`${num + 1}`).classList.remove('indicateSelected');
            }
        }
    }
}

function insertValue(scroll) {
    if (scrollY_values.length == 2) {
        scrollY_values.shift(scrollY_values[0]);
        scrollY_values.push(scroll);
    } else {
        scrollY_values.push(scroll);
    }
}

function detectMobileDevice() {
    const minWidth = 900
    return window.innerWidth < minWidth
}

function nextSlide() {
    btn_count++;
    if (btn_count > 0) { prev_btn.style.pointerEvents = 'auto' }
    var ratio = (-(100 / 3)) * btn_count;
    list_container.style.transform = `translate(${ratio}%)`;
    if (btn_count >= brunch_length - 1) { next_btn.style.pointerEvents = 'none'; }
}

function prevSlide() {
    btn_count--;
    if (btn_count <= brunch_length - 1) { next_btn.style.pointerEvents = 'auto'; }
    var ratio = (-(100 / 3)) * btn_count;
    list_container.style.transform = `translate(${ratio}%)`;
    if (btn_count <= 0) { prev_btn.style.pointerEvents = 'none'; }
}

function removeAllIndicaters() {
    for (var i = 0; i < indicaters.length; i++) {
        indicaters[i].classList.remove('indicateSelected');
    }
}
function setIndicater(pageNum) {
    indicaters[pageNum].classList.add('indicateSelected');
}

function findScrollDirection() {
    return scrollY_values[1] - scrollY_values[0];
}

function animateBackground(pageNum, opacityRate) {
    content_areas[pageNum].animate([{ opacity: 0 }, { opacity: opacityRate }], { duration: 1000 });
    content_areas[pageNum].style.opacity = opacityRate;
}