import { Component } from "@angular/core";
import { ItemResponse } from "../../../models/ItemResponse";
import { ItemService } from "../../../services/item.service";
import { Page } from "../../../models/Page";
import { InterestService, InterestView } from "../../../services/interest.service";

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

	modalOpen = false;
  	modalItem?: ItemResponse;
	interests: Record<number, InterestView[]> = {};
	interestsLoading: Record<number, boolean> = {};
	interestsError: Record<number, string> = {};
	decisionLoading: Record<number, boolean> = {};

	constructor(private itemService: ItemService, private interestService: InterestService) {}

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

	openInterestsModal(item: ItemResponse) {
		this.modalItem = item;
		this.modalOpen = true;
		if (!this.interests[item.id]) {
		this.loadInterests(item.id);
		}
  	}

	closeModal() {
		this.modalOpen = false;
		this.modalItem = undefined;
  	}

  loadInterests(itemId: number) {
    this.interestsLoading[itemId] = true;
    this.interestsError[itemId] = '';
    this.interestService.listByItem(itemId).subscribe({
      next: (list) => {
        this.interests[itemId] = list;
        this.interestsLoading[itemId] = false;
      },
      error: _ => {
        this.interestsError[itemId] = 'Falha ao carregar interessados';
        this.interestsLoading[itemId] = false;
      }
    });
  }

  decide(interestId: number, itemId: number, accept: boolean) {
    this.decisionLoading[interestId] = true;
    this.interestService.decide(interestId, accept).subscribe({
      next: _ => {
        this.decisionLoading[interestId] = false;
        // Recarrega a lista para refletir o novo status
        this.loadInterests(itemId);
      },
      error: _ => {
        this.decisionLoading[interestId] = false;
        this.interestsError[itemId] = 'Falha ao enviar decisão';
      }
    });
  }

}
