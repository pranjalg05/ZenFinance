package pg.projects.zenfinance.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pg.projects.zenfinance.DTOs.*;
import pg.projects.zenfinance.Services.UserDetailServiceImpl;
import pg.projects.zenfinance.Services.UserService;
import pg.projects.zenfinance.Utils.JwtUtil;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager manager;

    @Autowired
    UserDetailServiceImpl userDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<UserRegisterResponse> signUp(@Valid @RequestBody UserRegisterRequest registerRequest){
        UserRegisterResponse response = userService.registerUser(registerRequest);
        if(response == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest request){
        try {
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    ));
            UserDetails user = userDetailsService.loadUserByUsername(request.username());
            String token = jwtUtil.generateToken(user.getUsername());
            log.info("User logged in successfully");
            UserLoginResponse response = new UserLoginResponse(user.getUsername(), token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            log.error("Error logging in", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
