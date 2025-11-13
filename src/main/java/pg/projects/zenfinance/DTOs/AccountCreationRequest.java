package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record AccountCreationRequest(
        @NotBlank String userId,
        @NotBlank String accountName,
        @NotBlank @Min(0) double balance
) {
}
