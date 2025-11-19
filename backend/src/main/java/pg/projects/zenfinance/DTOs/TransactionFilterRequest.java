package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.NotBlank;
import pg.projects.zenfinance.Models.TransactionMode;

import java.time.LocalDate;

public record TransactionFilterRequest(
        @NotBlank String accountId,
        TransactionMode type,
        LocalDate startDate,
        LocalDate endDate
) {
}
