import { ref, reactive } from "vue";

export let select = {
	format: reactive(ref({
		width: 112.400,
		options: [
			{
				name: "WORD",
				value: "word",
				iconClass: "fa-regular fa-file-word",
				selected: false,
			},
			{
				name: "PDF",
				value: "pdf",
				iconClass: "fa-regular fa-file-pdf",
				selected: true,
			},
			{
				name: "Excel",
				value: "excel",
				iconClass: "fa-regular fa-file-excel",
				selected: false,
			},
			{
				name: "PowerPoint",
				value: "powerpoint",
				iconClass: "fa-regular fa-file-powerpoint",
				selected: false,
			},
		]
	})),
	orientation: reactive(ref({
		width: 86.400,
		options: [
			{
				name: "Портрет",
				value: "portrait",
				selected: false,
			},
			{
				name: "Пейзаж",
				value: "landscape",
				selected: true,
			},
		]
	})),
	pdf_orientation: reactive(ref({
		width: 86.400,
		options: [
			{
				name: "Портрет",
				value: "portrait",
				selected: true,
			},
			{
				name: "Пейзаж",
				value: "landscape",
				selected: false,
			},
		]
	})),
	menu: reactive(ref({
		width: 86.400,
		options: [
			{
				name: "Проект",
				value: "project",
				selected: false,
			},
			{
				name: "Шаблон",
				value: "template",
				selected: true,
			},
		]
	}))
};


export function selectedFormat() {
	return select.format.value.options.find(option => option.selected)?.value;
}
export function selectedOrientation() {
	return select.orientation.value.options.find(option => option.selected)?.value;
}
export function selectedPDF_orientation() {
	return select.pdf_orientation.value.options.find(option => option.selected)?.value;
}
export function selectedMenu() {
	return select.menu.value.options.find(option => option.selected)?.value;
}

export function selectOption(selectName, optionName) {
	select[selectName].value.options.forEach((opt) => {
		opt.selected = opt.name == optionName;
	});
}
