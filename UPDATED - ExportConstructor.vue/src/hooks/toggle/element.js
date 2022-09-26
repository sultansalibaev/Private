export default function toggleElement() {

	function toggleGrayElement(elementId, elementName, bool = true) {
		let element = document.querySelector('#' + elementId);
		if (element.innerText == elementName) {
			bool
				? element.classList.add('gray')
				: element.classList.remove('gray');
		}
	}

	function addElement(report_copy, pdf, elementName, isPowerPoint) {
		let addingEl = new Promise(function (resolve, reject) {
			let newEl = pdf.find((el) => el[0].name == elementName);
			let elementTitles = document.querySelectorAll(".acc2__title span");

			let hasElement = false;
			if (elementTitles.length !== 0) {
				for (const el of elementTitles) {

					if (el.innerText == elementName && !isPowerPoint) {
						hasElement = true;
					}
				}
			}

			if (hasElement) {
				reject(`${elementName} уже добавлен!`);
			} else {
				resolve(newEl);
			}
		});

		addingEl
			.then((newEl) => {
				report_copy.push(newEl);
				let addedElementName = report_copy.find(el => el[0].name == newEl[0].name)[0].name;

				if (newEl[0].name !== 'GROUP' && !isPowerPoint) {
					toggleGrayElement(newEl[0].id, addedElementName);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function removeElement(report_copy, elementName) {
		for (const el of report_copy) {
			let reportArr = report_copy;
			if (el[0].name == "GROUP" && !!el[1].elements) reportArr = el[1].elements;

			let removedElement = reportArr.find(el => el[0].name == elementName);
			if (removedElement && removedElement[0].id) {
				const currentElementIndex = reportArr.findIndex(el => el[0].name == elementName);
				if (currentElementIndex != -1) {
					reportArr.splice(currentElementIndex, 1);
				}

				toggleGrayElement(removedElement[0].id, elementName, false);
			}

		}
	}

	return {
		addElement,
		removeElement,
	};
}