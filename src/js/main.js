// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Swiper from 'swiper';
import { Navigation, Pagination, Manipulation, Mousewheel, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';


window.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

window.swiperEventsInit = function () {
	var swiper = new Swiper(".slider-events", {
		slidesPerView: "auto",
		spaceBetween: 24,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		modules: [Navigation, Pagination, Manipulation, Mousewheel],
	});
}

window.swiperEventItemInit = function () {
	var swiper = new Swiper(".event-item-slider", {
		slidesPerView: "auto",
		spaceBetween: 24,
		// effect: "fade",
		loop: true,
		breakpoints: {
			992: {
				slidesPerView: "1",
			}
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		modules: [Navigation, Pagination, Manipulation, Mousewheel, EffectFade],
	});
}

// анимация кнопки в хедере
// window.toggleSwitch = function () {
// 	const header = document.querySelector('.section-header');

// 	header.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach((item) => {
// 		item.addEventListener('click', () => {
// 			setTimeout(() => {
// 				if (header.querySelectorAll('.offcanvas.show').length) {
// 					header.classList.add('pip')
// 				} else {
// 					header.classList.remove('pip')
// 				}
// 			}, 100)
// 		})
// 	})



// header.querySelectorAll('[data-bs-toggle="offcanvas"]').addEventListener('click', () => {
// 	console.log('click')
// })
// }


// // datepicker
let buttonToday = {
	content: 'Сегодня',
	className: '',
	onClick: (dp) => {
		let date = new Date();
		dp.clear();
		dp.selectDate([date, date]);
		dp.setViewDate(date);
	}
}
let buttonTomorrow = {
	content: 'Завтра',
	className: '',
	range: false,
	onClick: (dp) => {
		let date = new Date();
		let tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
		dp.clear();
		dp.selectDate([tomorrow, tomorrow]);
		dp.setViewDate(tomorrow);
	}
}
let buttonWeekend = {
	content: 'Выходные',
	className: '',
	onClick: (dp) => {
		let today = new Date();
		let day = today.getDay();
		let saturday = new Date(today);
		let sunday = new Date(today);

		// Найти ближайшую субботу
		saturday.setDate(today.getDate() + (6 - day));
		// Найти ближайшее воскресенье
		sunday.setDate(today.getDate() + (7 - day));
		dp.clear();
		dp.selectDate([saturday, sunday]);
		dp.setViewDate(saturday);
	}
}
let buttonClear = {
	content: 'Сбросить',
	className: 'dropdown-event-footer__button dropdown-event-footer__button--clear',
	attrs: {
		'data-datepicker-clear': true,
	},
	onClick: (dp) => {
		dp.clear();
		document.getElementById('datePickerResult').innerText = '';
		document.querySelectorAll('.air-datepicker-cell').forEach((item) => {
			item.classList.remove('-in-range-');
			item.classList.remove('-range-from-');
			item.classList.remove('-range-to-');
		});

		setTimeout(() => {
			document.querySelector('[data-datepicker-apply]').disabled = true;
		}, 1);

		document.querySelector('[data-datepicker-apply]').classList.add('dropdown-event-footer__button--apply-active')

	}
}

let buttonApply = {
	content: 'Применить',
	className: 'dropdown-event-footer__button dropdown-event-footer__button--apply dropdown-event-footer__button--apply-active',
	attrs: {
		'data-datepicker-apply': true,
		'disabled': true,
	},
	onClick: (dp) => {
		if (!dp.selectedDates[0]) {
			return;
		}
		const dayStart = dp.selectedDates[0]?.getDate();
		const dayEnd = dp.selectedDates[1]?.getDate();
		const monthStart = dp.selectedDates[0]?.getMonth();
		const monthEnd = dp.selectedDates[1]?.getMonth();
		let text = '';
		if (monthStart == monthEnd) {
			text = `${dayStart} ${dayEnd ? '- ' + dayEnd : ''} ${new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(dp.selectedDates[0])}`
		} else {
			text = `${dayStart} ${new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(dp.selectedDates[0])}`;
			if (dayEnd) {
				text += `- ${dayEnd} ${new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(dp.selectedDates[1])}`
			}
		}
		document.getElementById('datePickerResult').innerText = text;

		document.querySelector('[data-datepicker-apply]').disabled = true;

		document.querySelector('[data-datepicker-clear]').classList.add('dropdown-event-footer__button--clear-active');
		document.querySelector('[data-datepicker-apply]').classList.remove('dropdown-event-footer__button--apply-active');
	}
}

new AirDatepicker('#datePicker', {
	inline: true,
	range: true,
	minDate: new Date(),
	minView: "dates",
	altFields: "datePickerResult",
	multipleDatesSeparator: " - ",
	altFieldDateFormat: 'dd MM yyyy',
	buttons: [buttonToday, buttonTomorrow, buttonWeekend, buttonClear, buttonApply],
	navTitles: {
		days: 'MMMM',
		months: 'yyyy',
		years: 'yyyy1 - yyyy2'
	},
	// dateFormat(date) {
	// 	return date.toLocaleString('ru', {
	// 		year: 'numeric',
	// 		day: '2-digit',
	// 		month: 'short'
	// 	});
	// },
	onRenderCell({ date, cellType }) {
		// Disable all 12th dates in month
		if (cellType === 'day') {
			return {
				html: `<span>${date.getDate()}</span>`,
				// disabled: true,
				// classes: 'disabled-class',
				// 			attrs: {
				// 	title: 'Cell is disabled'
				// }
			}
		}
	},
	onSelect: function () {
		document.querySelector('[data-datepicker-apply]').disabled = false;
		document.querySelector('[data-datepicker-apply]').classList.add('dropdown-event-footer__button--apply-active');
	},
	// onSelect: function ({ formattedDate }) {
	// document.getElementById('datePickerResult').innerText = formattedDate;
	// }
})

// new AirDatepicker('#timePicker', {
// 	inline: true,
// 	dateFormat: ' ',
// 	isMobile: false,
// 	timepicker: true,
// 	onlyTimepicker: true,
// onSelect: function ({ formattedDate }) {
// 	document.getElementById('datePickerResult').innerText = formattedDate;
// }
// })
// /datepicker


// value-slider

window.valueSliderInit = function () {
	const minValueInput = document.getElementById('min-value');
	const maxValueInput = document.getElementById('max-value');
	const rangeMin = document.getElementById('range-min');
	const rangeMax = document.getElementById('range-max');
	const applyButton = document.getElementById('apply');
	const resetButton = document.getElementById('reset');
	const valueRangeText = document.getElementById('value-range-text');
	const sliderRange = document.querySelector('.slider-range');

	function updateRange() {
		const minValue = parseInt(rangeMin.value);
		const maxValue = parseInt(rangeMax.value);

		if (minValue > maxValue - 100) {
			if (this === rangeMin) {
				rangeMin.value = maxValue - 100;
			} else {
				rangeMax.value = minValue + 100;
			}
		}

		minValueInput.value = rangeMin.value;
		maxValueInput.value = rangeMax.value;

		applyButton.disabled = false;

		updateSliderRange();
	}

	function updateInputs() {
		rangeMin.value = minValueInput.value;
		rangeMax.value = maxValueInput.value;
		applyButton.disabled = false;
		resetButton.classList.toggle('active');

		updateSliderRange();
	}

	function resetValues() {
		rangeMin.value = 0;
		rangeMax.value = 30000;
		minValueInput.value = 0;
		maxValueInput.value = 30000;
		applyButton.disabled = true;
		valueRangeText.textContent = '';

		resetButton.classList.remove('active');
		updateSliderRange();
	}

	function applyValues() {
		valueRangeText.textContent = `${minValueInput.value} ₽ – ${maxValueInput.value} ₽`;
		applyButton.disabled = true;
		resetButton.classList.add('active');
	}

	function updateSliderRange() {
		const min = parseInt(rangeMin.value);
		const max = parseInt(rangeMax.value);
		const minPercent = (min / 30000) * 100;
		const maxPercent = (max / 30000) * 100;

		sliderRange.style.left = minPercent + '%';
		sliderRange.style.width = (maxPercent - minPercent) + '%';
	}

	rangeMin.addEventListener('input', updateRange);
	rangeMax.addEventListener('input', updateRange);
	minValueInput.addEventListener('input', updateInputs);
	maxValueInput.addEventListener('input', updateInputs);
	resetButton.addEventListener('click', resetValues);
	applyButton.addEventListener('click', applyValues);

	updateSliderRange();
}

// /value-slider

// dropdown-select

class DropdownRadioSelect {
	dropdownContainer = null;

	constructor(element) {
		if (!element) {
			return;
		}

		this.dropdownContainer = element;
		this.dropdownItem = element.querySelector('.dropdown-item');
		this.radioButtons = element.querySelectorAll('input[type="radio"]');
		this.dropdownToggle = element.querySelector('.dropdown-toggle');
		this.dropdownMenu = element.querySelector('.dropdown-menu');
		this.dropdownPickResult = element.querySelector('.dropdown-pick-result');
		this.applyBtn = element.querySelector('.dropdown-btn-apply');
		this.resetBtn = element.querySelector('.dropdown-btn-reset');



		this.init();
	}

	init() {
		this.radioButtons.forEach(radio => {
			radio.addEventListener('change', () => this.onRadioChange());
		});

		this.applyBtn.addEventListener('click', () => this.onApply());
		this.applyBtn.disabled = true;
		this.resetBtn.addEventListener('click', () => this.onReset());
	}

	onRadioChange() {
		this.applyBtn.disabled = false;
	}

	onApply() {
		const selectedGenre = document.querySelector('input[type="radio"]:checked').value;
		this.dropdownPickResult.textContent = `${selectedGenre}`;
		this.applyBtn.disabled = true;
		this.dropdownMenu.classList.remove('show');
		this.dropdownToggle.classList.remove('show');
		this.resetBtn.classList.add('show');
	}

	onReset() {
		this.radioButtons.forEach(radio => {
			radio.checked = false;
		});
		this.applyBtn.disabled = true;
		this.dropdownPickResult.textContent = '';
		this.dropdownMenu.classList.remove('show');
		this.dropdownToggle.classList.remove('show');
		this.resetBtn.classList.remove('show');
	}
}

// /dropdown-select


// time-filter
class Timer {
	startTime = { hour: 9, min: 0 };
	endTime = { hour: 23, min: 0 };
	timeStep = 15;
	$timeContainer = null;
	$timeInput = null;
	$timeSelected = null;
	$startTime = null;
	$endTime = null;
	$decreaseStart = null;
	$increaseStart = null;
	$decreaseEnd = null;
	$increaseEnd = null;
	$btnMorning = null;
	$btnDay = null;
	$btnEvening = null;
	$btnReset = null;
	$btnApply = null;
	setMorning() {
		this.$btnApply.disabled = false;
		this.startTime = { hour: 9, min: 0 };
		this.endTime = { hour: 12, min: 0 };
		this.drawValues();
	}
	setDay() {
		this.$btnApply.disabled = false;
		this.startTime = { hour: 12, min: 0 };
		this.endTime = { hour: 15, min: 0 };
		this.drawValues();
	}
	setEvening() {
		this.$btnApply.disabled = false;
		this.startTime = { hour: 18, min: 0 };
		this.endTime = { hour: 21, min: 0 };
		this.drawValues();
	}
	decStart() {
		this.$btnApply.disabled = false;
		if (this.startTime.hour == 0 && this.startTime.min - this.timeStep < 0) {
			return;
		}
		if (this.startTime.min - this.timeStep < 0) {
			--this.startTime.hour;
			this.startTime.min = this.startTime.min + 60 - this.timeStep;
		} else {
			this.startTime.min -= this.timeStep;
		}
		this.drawValues();
	}
	incStart() {
		this.$btnApply.disabled = false;
		if (this.startTime.hour == this.endTime.hour && this.startTime.min + this.timeStep >= this.endTime.min) {
			return;
		}
		if (this.startTime.hour + 1 == this.endTime.hour && this.startTime.min + this.timeStep >= 60 && this.endTime.min == 0) {
			return;
		}
		if (this.startTime.min + this.timeStep >= 60) {
			++this.startTime.hour;
			this.startTime.min = this.startTime.min - 60 + this.timeStep;
		} else {
			this.startTime.min += this.timeStep;
		}
		this.drawValues();
	}
	decEnd() {
		this.$btnApply.disabled = false;
		if (this.endTime.hour == this.startTime.hour && this.endTime.min - this.timeStep <= this.startTime.min) {
			return;
		}
		if (this.endTime.hour == this.startTime.hour && this.endTime.min - this.timeStep < 0 && this.startTime.min == 0) {
			return;
		}
		if (this.endTime.min - this.timeStep < 0) {
			--this.endTime.hour;
			this.endTime.min = this.endTime.min + 60 - this.timeStep;
		} else {
			this.endTime.min -= this.timeStep;
		}
		this.drawValues();
	}
	incEnd() {
		this.$btnApply.disabled = false;
		if (this.endTime.hour == 23 && this.endTime.min + this.timeStep >= 60) {
			return;
		}
		if (this.endTime.min + this.timeStep >= 60) {
			++this.endTime.hour;
			this.endTime.min = this.endTime.min - 60 + this.timeStep;
		} else {
			this.endTime.min += this.timeStep;
		}
		this.drawValues();
	}
	drawValues() {
		this.$startTime.innerText = `${this.startTime.hour}:${this.startTime.min == 0 ? '00' : this.startTime.min}`;
		this.$endTime.innerText = `${this.endTime.hour}:${this.endTime.min == 0 ? '00' : this.endTime.min}`;
	}
	reset() {
		this.$btnApply.disabled = false;
		this.$timeContainer.classList.remove('--time-selected');
		this.$timeInput.value = null;
		this.$timeSelected.innerText = '';
	}
	apply() {
		this.$btnApply.disabled = true;
		this.$timeContainer.classList.add('--time-selected');
		this.$timeInput.value = `${this.startTime.hour}:${this.startTime.min == 0 ? '00' : this.startTime.min},${this.endTime.hour}:${this.endTime.min == 0 ? '00' : this.endTime.min}`;
		this.$timeSelected.innerText = `${this.startTime.hour}:${this.startTime.min == 0 ? '00' : this.startTime.min} - ${this.endTime.hour}:${this.endTime.min == 0 ? '00' : this.endTime.min}`;
	}
	constructor(element) {
		if (!element) {
			return;
		}
		this.$timeContainer = element;
		this.$timeInput = element.querySelector('.timer-input');
		this.$timeSelected = element.querySelector('.timer-selected');
		this.$startTime = element.querySelector('.timer-start');
		this.$endTime = element.querySelector('.timer-end');
		this.$decreaseStart = element.querySelector('.timer-start-dec');
		this.$increaseStart = element.querySelector('.timer-start-inc');
		this.$decreaseEnd = element.querySelector('.timer-end-dec');
		this.$increaseEnd = element.querySelector('.timer-end-inc');
		this.$btnMorning = element.querySelector('.timer-morning');
		this.$btnDay = element.querySelector('.timer-day');
		this.$btnEvening = element.querySelector('.timer-evening');
		this.$btnReset = element.querySelector('.timer-reset');
		this.$btnApply = element.querySelector('.timer-apply');

		this.$btnMorning.addEventListener('click', _ => this.setMorning(this));
		this.$btnDay.addEventListener('click', _ => this.setDay(this));
		this.$btnEvening.addEventListener('click', _ => this.setEvening(this));

		this.$decreaseStart.addEventListener('click', _ => this.decStart(this));
		this.$increaseStart.addEventListener('click', _ => this.incStart(this));
		this.$decreaseEnd.addEventListener('click', _ => this.decEnd(this));
		this.$increaseEnd.addEventListener('click', _ => this.incEnd(this));

		this.$btnReset.addEventListener('click', _ => this.reset(this));
		this.$btnApply.addEventListener('click', _ => this.apply(this));
	}
}
// /time-filter


// maps
window.yaMaps = [];
window.drawMap = [];
window.initYaMap = function () {
	document.querySelectorAll('.yamap').forEach(function (holder, index) {
		let markerHtml = holder.querySelectorAll('.marker');
		let markers = [];
		let mapName = holder.dataset.name || index;

		if (!holder.dataset.name) {
			holder.dataset.name = index;
		}

		function drawMap() {
			if (holder.dataset.jsSetted === 'true') {
				return;
			}
			holder.dataset.jsSetted = 'true';

			let coordsStart = JSON.parse(holder.dataset.cords);
			if (typeof coordsStart[0] !== 'number') {
				coordsStart = coordsStart[0];
			}

			if (window.yaMaps[mapName]) {
				window.yaMaps[mapName].destroy();
			}
			let map = new ymaps.Map(holder, {
				zoom: holder.dataset.zoom || 13,
				center: [parseFloat(coordsStart[0]), parseFloat(coordsStart[1])],
				controls: []
			}, {
				maxZoom: 17,
				minZoom: 3,
			});
			map.behaviors.disable('scrollZoom');

			if (isMobile) {
				map.behaviors.disable('drag');
			}

			// Simple marker
			markerHtml.forEach(function (markerItem, index) {
				let pinCords = JSON.parse(markerItem.dataset.cord);
				markers[index] = new ymaps.Placemark([parseFloat(pinCords[0]), parseFloat(pinCords[1])], {
					balloonContentHeader: markerItem.dataset.title,
					balloonContentBody: markerItem.dataset.body,
					balloonContentFooter: markerItem.dataset.footer,
					hintContent: markerItem.dataset.hint
				}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '/img/pin.svg',
					iconImageSize: [24, 24],
					iconImageOffset: [-12, -24]
				});
				map.geoObjects.add(markers[index]);
			});

			window.yaMaps[mapName] = map;
		}

		window.mapsObserver.observe(holder);
		window.drawMap[mapName] = drawMap;
	});
};

// / maps



document.addEventListener("DOMContentLoaded", function (event) {
	// if (document.querySelectorAll('[data-dropdown]').length) {
	// 	window.dropdownsInit();
	// }
	// if (document.querySelectorAll('[data-copy-code]').length) {
	// 	window.shareLink();
	// }
	// if (document.getElementById('mobile-menu-btn')) {
	// 	window.mobileMenu();
	// }
	// if (document.getElementById('filter-menu-btn')) {
	// 	window.filterMenu();
	// }
	// if (document.querySelectorAll('.section-header').length) {
	// 	window.toggleSwitch();
	// }
	if (document.querySelectorAll('.slider-events').length) {
		window.swiperEventsInit();
	}
	if (document.querySelectorAll('.event-item-slider').length) {
		window.swiperEventItemInit();
	}
	if (document.querySelectorAll('.value-slider').length) {
		window.valueSliderInit();
	}
	if (document.querySelectorAll('.dropdown-radio-select').length) {
		for (const select of document.querySelectorAll('.dropdown-radio-select')) {
			new DropdownRadioSelect(select);
		}
	}
	if (document.querySelectorAll('.timer-filter').length) {
		for (const timer of document.querySelectorAll('.timer-filter')) {
			new Timer(timer);
		}
	}


	

	// вызов карта
	if (document.querySelectorAll('.yamap').length) {
		const callback = function (entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;
					if (!target.dataset.jsSetted) {
						window.drawMap[target.dataset.name]();
					}
				}
			});
		};

		window.mapsObserver = new IntersectionObserver(callback, { threshold: 0.25 });

		document.querySelectorAll('.yamap').forEach(function (holder) {
			window.mapsObserver.observe(holder);
		});

		const script = document.createElement('script');
		script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=c27b144f-d856-471a-a4bd-8d14fa1169d9&onload=initYaMap';
		document.head.appendChild(script);
	}
	// вызов карта

	// if (document.querySelectorAll('.filter-buttons-slider').length) {
	// 	window.swiperInit();
	// }
	// if (document.getElementById('sortGroup')) {
	// 	window.sortItems();
	// }
	// if (document.querySelectorAll('[data-like-item]').length) {
	// 	window.likeItems();
	// }
	// if (document.getElementById('filterGroup')) {
	// 	window.filterItems();
	// }
});