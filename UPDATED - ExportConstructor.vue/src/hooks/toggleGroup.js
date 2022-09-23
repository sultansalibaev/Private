export function toggleGroup(pdf, pdf_copy) {

	function toggleGrayGroup(bool = true) {
		let element = document.querySelector('.add-group');
		bool
			? element.classList.add('gray')
			: element.classList.remove('gray');
	}

	function addGroup() {
		let groupCount = pdf_copy.value.filter(el => el[0].name == "GROUP").length;
		const maxGroupCount = 4;
		const graphCount = pdf_copy.value.filter(el => el[0].type == "graph").length;
		if (groupCount < maxGroupCount && graphCount > 0) {
			pdf_copy.value.push([
				{ id: `group-${groupCount + 1}`, name: "GROUP" },
				{
					elements: [],
				},
			]);
			groupCount++;
		}
		else if (graphCount === 0) {
			alert("Добавьте график.");
		}
		if (groupCount === maxGroupCount) {
			toggleGrayGroup(true);
		}
	}

	function removeGroup(group_id) {
		const currentGroup = pdf_copy.value.find(el => el[0].id == group_id);
		const currentGroupIndex = pdf_copy.value.findIndex(el => el[0].id == group_id);
		const currentGroupElements = currentGroup[1].elements;
		pdf_copy.value.splice(currentGroupIndex, 1, ...currentGroupElements);

		toggleGrayGroup(false);
	}

	return {
		addGroup,
		removeGroup,
	};
}