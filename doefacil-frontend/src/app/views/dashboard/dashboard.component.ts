import { Component } from '@angular/core';
import { Page } from '../../models/Page';
import { ItemResponse } from '../../models/ItemResponse';
import { ItemService } from '../../services/item.service';


@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  page?: Page<ItemResponse>;
  loading = false;
  error = '';
  size = 12;

  constructor(private service: ItemService) {}

  ngOnInit(): void { this.load(0); }

  load(page: number) {
    this.loading = true; this.error = '';
    this.service.list(page, this.size).subscribe({
      next: (p) => { this.page = p; this.loading = false; },
      error: _ => { this.error = 'Falha ao carregar itens'; this.loading = false; }
    });
  }

  prev() { if (this.page && this.page.number > 0) this.load(this.page.number - 1); }
  next() { if (this.page && this.page.number < this.page.totalPages - 1) this.load(this.page.number + 1); }
}