package pg.projects.zenfinance.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pg.projects.zenfinance.DTOs.UserRegisterRequest;
import pg.projects.zenfinance.DTOs.UserRegisterResponse;
import pg.projects.zenfinance.Services.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserRegisterResponse> signUp(@Valid @RequestBody UserRegisterRequest registerRequest){
        UserRegisterResponse response = userService.saveUser(registerRequest);
        if(response == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserRegisterResponse> login(){
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

}
