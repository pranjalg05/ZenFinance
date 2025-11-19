package pg.projects.zenfinance.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pg.projects.zenfinance.DTOs.UserSummaryResponse;
import pg.projects.zenfinance.Services.UserService;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    UserService userService;

    @GetMapping("/summary")
    public ResponseEntity<UserSummaryResponse> getUserSummary(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserSummaryResponse userSummary = userService.getUserSummary(username);
        return ResponseEntity.ok(userSummary);
    }

}
