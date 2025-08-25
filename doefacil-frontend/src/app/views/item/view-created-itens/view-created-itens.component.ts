import { Component } from "@angular/core";
import { ItemResponse } from "../../../models/ItemResponse";
import { ItemService } from "../../../services/item.service";
import { Page } from "../../../models/Page";

@Component({
	selector: "app-view-created-itens",
	templateUrl: "./view-created-itens.component.html",
  styleUrls: ['./view-created-itens.component.scss'] // Adicione esta linha
})
export class ViewCreatedItensComponent {
	page?: Page<ItemResponse>;
	loading = false;
	error = "";
	size = 12;

	constructor(private itemService: ItemService) {}

	ngOnInit(): void {
		this.load(0);
	}

	load(page: number) {
		this.loading = true;
		this.error = "";
		this.itemService.listMyItems(page, this.size).subscribe({
			next: (p) => {
				this.page = p;
				this.loading = false;
			},
			error: (_) => {
				this.error = "Falha ao carregar seus itens";
				this.loading = false;
			},
		});
	}

	prev() {
		if (this.page && this.page.number > 0) {
			this.load(this.page.number - 1);
		}
	}

	next() {
		if (this.page && this.page.number < this.page.totalPages - 1) {
			this.load(this.page.number + 1);
		}
	}
}
