package com.projeto.doe_facil.utils.enums;

public enum ItemCategory {
    CLOTHING_ACCESSORIES("Acessórios de Vestuário"),
    FOOTWEAR("Calçados"),
    FURNITURE("Móveis"),
    ELETRONICS_APPLIANCES("Eletrônicos e Eletrodomésticos"),
    BOOKS_EDUCATIONAL_MATERIALS("Livros e Materiais Educacionais"),
    TOYS_GAMES("Brinquedos e Jogos"),
    KITCHEN_UTENSILS("Utensílios de Cozinha"),
    OFFICE_SCHOOL_SUPPLIES("Materiais de Escritório e Escolares"),
    PERSONAL_CARE_PRODUCTS("Produtos de Cuidado Pessoal"),
    SPORTS_LEISURE_ITEMS("Itens de Esporte e Lazer");

    private String category;

    ItemCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

}
