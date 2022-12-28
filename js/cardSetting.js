const card_list = [
    {"center":"인천논현센터", "address":"인천광역시 남동구 논고개로 123번길 칼리오페 710-711", "call":"010-8478-2329"},
    {"center":"용인센터", "address":"경기도 용인시", "call":"000)000-0000"},
    {"center":"연수센터", "address":"인천광역시 연수구", "call":"000)000-0000"},
    {"center":"인천논현센터", "address":"인천광역시 남동구 논고개로 123번길 칼리오페 710-711", "call":"000)000-0000"},
    {"center":"용인센터", "address":"경기도 용인시", "call":"000)000-0000"},
    {"center":"연수센터", "address":"인천광역시 연수구", "call":"000)000-0000"},
]
let brunch_list = [];
const container = document.body.querySelector(".container");
let brunch = document.createElement("div");
brunch.classList.add("brunch");
brunch_list.push(brunch);

let j = 0

for(var i=0; i<card_list.length; i++){
    var h3_text = document.createTextNode(card_list[i].center); // 센터 이름 
    var p_center_text = document.createTextNode(card_list[i].address);// 센터 주소
    var p_call_text = document.createTextNode(card_list[i].call);// 센터 전화번호
    
    var br = document.createElement('br'); // 텍스트를 띄울 br 태그
    var h3 = document.createElement("h3"); // 센터 이름을 담을 h3 태그
    var p = document.createElement("p"); // 센터의 주소와 전화번호를 담을 p 태그
    var a = document.createElement("a"); // 센터의 정보를 담을 a 태그

    a.classList.add("card"); // a의 class 추가
    a.href = "https://open.kakao.com/o/gTFJbmDe"; // a의 href 속성 추가
    a.target = "_blank"; // 링크가 새창에서 열리도록 target 추가

    h3.appendChild(h3_text);
    p.appendChild(p_center_text);
    p.appendChild(br);
    p.appendChild(p_call_text);

    a.appendChild(h3);
    a.appendChild(p);

    brunch_list[j].appendChild(a);

    // 카드가 3개가 되면 다음 리스트로 넘어감
    if((i+1)%3==0){ 
        container.appendChild(brunch_list[j]);
        brunch = document.createElement("div");
        brunch.classList.add("brunch")
        brunch_list.push(brunch);
        j++;        
    }
}