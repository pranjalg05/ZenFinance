package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AccountResponse(
        @NotNull String accountId,
        @NotNull String accountName,
        @NotNull double balance,
        LocalDate createdAt
) {
}
