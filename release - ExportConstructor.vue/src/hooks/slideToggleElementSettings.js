function hideAllAccordion(el) {
	let _accTitles = document.querySelectorAll(".acc__title");
	_accTitles.forEach((accTitle) => {
		let accContent = accTitle.nextElementSibling;
		let accContentStyle = accTitle.nextElementSibling.style;
		if (accTitle != el) {
			accContentStyle.height = accContentStyle.padding = "0px";
			accContent.classList.remove("open");
			accContent.classList.add("afterHide");
			setTimeout(() => {
				accContent.classList.remove("afterHide");
			}, 400);
		}
	});
}
function hideAllAccordion2(el) {
	let _accTitles = document.querySelectorAll(".acc2__title");
	_accTitles.forEach((accTitle) => {
		let accContentStyle = accTitle.nextElementSibling.style;
		accTitle.nextElementSibling.classList.remove("f-w");
		accTitle.nextElementSibling.setAttribute(
			"data-width",
			"100%"
		);
		if (accTitle != el) {
			accContentStyle.width = accContentStyle.padding = "0px";
			accTitle.nextElementSibling.classList.remove("open");
			accTitle.nextElementSibling.classList.add("afterHide");
			setTimeout(() => {
				accTitle.nextElementSibling.classList.remove(
					"afterHide"
				);
			}, 400);
		}
	});
}
function toggleNextElementList(event) {
	let currentElement = event.target.parentElement;
	let accTitles2 = document.querySelectorAll(".acc2__title");
	accTitles2.forEach((accTitle) => {
		let accContentStyle = accTitle.nextElementSibling.style;
		hideAllAccordion2(currentElement);
		if (accTitle == currentElement) {
			hideAllAccordion2(currentElement);
			hideAllAccordion(currentElement);
			if (
				!accTitle.nextElementSibling.classList.contains("open")
			) {
				accContentStyle.width =
					accTitle.nextElementSibling.getAttribute(
						"data-width"
					);
				let accPadding = getComputedStyle(
					document.documentElement
				).getPropertyValue("--acc-padding");
				accContentStyle.padding = accPadding;
				accContentStyle.boxSizing = "content-box";
				accTitle.nextElementSibling.addEventListener(
					"transitionend",
					() => {
						if (
							!accTitle.nextElementSibling.classList.contains(
								"afterHide"
							)
						) {
							accTitle.nextElementSibling.classList.add(
								"open"
							);
							accTitle.nextElementSibling.classList.add(
								"f-w"
							);
						}
					}
				);
			} else {
				accTitle.nextElementSibling.classList.remove("f-w");
				accContentStyle.width = accContentStyle.padding = "0px";
				accTitle.nextElementSibling.classList.remove("open");
				accTitle.nextElementSibling.classList.add("afterHide");
				setTimeout(() => {
					accTitle.nextElementSibling.classList.remove(
						"afterHide"
					);
				}, 400);
			}
		}
	});
}
function toggleNextElementOptions(event) {
	let currentElement = event && event.target.parentElement;
	let accTitles = document.querySelectorAll(".acc__title");
	accTitles.forEach((accTitle) => {
		let accContentStyle = accTitle.nextElementSibling.style;
		accContentStyle.height =
			accContentStyle.paddingTop =
			accContentStyle.paddingBottom =
			"0px";
		if (accTitle == currentElement) {
			if (
				accTitle.parentElement.classList.contains("ref_content")
			) {
				// console.log('Nice +');
				accContentStyle.width = accTitle.offsetWidth + "px";
			}
			if (
				!accTitle.nextElementSibling.classList.contains("open")
			) {
				hideAllAccordion(currentElement);
				accContentStyle.height =
					accTitle.nextElementSibling.scrollHeight + "px";
				accContentStyle.paddingTop =
					accContentStyle.paddingBottom = "0px";
				accTitle.nextElementSibling.addEventListener(
					"transitionend",
					() => {
						if (
							!accTitle.nextElementSibling.classList.contains(
								"afterHide"
							)
						) {
							accTitle.nextElementSibling.classList.add(
								"open"
							);
						}
					}
				);
			} else {
				accContentStyle.height =
					accContentStyle.paddingTop =
					accContentStyle.paddingBottom =
					"0px";
				accTitle.nextElementSibling.classList.remove("open");
				accTitle.nextElementSibling.classList.add("afterHide");
				setTimeout(() => {
					accTitle.nextElementSibling.classList.remove(
						"afterHide"
					);
				}, 400);
			}
		}
	});
}
export default {
	toggleNextElementList,
	toggleNextElementOptions,
}