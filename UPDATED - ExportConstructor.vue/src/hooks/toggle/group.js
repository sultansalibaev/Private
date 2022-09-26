export default function toggleGroup() {

	function toggleGrayGroup(bool = true) {
		let element = document.querySelector('.add-group');
		bool
			? element.classList.add('gray')
			: element.classList.remove('gray');
	}

	function addGroup(report_copy) {
		let groupCount = report_copy.filter(el => el[0].name == "GROUP").length;
		const maxGroupCount = 4;
		const graphCount = report_copy.filter(el => el[0].type == "graph").length;
		if (groupCount < maxGroupCount && graphCount > 0) {
			report_copy.push([
				{ id: `group-${groupCount + 1}`, name: "GROUP", error: "Должно быть два элемента." },
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

	function removeGroup(report_copy, group_id) {
		const currentGroup = report_copy.find(el => el[0].id == group_id);
		const currentGroupIndex = report_copy.findIndex(el => el[0].id == group_id);
		const currentGroupElements = currentGroup[1].elements;
		report_copy.splice(currentGroupIndex, 1, ...currentGroupElements);

		toggleGrayGroup(false);
	}

	return {
		addGroup,
		removeGroup,
	};
}