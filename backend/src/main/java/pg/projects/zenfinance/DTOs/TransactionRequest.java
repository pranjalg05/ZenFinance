package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import pg.projects.zenfinance.Models.TransactionMode;

public record TransactionRequest(
        @NotNull String accountId,
        @NotNull @Min(1) double amount,
        @NotNull TransactionMode type,
        String category
) {
}
