const cardHorizontalCount = 4; //가로카드갯수
const VerticalCount = 3; //세로카드갯수
let clickFlag = true;
let count = 0;
let checkCard = [];
let clearCard = [];

const cardList = document.querySelectorAll('.card');
const colorsCandidate = ['#ff2b2b','#ff2bf3','#802bff','#2b3fff','#2bc6ff','#2bff5d'];
const colorsCopy = Array.prototype.slice.call(colorsCandidate);

const cardColors = colorsCandidate.concat(colorsCopy);

//카드 세팅
function cardSetting(hor, ver){
	clickFlag = false;

	//색 섞기
	function shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i -= 1) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		};
	};
	shuffle(cardColors);

	for(var i = 0; i < hor*ver; i++){
		const cardWrap = document.querySelector('.game_wrap');
		const card = document.createElement('div');
		const cardInner = document.createElement('div');
		const cardFront = document.createElement('div');
		const cardBack = document.createElement('div');

		card.className = 'card';
		cardInner.className = 'card__inner';
		cardFront.className = 'card__front';
		cardBack.className = 'card__back';

		cardWrap.append(card);
		card.append(cardInner);
		cardInner.append(cardFront);
		cardInner.append(cardBack);

		cardBack.style.background = cardColors[i]
	};

	cards = document.querySelectorAll('.card');

	Array.prototype.forEach.call(cards, function(ele, index){//cards가 유사배열이기때문에 forEach문 사용불가능.
		//처음에 카드가 1번부터 마지막까지 순서대로 오픈됨.
		setTimeout(function(){
			ele.classList.add('flipped');
		}, 1000 + 100 * index);

		//4.5초뒤에 카드가 뒤집어짐.
		setTimeout(function(){
			clickFlag = true;
			ele.classList.remove('flipped');
		}, 4500);
	});
};
cardSetting(cardHorizontalCount, VerticalCount);

var cards;

//카드 이벤트
Array.prototype.forEach.call(cards, function(ele, index){//cards가 유사배열이기때문에 forEach문 사용불가능.
	//카드를 눌렀을때 이벤트
	ele.addEventListener('click', function(){
		if(clickFlag && !clearCard.includes(ele)){//clickFlag 가 true 이고, 짝을맞춘 카드가 아닐때
			this.classList.add('flipped');
			checkCard.push(this);
			if(checkCard.length === 2){//클릭한 카드수가 2개이면(클릭한 카드를 넣은 배열의 길이가 2면)
				if (checkCard[0].querySelector('.card__back').style.background === checkCard[1].querySelector('.card__back').style.background && checkCard[0] != checkCard[1]) {
					clearCard.push(checkCard[0],checkCard[1]);
					checkCard = [];
					count+=1;
					if(count === cardHorizontalCount*VerticalCount/2) {//다맞추면
						clickFlag = false;
						count = 0;
						clearCard = [];
						setTimeout(function(){
							alert('clear!');
							Array.prototype.forEach.call(cards, function(c){
								c.classList.remove('flipped');
							});
							document.querySelector('.game_wrap').innerHTML = '';
							cardSetting(cardHorizontalCount, VerticalCount);
							clickFlag = true;
						}, 1000);
					};
				} else {
					//펼친 두카드의 색이 다르면
					clickFlag = false;
					setTimeout(function(){
						checkCard[0].classList.remove('flipped');
						checkCard[1].classList.remove('flipped');
						checkCard = [];
						clickFlag = true;
					}, 1000);
				};
			};
		};
	});
});