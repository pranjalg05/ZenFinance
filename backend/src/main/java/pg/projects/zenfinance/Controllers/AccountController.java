package pg.projects.zenfinance.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pg.projects.zenfinance.DTOs.AccountCreationRequest;
import pg.projects.zenfinance.DTOs.AccountResponse;
import pg.projects.zenfinance.Models.User;
import pg.projects.zenfinance.Services.AccountService;
import pg.projects.zenfinance.Services.UserService;

import java.util.List;


@RestController
@RequestMapping("/accounts")
@Slf4j
public class AccountController {

    @Autowired
    AccountService accountService;

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountCreationRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findUserByUsername(username);
        AccountResponse account = accountService.createAccount(request, user.getUserId());
        if(account == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccountResponse>> getAllAccounts(){
        log.info("Getting all accounts");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findUserByUsername(username);
        List<AccountResponse> accounts = accountService.getAllAccounts(user.getUserId());
        if(accounts == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponse> getAccountById(@PathVariable String accountId){
        AccountResponse account = accountService.getAccountById(accountId);
        if(account == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }


}
