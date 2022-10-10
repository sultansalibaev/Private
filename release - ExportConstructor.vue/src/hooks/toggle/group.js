import { getReportCopy } from "@/hooks/create/report_copy";


function toggleGrayGroup(bool = true) {
	let element = document.querySelector('.add-group');
	bool
		? element.classList.add('gray')
		: element.classList.remove('gray');
}

export function addGroup() {
	let report_copy = getReportCopy();
	let groupCount = report_copy.filter(el => el[0].name == "GROUP").length;
	const maxGroupCount = 5;
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

export function removeGroup(group_id) {
	let report_copy = getReportCopy();
	const currentGroup = report_copy.find(el => el[0].id == group_id);
	const currentGroupIndex = report_copy.findIndex(el => el[0].id == group_id);
	const currentGroupElements = currentGroup[1].elements;
	report_copy.splice(currentGroupIndex, 1, ...currentGroupElements);

	toggleGrayGroup(false);
}
