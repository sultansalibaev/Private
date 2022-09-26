import { ref, reactive } from "vue";

export default function createSelect() {
	const
		format = reactive(ref({
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
		orientation = reactive(ref({
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
		}));
	return {
		format,
		orientation,
	}
}