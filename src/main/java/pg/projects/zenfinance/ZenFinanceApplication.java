package pg.projects.zenfinance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class ZenFinanceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZenFinanceApplication.class, args);
    }

}
