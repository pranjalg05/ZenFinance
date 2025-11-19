package pg.projects.zenfinance.DTOs;

import java.time.LocalDate;

public record UserRegisterResponse(
        String userId,
        String username,
        String email,
        LocalDate createdAt
) {
}
