package com.projeto.doe_facil.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Location {
    
    private String street;

    private String houseNumber;

    private String addInfo; // Complemento

    private String neighborhood;

    private String city;

    private String state;

    private String refPoint; // Ponto de referência

    private String cep;

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

}
