let inputFields = document.querySelectorAll('.input-field');
let material = document.querySelector('#material');
let isMontageNeed = document.querySelector('.montage-check');
let price = document.querySelector('.price');


// Список материалов

let selectItems = document.querySelectorAll('.select__item');
let selectHeader = document.querySelector('.select__header');
let selectCurrent = document.querySelector('.select__current');

// Разворачивание списка материалов

let showSelect = () => {
	 document.querySelector('.select__body').classList.toggle('hidden');
}
selectHeader.onclick = showSelect;

// Выбор материала из списка

selectItems.forEach(item => {
	item.addEventListener('click', function () {
		for (let selectItem of selectItems) {
			selectItem.classList.remove('selected'); // Удаление выделения на элементах списка
		}
		item.classList.add('selected');
		this.parentElement.classList.toggle('hidden'); // Сворачивание списка
		selectCurrent.innerText = item.innerText; // Перенос значения элемента в заголовок списка
		material.dataset.name = item.dataset.value; // Перенос value элемента в name заголовка
	})
});

// Расчёт суммы заказа

let widthOfFence = document.querySelector('#width'); // Данные о ширине забора
let	heightOfFence = document.querySelector('#height'); // Данные о высоте забора
let materialsPrice = {
	'profnastil': 400,
	'moduli': 500,
	'beton': 700,
	'setka': 200
};

// Проверка полей на заполненность

function checkFormValidity() {
	if (parseInt(widthOfFence.value) > 0 &&
		widthOfFence.value !== '') {
		widthOfFence.classList.remove('invalid');
		widthOfFence.parentElement.classList.remove('invalid');
		widthOfFence.parentElement.classList.add('correct'); // Добавление галочки на ширину
	} else {
		widthOfFence.parentElement.classList.remove('correct'); // Удаление галочки на ширине
	}
	if (parseInt(heightOfFence.value) > 0 &&
		heightOfFence.value !== '') {
		heightOfFence.classList.remove('invalid'); 
		heightOfFence.parentElement.classList.remove('invalid'); 
		heightOfFence.parentElement.classList.add('correct'); // Добавление галочки на высоту
	} else {
		heightOfFence.parentElement.classList.remove('correct'); // Удаление галочки на высоте
	}
	if (material.dataset.name !== '') {
		material.classList.remove('invalid');
		material.parentElement.classList.remove('invalid');
		material.parentElement.classList.add('correct'); // Добавление галочки на материалы
	} else {
		material.parentElement.classList.remove('correct'); // Удаление галочки с материалов
	}
}

// Склонение "метров"

function changeMetersWord() {
	meters = document.querySelectorAll('.meters');
	let decimals;
	let units;
	for (let i = 0; i<2; i++) {
		decimals = Math.abs((parseInt(inputFields[i].firstElementChild.value))) % 100;
		units = decimals % 10;
		if (decimals > 10 && decimals < 20) {
			inputFields[i].lastElementChild.innerText = 'метров';
		} else {
			if (units > 1 && units < 5) {
				inputFields[i].lastElementChild.innerText = 'метра';
			} else {
				if (units == 1) {
				inputFields[i].lastElementChild.innerText = 'метр';
				} else {
					inputFields[i].lastElementChild.innerText = 'метров';
				}
			}
		}	
	}
}

// Расчёт итоговой стоимости

let sum;

function calculateSummaryCost() {
	if (widthOfFence.value > 0 &&
		widthOfFence.value !== '' &&
		heightOfFence.value > 0 &&
		heightOfFence.value !== '' &&
		material.dataset.name !== '') {
		sum = parseInt(widthOfFence.value) * parseInt(heightOfFence.value) * materialsPrice[material.dataset.name]; // Расчёт суммы без монтажа
		if (isMontageNeed.checked) {
			sum = sum + (200 * (parseInt(widthOfFence.value)*parseInt(heightOfFence.value))); // Расчёт суммы с монтажом
		}
		if (sum == NaN) { 
			price.textContent = 0 + ' ₽'; // Если NaN - подставляется 0
		} else {
			price.textContent = sum + ' ₽';
		}
	} else {
		price.textContent = 0 + ' ₽';
	}
}

// Активация/деакцивация кнопки Далее + проверка введённых данных на корректность

let buttonNext = document.querySelector('.button-next');

function checkFormValidityOnSubmit() {
	let isInvalid = false;
	let inputFields = document.querySelectorAll('.input-field');
	inputFields.forEach(item => {
		item.classList.remove('invalid');
		item.firstElementChild.classList.remove('invalid');
		if (item.firstElementChild.value <= 0) {
			item.classList.add('invalid');
			item.firstElementChild.classList.add('invalid');
			isInvalid = true;
			return;
			}
		if (material.dataset.name == '') {
			item.classList.add('invalid');
			item.firstElementChild.classList.add('invalid');
			isInvalid = true;
			return;
		}
	});
	if (!isInvalid) {
		for (form of forms) {
			form.classList.toggle('hidden');
		}
	}
}

function activateNextButton() {
	if (widthOfFence.value !== 0 &&
		widthOfFence.value !== '' &&
		heightOfFence.value !== 0 &&
		heightOfFence.value !== '' &&
		material.dataset.name !== '') {
		buttonNext.removeAttribute('disabled');
		buttonNext.addEventListener('click', checkFormValidityOnSubmit);
	} else {
	 	buttonNext.setAttribute('disabled', 'disabled');
	}
}

