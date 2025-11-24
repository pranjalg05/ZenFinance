package pg.projects.zenfinance.DTOs;

import pg.projects.zenfinance.Models.TransactionMode;

import java.time.LocalDate;

public record TransactionResponse(
        String transactionId,
        String accountId,
        double amount,
        TransactionMode type,
        String category,
        LocalDate createdAt
) {
}
