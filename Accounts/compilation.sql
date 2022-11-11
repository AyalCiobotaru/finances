source actual.sql
source daily_living.sql
source entertainment.sql
source health.sql
source income.sql
source monthly_payments.sql
source personal.sql
source transportation.sql

INSERT INTO myServer.account(id, name, parent_category, type, balance) VALUES (UUID(), "Prev. Year Transfer", "", "Paper", 0.0);
