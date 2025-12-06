package pg.projects.zenfinance.Controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pg.projects.zenfinance.DTOs.TransactionFilterRequest;
import pg.projects.zenfinance.DTOs.TransactionRequest;
import pg.projects.zenfinance.DTOs.TransactionResponse;
import pg.projects.zenfinance.Services.TransactionService;
import pg.projects.zenfinance.Services.UserService;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    UserService userService;

    @Autowired
    TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity createTransaction(@Valid @RequestBody TransactionRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if(transactionService.addTransaction(request, username))
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<List<TransactionResponse>> getAllTransactions(@PathVariable String accountId){
        List<TransactionResponse> transactions = transactionService.getAllTransactionsOfAccount(accountId);
        if(transactions == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(transactions);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAllTransactionsOfUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        List<TransactionResponse> transactions = transactionService.getAllTransactionsOfUser(username);
        if(transactions == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TransactionResponse>> getAllTransactionsOfDate(
            @Valid @RequestBody TransactionFilterRequest request
    ){
        List<TransactionResponse> transactions = transactionService.TransactionFilter(request);
        if(transactions == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(transactions);
    }

}
