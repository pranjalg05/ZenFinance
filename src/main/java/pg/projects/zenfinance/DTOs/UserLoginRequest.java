package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.NotBlank;

public record UserLoginRequest(
        @NotBlank String username,
        @NotBlank String password
) {
}
