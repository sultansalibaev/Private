import createWORD from "@/hooks/create/word";
import createPDF from "@/hooks/create/pdf";
import createExcel from "@/hooks/create/excel";
import createPowerPoint from "@/hooks/create/powerpoint";

export default function createReport() {
	const format = {
		word: createWORD(),
		pdf: createPDF(),
		excel: createExcel(),
		powerpoint: createPowerPoint(),
	}
	return format;
}