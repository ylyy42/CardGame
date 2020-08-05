const cardHorizontalCount = 4; //가로카드갯수
const VerticalCount = 3; //세로카드갯수
let clickFlag = true;

const cardList = document.querySelectorAll('.card');
const colorsCandidate = ['#ff2b2b','#ff2bf3','#802bff','#2b3fff','#2bc6ff','#2bff5d'];
const colorsCopy = Array.prototype.slice.call(colorsCandidate);

const cardColors = colorsCandidate.concat(colorsCopy);

// 색 섞기
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i -= 1) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	};
};
shuffle(cardColors)

// 카드 세팅
function cardSetting(hor, ver){
	clickFlag = false;
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
};
cardSetting(cardHorizontalCount, VerticalCount);

const cards = document.querySelectorAll('.card');
let checkCard = [];

// 카드 이벤트
Array.prototype.forEach.call(cards, function(ele, index){
	setTimeout(function(){
		ele.classList.add('flipped');
	}, 1000 + 100 * index);

	setTimeout(function(){
		clickFlag = true;
		ele.classList.remove('flipped');
	}, 4500);

	ele.addEventListener('click', function(){
		if(clickFlag){
			this.classList.toggle('flipped');
			checkCard.push(this);

			if(checkCard.length === 2){ //클릭한 카드수가 2개이면

				if (checkCard[0].querySelector('.card__back').style.background === checkCard[1].querySelector('.card__back').style.background) {
					//펼친 두카드의 색이 같으면
					checkCard = [];
				} else {
					//펼친 두카드의 색이 다르면
					clickFlag = false;
					setTimeout(function(){
						checkCard[0].classList.remove('flipped');
						checkCard[1].classList.remove('flipped');
						checkCard = [];
						clickFlag = true;
					}, 1000);
					
				}
			} else { //클릭한 카드수가 2개가 아니면
				
			}
		}
	});
});

function cardChecking(){
	
}
cardChecking();