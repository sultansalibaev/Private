export function elementSlideToggle() {
	let accTitles = document.querySelectorAll('.acc__title');
	accTitles.forEach(accTitle => {
		let accContentStyle = accTitle.nextElementSibling.style;
		accContentStyle.height = accContentStyle.paddingTop = accContentStyle.paddingBottom = '0px';
		accTitle.addEventListener('click', () => {
			// console.log(accTitle, accTitle.parentElement.classList.contains('ref_content'));
			if (accTitle.parentElement.classList.contains('ref_content')) {
				accContentStyle.width = accTitle.offsetWidth + 'px';
			}
			if (!accTitle.nextElementSibling.classList.contains('open')) {
				hideAllAccordion(accTitles, accTitle);
				accContentStyle.height = accTitle.nextElementSibling.scrollHeight + 'px';
				accContentStyle.paddingTop = accContentStyle.paddingBottom = '0px';
				accTitle.nextElementSibling.addEventListener("transitionend", () => {
					if (!accTitle.nextElementSibling.classList.contains('afterHide')) {
						accTitle.nextElementSibling.classList.add('open');
					}
				});
			} else {
				accContentStyle.height = accContentStyle.paddingTop = accContentStyle.paddingBottom = '0px';
				accTitle.nextElementSibling.classList.remove('open')
				accTitle.nextElementSibling.classList.add('afterHide')
				setTimeout(() => {
					accTitle.nextElementSibling.classList.remove('afterHide')
				}, 400);
			}
		});
	});
	function hideAllAccordion(_accTitles, el) {
		_accTitles.forEach(accTitle => {
			let accContent = accTitle.nextElementSibling;
			let accContentStyle = accTitle.nextElementSibling.style;
			if (accTitle != el) {
				accContentStyle.height = accContentStyle.padding = '0px';
				accContent.classList.remove('open');
				accContent.classList.add('afterHide');
				setTimeout(() => {
					accContent.classList.remove('afterHide');
				}, 400);
			}
		});
	}
	let accTitles2 = document.querySelectorAll('.acc2__title');
	accTitles2.forEach(accTitle => {
		let accContentStyle = accTitle.nextElementSibling.style;
		hideAllAccordion2(accTitles2, accTitle);
		if (accTitles2.length === 1) {
			accContentStyle.width = accContentStyle.padding = '0px';
			accTitle.nextElementSibling.classList.remove('open');
		}
		accTitle.lastChild.addEventListener('click', () => {
			hideAllAccordion2(accTitles2, accTitle);
			hideAllAccordion(accTitles, accTitle);
			if (!accTitle.nextElementSibling.classList.contains('open')) {
				accContentStyle.width = accTitle.nextElementSibling.getAttribute('data-width');
				let accPadding = getComputedStyle(document.documentElement)
					.getPropertyValue('--acc-padding');
				accContentStyle.padding = accPadding;
				accContentStyle.boxSizing = 'content-box';
				accTitle.nextElementSibling.addEventListener("transitionend", () => {
					if (!accTitle.nextElementSibling.classList.contains('afterHide')) {
						accTitle.nextElementSibling.classList.add('open');
						accTitle.nextElementSibling.classList.add('f-w');
					}
				});
			} else {
				accTitle.nextElementSibling.classList.remove('f-w');
				console.log(accContentStyle.width);
				accContentStyle.width = accContentStyle.padding = '0px';
				console.log(accContentStyle.width);
				accTitle.nextElementSibling.classList.remove('open')
				accTitle.nextElementSibling.classList.add('afterHide')
				setTimeout(() => {
					accTitle.nextElementSibling.classList.remove('afterHide')
				}, 400);
			}
		});
	});
	function hideAllAccordion2(_accTitles, el) {
		if (_accTitles.length === 1) return;
		_accTitles.forEach(accTitle => {
			let accContentStyle = accTitle.nextElementSibling.style;
			accTitle.nextElementSibling.classList.remove('f-w');
			accTitle.nextElementSibling.setAttribute('data-width', '1000px');
			if (accTitle != el) {
				accContentStyle.width = accContentStyle.padding = '0px';
				accTitle.nextElementSibling.classList.remove('open');
				accTitle.nextElementSibling.classList.add('afterHide');
				setTimeout(() => {
					accTitle.nextElementSibling.classList.remove('afterHide');
				}, 400);
			}
		});
	}
}