// Проверка полей на валидность + переход на 2 страницу

// Запуск функций в форме по клику и вводу

let forms = document.querySelectorAll('.form');
let firstForm = document.querySelector('.form-1');

firstForm.addEventListener('input', changeMetersWord);

firstForm.addEventListener('click', checkFormValidity);
firstForm.addEventListener('change', checkFormValidity);

firstForm.addEventListener('click', activateNextButton);
firstForm.addEventListener('input', activateNextButton);

firstForm.addEventListener('click', calculateSummaryCost);
firstForm.addEventListener('input', calculateSummaryCost);

// Ссылка Вернуться

let linkPrev = document.querySelector('.link-back');

linkPrev.onclick = () => {
	for (form of forms) {
		form.classList.toggle('hidden');
	}
}


// Вторая страница

let summaryForm = document.querySelector('.form-2');

// Перенос данных только по клику по кнопке Далее

function secondFormDataTransform() {

	// Переносим данные из первой формы в скрытые input второй

	let widthSend = document.querySelector('#width-send');
	let heightSend = document.querySelector('#height-send');

	widthSend.value = widthOfFence.value;
	heightSend.value = heightOfFence.value;

	// Вывод итоговой информации о заказе перед отправкой данных

	// Добавляем в абзац переменные

	let summaryWidth = document.querySelector('.summary-width'); // Длина
	let summaryHeight = document.querySelector('.summary-height'); // Высота
	let materialName = material.innerText.split(' ')[0].toLowerCase(); // Материал
	let summaryMaterial = document.querySelector('.summary-material');
	let summarySum = document.querySelector('.summary-sum'); // Сумма

	summaryWidth.textContent = 'длиной ' + widthSend.value + ' ' + inputFields[0].lastElementChild.innerText + ' ';
	summaryHeight.textContent = 'высотой ' + heightSend.value + ' ' + inputFields[1].lastElementChild.innerText + ' ';
	summaryMaterial.textContent = materialName + ' ';
	summarySum.textContent = price.textContent;

}

// Добавляем имя пользователя в абзац

let userName = document.querySelector('#name');
let summaryUsername = document.querySelector('.summary-username');

function addUserNameToText() {
	summaryUsername.textContent = userName.value;
}

// Меняем видимость абзаца


let userEmail = document.querySelector('#email');
let summaryText = document.querySelector('.summary');

function textVisibility() {
	if (userName.value !== '' && userEmail.value !== '') {
		summaryText.classList.remove('invisible');
	} else {
		summaryText.classList.add('invisible');
	}
}

// Проверка полей на заполненность

function checkSummaryFormValidity() {
	let summaryInputs = document.querySelectorAll('.input-field-2');
	summaryInputs.forEach(item => {
		if (item.firstElementChild.value !== '') {
			item.classList.add('correct');
		} else {
			item.classList.remove('correct');
		}
	});
}

let buttonSend = document.querySelector('.button-send');

function activateSendButton() {
	if (userName.value !== '' && userEmail.value !== '') {
		buttonSend.removeAttribute('disabled');
	} else {
	 	buttonSend.setAttribute('disabled', 'disabled');
	}
}

// Немного AJAX (что это за код...) для отправки формы
// Почему-то при задании GET - отправляется как POST и наоборот...

$(document).ready(function() {
	$('.form-2').submit(function() { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
		$.ajax({
			type: "POST",
			url: "mailer.php",
			data: $(this).serialize()
		}).done(function() {
			$('.success').toggleClass('hidden');
			$('.form-2').toggleClass('hidden');
			$(this).find('input').val(''); // Не работает, почему-то, не разобрался
			$('.form-2').trigger('reset'); // Тоже
		});
		return false;
	});
});

$(function($){
	$('[name="tel"]').mask("+7 (999) 999-99-99");
});


// Генерация номера заказа

let orderNumber;
let orderNumberField = document.querySelector('#order-number');

function orderNum() {
    orderNumber = Math.floor(Math.random()*1000);
    orderNumberField.value = orderNumber;
}

let userTel = document.querySelector('#tel');

// События

buttonNext.addEventListener('click', secondFormDataTransform);

userName.addEventListener('change', addUserNameToText);

summaryForm.addEventListener('change', textVisibility);
summaryForm.addEventListener('change', checkSummaryFormValidity);

summaryForm.addEventListener('change', activateSendButton);

buttonSend.addEventListener('click', orderNum);

// Перенос данных на итоговую страницу о заказе

summaryForm.onclick = () => {
	document.querySelector('.success-name').textContent = userName.value;
	document.querySelector('.success-order-number').textContent = "№ "+orderNumber;
	document.querySelector('.success-email').textContent = userEmail.value;
	document.querySelector('.success-tel').textContent = userTel.value;
}


// Ссылка Вернуться

let linkClose = document.querySelector('.link-close');
let successPage = document.querySelector('.success');

linkClose.onclick = () => {
	firstForm.classList.toggle('hidden');
	$('.success').toggleClass('hidden');
	$('.form-2').toggleClass('hidden');
	summaryForm.classList.toggle('hidden');
}