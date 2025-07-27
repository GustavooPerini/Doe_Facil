package com.projeto.doe_facil.model;

import com.projeto.doe_facil.utils.enums.ConservationStatus;
import com.projeto.doe_facil.utils.enums.ItemCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Classe que representa a entidade de um item que será cadastrado no sistema.
 * @author Gustavo Perini.
 */
@Entity
public class ItemModel {
    
    /**
     * Id que será gerado e salvo no banco. 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Título do anúncio.
     */
    @Column(nullable = false)
    private String title;

    /**
     * Descrição do anúncio.
     */
    @Column(nullable = false)
    private String description;

    /**
     * Categoria do item anunciado.
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemCategory category;

    /**
     * Caminho de onde está salva a imagem do item.
     */
    @Column(nullable = false)
    private String imageSrc;

    /**
     * Estado de conservação do item.
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ConservationStatus conservationStatus;

    /**
     * Rua onde está localizado o item.
     */
    @Column(nullable = false)
    private String street;

    /**
     * Número da casa onde está localizado o item.
     */
    @Column(nullable = false)
    private String houseNumber;

    /**
     * Complemento do endereço onde está localizado o item.
     */
    @Column(nullable = true)
    private String addInfo;

    /**
     * Bairro onde está localizado o item.
     */
    @Column(nullable = false)
    private String neighborhood;

    /**
     * Cidade onde está localizado o item.
     */
    @Column(nullable = false)
    private String city;

    /**
     * Estado onde está localizado o item.
     */
    @Column(nullable = false)
    private String state;

    /**
     * Ponto de referência do endereço onde está localizado o item.
     */
    @Column(nullable = true)
    private String refPoint;

    /**
     * Cep de onde está localizado o item.
     */
    @Column(nullable = false)
    private String cep;

    /**
     * Indica se este item já foi doado ou não.
     */
    @Column(nullable = false)
    private boolean donated;

    /**
     * Indica quem é o dono deste item.
     */
    @ManyToOne
    @JoinColumn(name = "owner")
    private UserModel owner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public ConservationStatus getConservationStatus() {
        return conservationStatus;
    }

    public void setConservationStatus(ConservationStatus conservationStatus) {
        this.conservationStatus = conservationStatus;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getAddInfo() {
        return addInfo;
    }

    public void setAddInfo(String addInfo) {
        this.addInfo = addInfo;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRefPoint() {
        return refPoint;
    }

    public void setRefPoint(String refPoint) {
        this.refPoint = refPoint;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public boolean isDonated() {
        return donated;
    }

    public void setDonated(boolean donated) {
        this.donated = donated;
    }

    public UserModel getOwner() {
        return owner;
    }

    public void setOwner(UserModel owner) {
        this.owner = owner;
    }
}
