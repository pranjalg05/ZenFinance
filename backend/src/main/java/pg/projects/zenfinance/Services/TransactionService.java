package pg.projects.zenfinance.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.DTOs.TransactionFilterRequest;
import pg.projects.zenfinance.DTOs.TransactionRequest;
import pg.projects.zenfinance.DTOs.TransactionResponse;
import pg.projects.zenfinance.Models.Account;
import pg.projects.zenfinance.Models.Transaction;
import pg.projects.zenfinance.Models.TransactionMode;
import pg.projects.zenfinance.Repositorys.AccountRepository;
import pg.projects.zenfinance.Repositorys.TransactionRepository;
import pg.projects.zenfinance.Repositorys.TransactionTemplateRepository;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionTemplateRepository transactionTemplateRepository;

    @Autowired
    AccountRepository accountRepository;

    public boolean addTransaction(TransactionRequest request, String userId){

        Account account = accountRepository.findAccountByAccountId(request.accountId());

        if(request.type()== TransactionMode.EXPENSE){
            if(account.getBalance() < request.amount()){
                return false;
            }
        }

        account.setBalance(account.getBalance() + (request.type()==TransactionMode.EXPENSE? -request.amount() : request.amount()));
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountId(request.accountId());
        transaction.setAmount(request.amount());
        transaction.setType(request.type());
        transaction.setCategory(
                request.category() == null || request.category().isEmpty() ? "General" : request.category()
        );
        transaction.setUserId(userId);
        transactionRepository.save(transaction);
        return true;
    }

    public List<TransactionResponse> getAllTransactionsOfAccount(String accountId){
        List<Transaction> transactionRecords = transactionRepository.getTransactionsByAccountId(accountId);
        if(transactionRecords == null){ return null; }
        return transactionRecords.stream().map(this::toResponse).toList();
    }

    private TransactionResponse toResponse(Transaction t){
        return new TransactionResponse(
                t.getTransactionId(),
                t.getAccountId(),
                t.getAmount(),
                t.getType(),
                t.getCategory(),
                t.getCreatedAt()
        );
    }

    public List<TransactionResponse> TransactionFilter(TransactionFilterRequest request){
        List<Transaction> transactionOfDate = transactionTemplateRepository.transactionFilter(request);
        if(transactionOfDate == null){ return null; }
        return transactionOfDate.stream().map(this::toResponse).toList();
    }



}
