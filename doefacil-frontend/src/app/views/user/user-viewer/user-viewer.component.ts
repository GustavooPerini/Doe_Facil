// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup } from "@angular/forms";
// import { PageChangedEvent } from "ngx-bootstrap/pagination";
// import { UserService } from "src/app/services/user.service";

import { Component, OnInit } from "@angular/core";
import { Page, Role, Users } from "../../../models/Users";
import { AdminUserService } from "../../../services/admin-user.service";

// @Component({
// 	selector: "app-user-viewer",
// 	templateUrl: "./user-viewer.component.html",
// 	styleUrls: [],
// 	providers: [UserService],
// })
// export class UserViewerComponent implements OnInit {

// 	public users: any[] = [];
// 	public alterationResp: string;
// 	public failureFlag: boolean = false;
// 	public selectedUser: any = {
// 		allowed: false,
// 		role: "USER",
// 	};
// 	public flagModalEdit: boolean = false;

// 	public itemsPerPage: number; // Define quantos elementos serao retornados por paginas
// 	public totalItems: number = 0; // Total de itens a ser exibidos na tabela
// 	public currentPage: number; // página atualmente selecionada
// 	public maxPageLinks: number; // maximo de links que a pagina pode exibir (os boxes com os numeros)
// 	public totalPages?: number; // o numero de paginas retornadas pela requisicao
// 	public modalLoadingFlag: boolean = false; // flag para mostrar o modal de loading

// 	public userSettingsForm: FormGroup = this.formBuilder.group({
// 		allowedAccessToAll: [],
// 		userName: [""],
// 		role: ["USER"],
// 	});

// 	constructor(private userService: UserService, private formBuilder: FormBuilder) {
// 		this.itemsPerPage = 10;
// 		this.maxPageLinks = 10;
// 		this.currentPage = 1;
// 		this.alterationResp = "";
// 	}

// 	ngOnInit() {
// 		this.modalLoadingFlag = true;
// 		this.getUsersByName(this.currentPage);
// 	}

// 	public pageChange(event: PageChangedEvent): void {
// 		this.currentPage = event.page;
// 		this.getUsersByName(this.currentPage);
// 	}

// 	public changeUserAccess(): void {
// 		this.modalLoadingFlag = true;
// 		this.selectedUser.allowed = !this.selectedUser.allowed;

// 		this.userService
// 			.changeUserAccess(
// 				this.selectedUser.allowed,
// 				this.selectedUser._links.user.href
// 			)
// 			.subscribe({
// 				next: (response) => {
// 					this.alterationResp = "allowed-saved";
// 					this.modalLoadingFlag = false;
// 				},
// 				error: (error) => {
// 					this.alterationResp = "allowed-error";
// 					console.log(error);
// 					this.modalLoadingFlag = false;
// 				},
// 			});
// 	}

// 	public setSelectedUser(user: any): void {
// 		this.selectedUser = user;
// 		this.flagModalEdit = true;
// 	}

// 	/**
// 	 * Método para fechar o modal de gerenciamento do usuário
// 	 */
// 	public closeEditModal(): void {
// 		this.flagModalEdit = false;
// 	}

// 	public changeUserRole(): void {
// 		this.modalLoadingFlag = true;
// 		this.userService
// 			.changeUserRole(
// 				this.selectedUser.role,
// 				this.selectedUser._links.user.href
// 			)
// 			.subscribe({
// 				next: (response) => {
// 					this.alterationResp = "role-saved";
// 					this.modalLoadingFlag = false;
// 				},
// 				error: (error) => {
// 					this.alterationResp = "role-error";
// 					console.log(error);
// 					this.modalLoadingFlag = false;
// 				},
// 			});
// 	}

// 	public deleteUser(user: any): void {
// 		this.modalLoadingFlag = true;
// 		this.alterationResp = "user-deleted";
// 		this.userService.delete(user._links.user.href).subscribe({
// 			next: (response) => {
// 				this.alterationResp = "user-deleted";
// 				this.getUsersByName(this.currentPage);
// 				this.modalLoadingFlag = false;
// 			},
// 			error: (error) => {
// 				this.alterationResp = "user-delete-error";
// 				this.modalLoadingFlag = false;
// 			},
// 		});
// 	}

// 	public getUsersByName(page: number) {
// 		this.modalLoadingFlag = true;
// 		console.log(this.userSettingsForm.value);
// 		this.userService.findByFullNameContaining(this.userSettingsForm.value.userName, page - 1, this.itemsPerPage).subscribe({
// 			next: (response) => {
// 				this.users = response._embedded.user as any[];
// 				this.totalItems = response.page.totalElements;
// 				this.totalPages = response.page.totalPages;
// 				this.modalLoadingFlag = false;
// 			},
// 			error: (error) => {
// 				this.failureFlag = true;
// 				this.modalLoadingFlag = false;
// 			},
// 		});

// 	}

// 	public searchUsersByName() {
// 		this.getUsersByName(this.currentPage);
// 	}
// }



@Component({
  selector: 'app-admin-users',
  templateUrl: './user-viewer.component.html',
  styleUrls: ['./user-viewer.component.scss']
})
export class UserViewerComponent implements OnInit {
  page?: Page<Users>;
  loading = false;
  error = '';

  pageIndex = 0;
  pageSize = 20;

  roles: Role[] = ['USER', 'ADMIN'];

  constructor(private svc: AdminUserService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = this.pageIndex) {
    this.loading = true; this.error = '';
    this.svc.list(page, this.pageSize).subscribe({
      next: (res) => { this.page = res; this.pageIndex = res.number; },
      error: (err) => { this.error = 'Falha ao carregar usuários'; },
      complete: () => { this.loading = false; }
    });
  }

  confirmDelete(u: Users) {
    if (!confirm(`Excluir usuário ${u.name}? Esta ação não pode ser desfeita.`)) return;
    this.svc.delete(u.id).subscribe({
      next: () => this.load(this.pageIndex),
      error: () => alert('Não foi possível excluir. Verifique dependências (itens) ou permissões.')
    });
  }

  changeRole(u: Users, role: Role) {
    if (u.role === role) return;
    this.svc.updateRole(u.id, role).subscribe({
      next: () => { u.role = role; },
      error: () => alert('Falha ao atualizar a role.')
    });
  }

  prev() { if (this.pageIndex > 0) this.load(this.pageIndex - 1); }
  next() { if (this.page && this.pageIndex < this.page.totalPages - 1) this.load(this.pageIndex + 1); }
}
