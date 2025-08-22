package com.projeto.doe_facil.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PageResponse<T> {

    private List<T> content;
    private Long totalElements;
    private int totalPages;
    private int number;
    private int size;

    public static <T> PageResponse<T> of(Page<T> page) {
        return PageResponse.<T>builder()
                        .content(page.getContent())
                        .totalElements(page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .number(page.getNumber())
                        .size(page.getSize())
                        .build();
    }
}
