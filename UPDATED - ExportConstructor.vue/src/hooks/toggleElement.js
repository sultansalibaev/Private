export function toggleElement(pdf, pdf_copy) {

	function toggleGrayElement(elementId, elementName, bool = true) {
		let element = document.querySelector('#' + elementId);
		if (element.innerText == elementName) {
			bool
				? element.classList.add('gray')
				: element.classList.remove('gray');
		}
	}

	function addElement(elementName) {
		let addingEl = new Promise(function (resolve, reject) {
			let newEl = pdf.value.find((el) => el[0].name == elementName);
			let elementTitles = document.querySelectorAll(".acc2__title span");

			let hasElement = false;
			if (elementTitles.length !== 0) {
				for (const el of elementTitles) {

					if (el.innerText == elementName) {
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
				pdf_copy.value.push(newEl);
				let addedElementName = pdf_copy.value.find(el => el[0].name == newEl[0].name)[0].name;

				if (newEl[0].name !== 'GROUP') {
					toggleGrayElement(newEl[0].id, addedElementName);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function removeElement(elementName) {
		for (const el of pdf_copy.value) {
			if (el[0].name == "GROUP") {
				el[1].elements = el[1].elements.filter(
					(groupEl) => groupEl[0].name != elementName
				);
			}
			else {
				pdf_copy.value = pdf_copy.value.filter(
					(el) => el[0].name != elementName
				);

				toggleGrayElement(el[0].id, elementName, false);

			}
		}
	}

	return {
		addElement,
		removeElement,
	};
}