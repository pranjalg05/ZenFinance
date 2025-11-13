package pg.projects.zenfinance.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pg.projects.zenfinance.Repositorys.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;



}
