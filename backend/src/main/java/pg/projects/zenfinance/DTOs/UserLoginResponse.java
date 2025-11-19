package pg.projects.zenfinance.DTOs;

public record UserLoginResponse(
        String username,
        String token
) {
}
