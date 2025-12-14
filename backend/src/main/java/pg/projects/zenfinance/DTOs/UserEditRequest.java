package pg.projects.zenfinance.DTOs;

public record UserEditRequest(
        String username,
        String oldPassword,
        String password
) {
}
