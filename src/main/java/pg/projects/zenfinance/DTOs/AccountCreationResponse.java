package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AccountCreationResponse(
        @NotNull String accountId,
        @NotNull String ownerName,
        @NotNull String accountName,
        @NotNull double balance,
        LocalDate createdAt
) {
}
