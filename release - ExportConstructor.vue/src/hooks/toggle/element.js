import { getReportCopy } from "@/hooks/create/report_copy";
import { selectedFormat } from "../create/select";


function toggleGrayElement(elementId, elementName, bool = true) {
	console.log(elementId);
	let element = document.querySelector('#' + elementId);
	if (element.getAttribute("data-name") == elementName) {
		bool
			? element.classList.add('gray')
			: element.classList.remove('gray');
	}
}

export function addElement(pdf, elementName, isPowerPoint, newId) {
	let report_copy = getReportCopy();
	let addingEl = new Promise(function (resolve, reject) {
		const independence_copy = JSON.parse(JSON.stringify(pdf));
		let newEl = independence_copy.find((el) => el[0].name == elementName);
		let elementTitles = document.querySelectorAll(".acc2__title span");

		let hasElement = false;
		if (elementTitles.length !== 0) {
			for (const el of elementTitles) {

				if (el.getAttribute("data-name") == elementName && !isPowerPoint) {
					hasElement = true;
				}
			}
		}

		if (hasElement) {
			reject(`${elementName} уже добавлен!`);
		} else {
			if (isPowerPoint) {
				newEl[0].id += newId;
				console.log(newEl[0].id);
			}
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

export function removeElement(elementName, newId) {
	const isPowerPoint = selectedFormat() == 'powerpoint'
	let report_copy = getReportCopy();
	for (const el of report_copy) {
		let reportArr = report_copy;
		if (el[0].name == "GROUP" && !!el[1].elements) reportArr = el[1].elements;

		let removedElement = reportArr.find(el => el[0].id == newId);
		if (removedElement && removedElement[0].id) {
			const currentElementIndex = reportArr.findIndex(el => el[0].id == newId);
			if (currentElementIndex != -1) {
				reportArr.splice(currentElementIndex, 1);
				if (!isPowerPoint) toggleGrayElement(removedElement[0].id, elementName, false);
				return;
			}

		}

	}
}