export default function toggleProject() {

	function addProject(report_copy) {
		let groupCount = report_copy.filter(el => el[0].name == "GROUP").length;
		let emptyGroup = report_copy.find(el => el[1].elements?.length == 0);
		if (!emptyGroup) {
			report_copy.push([
				{ id: `group-${groupCount + 1}`, name: "GROUP", projectId: "", projectName: "", error: "Не менее одного элемента в проекте." },
				{
					elements: [],
				},
			]);
			groupCount++;
		}
		else {
			document.querySelector(`.group-${groupCount}`).querySelector(`.absolute`).classList.toggle('hidden');
		}
	}

	function removeProject(report_copy, group_id) {
		const currentGroup = report_copy.find(el => el[0].id == group_id);
		const currentGroupIndex = report_copy.findIndex(el => el[0].id == group_id);
		const currentGroupElements = currentGroup[1].elements;
		report_copy.splice(currentGroupIndex, 1, ...currentGroupElements);
	}

	return {
		addProject,
		removeProject,
	};
}