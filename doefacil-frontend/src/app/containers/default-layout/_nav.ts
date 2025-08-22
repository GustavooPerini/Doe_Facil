import { INavData } from "@coreui/angular";
import { IconComponent } from "@coreui/icons-angular";

/**
 * Aqui são definidos os itens do menu lateral. Cada item tem um nome, uma url, um ícone e pode ter filhos.
 * A maneira que o menu lateral aparece é definida no arquivo default-layout.component.html.
 * O menu deve ser diferente de acordo com a ROLE do usuário. Por exemplo, um usuário com ROLE_SUPER, tem acesso a tudo.
 * Por conta disso, existe uma variação de navItems para cada ROLE.
 */

// ##################################################################################################################
// ROLE_SUPER
// ##################################################################################################################
export const navItems: INavData[] = [
	{
		name: "Home",
		url: "/dashboard",
		iconComponent: { name: "cil-home" },
	},

	{
		title: true,
		name: "SISTEMA",
	},
	{
		name: "Usuário",
		url: "dashboard/usuario",
		iconComponent: { name: "cil-contact" },
		children: [
			// {
			// 	name: "Adicionar",
			// 	url: "/dashboard/usuario/novo",
			// 	iconComponent: { name: "" },
			// },
			{
				name: "Gerenciar",
				url: "/dashboard/usuario/visualizar",
				iconComponent: { name: "" },
			},
			{
				name: "Meus dados",
				url: "/dashboard/usuario/editar",
				iconComponent: { name: "" },
			},
		],
	},
	// {
	// 	name: "Cadastrar",
	// 	url: "dashboard/cadastrar",
	// 	iconComponent: { name: "cilAddressBook" },
	// 	children: [
	// 		{
	// 			name: "Mulher",
	// 			url: "/dashboard/cadastrar/mulher",
	// 			iconComponent: { name: "" },
	// 		},
	// 		{
	// 			name: "Criança",
	// 			url: "/dashboard/cadastrar/criança",
	// 			iconComponent: { name: "" },
	// 		}
	// 	],
	// },
	{
		name: "Item",
		url:"dashboard/item",
		iconComponent: { name: "cilInbox" },
		children: [
			{
				name: "Anúnciar Item",
				url:"/dashboard/item/novo",
			},
			{
				name: "Itens Anunciados",
				url:"/dashboard/item/itens_anunciados",
			},
			{
				name: "Itens Recebidos",
				url:"/dashboard/item/itens_recebidos",
			},
		]
	}
];

// ##################################################################################################################
// ROLE_ADMIN
// ##################################################################################################################

export const navItemsRoleAdmin: INavData[] = [
	{
		name: "Home",
		url: "/dashboard",
		iconComponent: { name: "cil-home" },
	},

	{
		title: true,
		name: "SISTEMA",
	},
	{
		name: "Usuário",
		url: "dashboard/usuario",
		iconComponent: { name: "cil-contact" },
		children: [
			{
				name: "Adicionar",
				url: "/dashboard/usuario/novo",
				iconComponent: { name: "" },
			},
			{
				name: "Gerenciar",
				url: "/dashboard/usuario/visualizar",
				iconComponent: { name: "" },
			},
			{
				name: "Meus dados",
				url: "/dashboard/usuario/editar",
				iconComponent: { name: "" },
			},
		],
	},
	{
		name: "Cadastrar",
		url: "dashboard/usuario",
		iconComponent: { name: "cil-contact" },
		children: [
			{
				name: "Adicionar",
				url: "/dashboard/usuario/novo",
				iconComponent: { name: "" },
			},
			{
				name: "Gerenciar",
				url: "/dashboard/usuario/visualizar",
				iconComponent: { name: "" },
			},
		],
	},
];

// ##################################################################################################################
// ROLE_USER
// ##################################################################################################################

export const navItemsRoleUser: INavData[] = [
	{
		name: "Home",
		url: "/dashboard",
		iconComponent: { name: "cil-home" },
	},
	{
		title: true,
		name: "SISTEMA",
	},
	{
		name: "Usuário",
		url: "dashboard/usuario",
		iconComponent: { name: "cil-contact" },
		children: [
			{
				name: "Meus dados",
				url: "/dashboard/usuario/editar",
				iconComponent: { name: "" },
			},
		],
	},
];