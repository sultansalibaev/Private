<template>
    <div class="sidebar-buttons w-full flex flex-col">
        <button @click="downloadReport">Скачать</button>
        <button>Сохранить шаблон</button>
    </div>
</template>

<script>
import { inject } from "vue";

export default {
    props: {
        pdf: {
            required: true
        }
    },
	setup() {
		const pdf_copy = inject('pdf_copy')

		Number.prototype.limitation = function (min, max) {
			if (this < min) return min;
			else if (this > max) return max;
			else return this;
		}
		function requestNumber(request, option, index) {
			if (option.type === "number") {
				let numberValue = parseInt(option.value)
				numberValue = numberValue.limitation(option.min, option.max);
				request[index][option.name] = numberValue;
			}
		}
		function requestSelectIndex(request, option, index) {
			if (option.type === "select" && option.outputIndex) {
				option.value.forEach(optionValue => {
					if (optionValue.selected)
						request[index][option.name] = optionValue.index;
				});
			}
		}
		function requestSelectType(request, option, index) {
			if (option.type === "select" && option.name === "type") {
				option.value.forEach(optionMap => {
					if (optionMap[0].selected) {
						request[index][option.name] = optionMap[0].name;
					}
					Object.keys(optionMap[1]).forEach(key => {
						request[index][key] = optionMap[1][key];
					});
				});
			}
		}
		function requestCheckbox(request, option, index) {
			if (option.type === "checkbox") {
				request[index][option.name] = option.value;
			}
		}
		function requestColumns(request, option, index) {
			if (option.type === "columns") {
				request[index][option.name] = [];
				option.value.forEach((column, id) => {
					let position = id + 1;
					if (!column.selected) position = 0;
					request[index][option.name].push({
						id: column.name,
						position: position,
					});
				});
			}
		}
		function requestDropdownTag(request, option, index) {
			if (option.type === "dropdown" && option.name === "tag_highlight") {
				request[index][option.name] = {};
				option.value.forEach(optionValue => {
					request[index][option.name][optionValue.name] = optionValue.value;
				});
			}
		}
		function requestDropdownOrder(request, option, index) {
			if (option.type === "dropdown" && option.name === "order") {
				request[index][option.name] = {};
				option.value.forEach(optionValue => {
					if (optionValue[0].type === "select" && optionValue[0].outputIndex) {
						optionValue[1].forEach(optionSelect => {
							if (optionSelect.selected)
								request[index][option.name][optionValue[0].name] = optionSelect.index;
						});
					}
				});
				option.draggables.forEach(optionDraggable => {
					request[index][option.name][optionDraggable[0].name] = [];
					if (optionDraggable[0].selected) {
						if (optionDraggable[0].name === "sentiments") {
							optionDraggable[1].forEach((sentiment, id) => {
								request[index][option.name][optionDraggable[0].name].splice(sentiment.defaultPosition, 0, id);
							});
						}
						else if (optionDraggable[0].name === "categories") {
							optionDraggable[1].forEach(category => {
								if (category.selected)
									request[index][option.name][optionDraggable[0].name].push(category.name);
							});
						}
					}
					else {
						request[index][option.name][optionDraggable[0].name] = 0;
					}
				});
			}
		}
		function downloadReport() {

			let copyArray = JSON.parse(JSON.stringify(pdf_copy.value))
			let request = [];
			copyArray.forEach(([key, value], index) => {
				if (key.name !== "GROUP") {
					request.push({
						id: key.name,
						position: index + 1,
					});
					if (value.length) {
						value.forEach(option => {
							requestCheckbox(request, option, index);
							requestNumber(request, option, index);
							requestSelectType(request, option, index);
							requestSelectIndex(request, option, index);
							requestColumns(request, option, index);
							requestDropdownTag(request, option, index);
							requestDropdownOrder(request, option, index);
						});
					}
				}
				else {
					if (value.elements.length) {
						value.elements.forEach(([groupKey, groupValue], groupIndex) => {
							request.push({
								id: groupKey.name,
								position: `${index + 1}_${groupIndex + 1}`,
							});
							if (groupValue.length) {
								groupValue.forEach(option => {
									requestCheckbox(request, option, index);
									requestNumber(request, option, index);
									requestSelectType(request, option, index);
									requestSelectIndex(request, option, index);
									requestColumns(request, option, index);
									requestDropdownTag(request, option, index);
									requestDropdownOrder(request, option, index);
								});
							}
						});
					}
				}
			});
			console.log(request);
		}

		return {
			downloadReport,
		}
	}
}
</script>

<style>
.sidebar-buttons button {
    background: #495f73;
    font-size: 12px;
    color: white;
    border-radius: 3px;
    margin: 15px 15px 0px 15px;
    padding: 5px;
}
</style>