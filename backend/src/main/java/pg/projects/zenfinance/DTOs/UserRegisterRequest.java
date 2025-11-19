package pg.projects.zenfinance.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterRequest(
        @NotBlank @Size(min = 3, max = 15) String username,
        @NotBlank @Email String email,
        @NotBlank String password
) {}