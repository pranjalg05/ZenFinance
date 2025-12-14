package pg.projects.zenfinance.DTOs;

public record UserSummaryResponse(
        String username,
        String email,
        int numberOfAccounts,
        double totalBalance,
        double incomeThisMonth,
        double expenseThisMonth
) {
}
