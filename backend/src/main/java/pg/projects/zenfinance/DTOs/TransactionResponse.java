package pg.projects.zenfinance.DTOs;

import pg.projects.zenfinance.Models.TransactionMode;

public record TransactionResponse(
        String transactionId,
        String accountId,
        double amount,
        TransactionMode type,
        String category
) {
}
