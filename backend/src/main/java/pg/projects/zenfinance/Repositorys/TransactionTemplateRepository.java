package pg.projects.zenfinance.Repositorys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import pg.projects.zenfinance.DTOs.TransactionFilterRequest;
import pg.projects.zenfinance.Models.Transaction;
import pg.projects.zenfinance.Models.TransactionMode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Repository
public class TransactionTemplateRepository {

    @Autowired
    MongoTemplate mongotemplate;

    public List<Transaction> transactionFilter(TransactionFilterRequest request) {
        Query query = new Query();
        query.addCriteria(Criteria.where("accountId").is(request.accountId()));
        if (request.startDate() != null) {
            query.addCriteria(Criteria.where("createdAt").gte(request.startDate()));
        }
        if (request.endDate() != null) {
            query.addCriteria(Criteria.where("createdAt").lte(request.endDate()));
        }
        if (request.type() != null) {
            query.addCriteria(Criteria.where("type").is(request.type()));
        }
        List<Transaction> transactions = mongotemplate.find(query, Transaction.class);
        return transactions;
    }

    public List<Transaction> getTransactionOfCurrentMonth(String accountId){
        Query query = new Query();
        query.addCriteria(Criteria.where("accountId").is(accountId));
        LocalDate now = LocalDate.now();

        LocalDateTime startOfDay = now.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusMonths(1);

        query.addCriteria(Criteria.where("createdAt").gte(startOfDay).lt(endOfDay));

        return mongotemplate.find(query, Transaction.class);
    }

}
