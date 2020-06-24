const cardHorizontalCount = 4; //가로카드갯수
const VerticalCount = 3; //세로카드갯수
const cardColors = ['#ff2b2b','#ff2bf3','#802bff','#2b3fff','#2bc6ff','#2bff5d'];
const cardList = new Array();
//카드 세팅
function cardSetting(hor, ver){
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

		card.addEventListener('click', function(){
			this.classList.toggle('flipped');
		});
	};
};
cardSetting(cardHorizontalCount, VerticalCount);