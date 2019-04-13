// var num = 1;
// var str = "1";

// console.log(typeof(num));
// console.log(typeof(str));


// if(num == str){
//     console.log('동치 연산자 true');
// } else {
//     console.log('동치 연산자 false');
// }

// if(num === str){
//     console.log('일치 연산자 true');
// } else {
//     console.log('일치 연산자 false');
// }

//이름 나이 학교 과 전화번호 생일 날짜 
//일을 가진 Json 객체를 만들고 출력하는 함수를 화살표 함수로 만들고 
//제 생일은


const skt = {
    "name" : "이상윤",
    "year" : 27,
    "university" : "Kookmin",
    "major" : "Computer Science",
    "phoneNumber" : "010-4244-0662",
    "birthMonth" : 5,
    "birthDay" : 5
}
const fun = () => {
    var month = [1,1,5,1,1];
    let findUniq = [];
   
    for (a in month){
        if(skt.birthMonth == a){
            console.log(`제 생일은 ${a}월 5일 입니다`)
        }
        console.log(typeof(month[a]));
    }



}

fun();