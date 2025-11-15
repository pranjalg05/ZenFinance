package pg.projects.zenfinance.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pg.projects.zenfinance.DTOs.AccountCreationRequest;
import pg.projects.zenfinance.Services.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("create")
    public ResponseEntity createAccount(@Valid @RequestBody AccountCreationRequest request) {

        return ResponseEntity.ok().body(null);
    }

}
