package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AccountCreationRequest(
        @NotBlank String accountName,
        @NotNull @Min(0)  double balance
) {
}
