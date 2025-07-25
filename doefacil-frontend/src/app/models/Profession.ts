export default class Profession {
	public name: string = '';
	public href: string = '';

	constructor(obj?: any) {
		if (obj !== undefined) {
			this.updateProfession(obj);
		}
	}

	public updateProfession(object: any): void {
		this.name = object.name.toUpperCase();
		if (object._links !== undefined) {
			this.href = object._links.self.href;
		}
		else {
			this.href = object.href;
		}
	}

	public print(): void {
		console.log("Name: " + this.name);
		console.log("href: " + this.href);
	}
}
