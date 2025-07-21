package com.projeto.doe_facil.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String imageSrc;

    @Column(nullable = false)
    private String conservationStatus;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street", column = @Column(nullable = false)),
        @AttributeOverride(name = "hoseNumber", column = @Column(nullable = false)),
        @AttributeOverride(name = "addInfo", column = @Column(nullable = true)),
        @AttributeOverride(name = "neighborhood", column = @Column(nullable = false)),
        @AttributeOverride(name = "city", column = @Column(nullable = false)),
        @AttributeOverride(name = "state", column = @Column(nullable = false)),
        @AttributeOverride(name = "refPoint", column = @Column(nullable = true)),
        @AttributeOverride(name = "cep", column = @Column(nullable = false))
    })
    private Location location;

    @Column(nullable = false)
    private boolean donated;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getConservationStatus() {
        return conservationStatus;
    }

    public void setConservationStatus(String conservationStatus) {
        this.conservationStatus = conservationStatus;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
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
