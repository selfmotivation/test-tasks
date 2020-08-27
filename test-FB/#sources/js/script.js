// Изменение цвета рамки и фона кружка с весом корма

function changeCardColor() {
	this.classList.toggle('chosen');
	this.classList.toggle('default');
	this.classList.add('current');
	let cardDescription = this.querySelector('.food-card__description');
	cardDescription.innerHTML = "Сказочное заморское яство";
	cardDescription.classList.remove('unchose');
}

function changeCardColorByText() {
	this.parentElement.previousElementSibling.classList.toggle('chosen');
	this.parentElement.previousElementSibling.classList.toggle('default');
}

let foodCards = document.querySelectorAll('.food-card');
foodCards.forEach(function(elem){
	if (elem.parentElement.classList.contains('is_over')) {
		let taste = elem.querySelector('.food-card__taste').innerHTML;
		elem.nextElementSibling.innerHTML = "Печалька, "+taste+" закончился.";
	} else {
		elem.addEventListener('click', changeCardColor);
		elem.addEventListener('mouseleave', removeUnhoveredClass);
		elem.addEventListener('mouseenter', changeDescriptionText);
		elem.addEventListener('click', changeSubscription);
	}
});

// Сохранение состояния карточки после клика, "неприменение" :hover

function removeUnhoveredClass() {
	this.classList.remove('current');
	let cardDescription = this.querySelector('.food-card__description');
	cardDescription.innerHTML = "Сказочное заморское яство";
	cardDescription.classList.remove('unchose');
}

// Изменение верхней подписи на карточке

function changeDescriptionText() {
	if (this.classList.contains('chosen')) {
		let cardDescription = this.querySelector('.food-card__description');
		cardDescription.innerHTML = "Котэ не одобряет?";
		cardDescription.classList.add('unchose');
	}
}

let chosenFoodCards = document.querySelectorAll('.chosen');
chosenFoodCards.forEach(function(elem){
	elem.addEventListener('mouseenter', changeDescriptionText);
	elem.addEventListener('mouseleave', removeUnhoveredClass);
});

// Изменение цвета рамки и фона кружка с весом корма при нажатии по "купи"

let buySubscriptionButton = document.querySelectorAll('.food-item__subscription-buy');
buySubscriptionButton.forEach(function(elem){
	elem.addEventListener('click', changeCardColorByText);
	elem.addEventListener('click', changeSubscriptionByText);
})

// Изменения текста подписи под карточкой

function changeSubscription() {
	let taste = this.querySelector('.food-card__taste').innerHTML;
	let subscription = this.nextElementSibling;
	if (this.classList.contains('chosen')) {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Печень утки разварная с артишоками.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Головы щучьи с чесноком да свежайшая сёмгушка.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Филе из цыплят с трюфелями в бульоне.";
		}
	} else {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Чего сидишь? Порадуй котэ, <span>купи</span>.";
		}
		subscription.querySelector('span').classList.add('food-item__subscription-buy');
		subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeCardColorByText);
		subscription.querySelector('.food-item__subscription-buy').addEventListener('click', changeSubscriptionByText);
	}
}

function changeSubscriptionByText() {
	let taste = this.parentElement.previousElementSibling.querySelector('.food-card__taste').innerHTML;
	let subscription = this.parentElement;
	if (subscription.previousElementSibling.classList.contains('chosen')) {
		if (taste == "с фуа-гра") {
			subscription.innerHTML = "Печень утки разварная с артишоками.";
		} else if (taste == "с рыбой") {
			subscription.innerHTML = "Головы щучьи с чесноком да свежайшая сёмгушка.";
		} else if (taste == "с курой") {
			subscription.innerHTML = "Филе из цыплят с трюфелями в бульоне.";
		}
	}
}

let foodItems = document.querySelectorAll('.food-item');