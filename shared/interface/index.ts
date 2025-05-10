export interface ResponseObj<T> {
	isError: boolean;
	message: string;
	data: T;
}

export interface QueryParameters {
	perPage?: number;
	page?: number;
	id?: string;
	status?: string;
	q?: string;
	pdfName?: string;
	year?: number;
	sort?: string;
	order?: string;
}

export interface IGalleryData {
	id: number;
	attributes: IGalleryAttribute;
}

export interface IGalleryAttribute {
	eventName: string;
	date: string;
	galleryCardOrder: string;
	forAssets: IForAssets[];
}

export interface IForAssets {
	id: number;
	headingOfPicture: string;
	galleryAssets: any;
}

export interface ICommonEventContainerProps {
	mimeType: string;
	url: string;
	eventName: string;
	date: string;
	activeSection: string;
}
