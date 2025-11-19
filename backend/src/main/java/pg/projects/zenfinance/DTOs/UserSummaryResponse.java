package pg.projects.zenfinance.DTOs;

public record UserSummaryResponse(
        String username,
        int numberOfAccounts,
        double totalBalance,
        double incomeThisMonth,
        double expenseThisMonth
) {
}
