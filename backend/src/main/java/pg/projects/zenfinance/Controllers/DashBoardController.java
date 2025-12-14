package pg.projects.zenfinance.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pg.projects.zenfinance.DTOs.UserEditRequest;
import pg.projects.zenfinance.DTOs.UserLoginResponse;
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

    @PostMapping("/update-user")
    public ResponseEntity<UserLoginResponse> updateUser(@RequestBody UserEditRequest editRequest){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserLoginResponse response = userService.updateUser(editRequest, username);
        if(response == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }


}
