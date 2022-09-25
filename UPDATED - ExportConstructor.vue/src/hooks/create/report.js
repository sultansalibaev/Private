import createPDF from "@/hooks/create/pdf";
import createWORD from "@/hooks/create/word";

export default function createReport() {
	const format = {
		pdf: createPDF(),
		word: createWORD(),
	}
	return format;
}