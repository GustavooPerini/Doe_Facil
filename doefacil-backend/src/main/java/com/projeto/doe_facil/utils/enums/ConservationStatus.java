package com.projeto.doe_facil.utils.enums;

public enum ConservationStatus {
    NEW("Novo"),
    LIGHTLY_USED("Levemente Usado"),
    USED("Usado"),
    HEAVILY_USED("Usado Intensamente");

    private String status;

    ConservationStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
