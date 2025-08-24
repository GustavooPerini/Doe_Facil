import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../models/Page';
import { ItemResponse } from '../../models/ItemResponse';
import { ItemService } from '../../services/item.service';
import { InterestService } from '../../services/interest.service';

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

  // estado por itemId
  interestOpen: Record<number, boolean> = {};
  interestMsg: Record<number, string | undefined> = {};
  interestLoading: Record<number, boolean> = {};
  interestError: Record<number, string> = {};
  interestSuccess: Record<number, boolean> = {};

  constructor(private service: ItemService,
              private interest: InterestService,
              private router: Router) {}

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

  toggleInterest(itemId: number) {
    this.interestOpen[itemId] = !this.interestOpen[itemId];
    if (this.interestOpen[itemId]) {
      this.interestError[itemId] = '';
      this.interestSuccess[itemId] = false;
      this.interestMsg[itemId] = this.interestMsg[itemId] ?? '';
    }
  }

  sendInterest(itemId: number) {
    const msg = (this.interestMsg[itemId] || '').trim();
    if (!msg) return;
    this.interestLoading[itemId] = true;
    this.interestError[itemId] = '';
    this.interestSuccess[itemId] = false;

    this.interest.create({ itemId, message: msg }).subscribe({
      next: _ => {
        this.interestLoading[itemId] = false;
        this.interestSuccess[itemId] = true;
        // opcional: fechar o formulário e limpar mensagem
        this.interestOpen[itemId] = false;
        this.interestMsg[itemId] = '';
      },
      error: (err) => {
        this.interestLoading[itemId] = false;
        if (err?.status === 401) {
          this.router.navigate(['/login'], { queryParams: { redirect: this.router.url }});
          return;
        }
        this.interestError[itemId] = 'Não foi possível enviar o interesse';
      }
    });
  }
}