source parent_category.sql
source actual.sql
source daily_living.sql
source entertainment.sql
source health.sql
source income.sql
source monthly_payments.sql
source personal.sql
source transportation.sql

INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Prev. Year Transfer", (SELECT id from myServer.parent_category pc where pc.name = "Catch-All"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Taxes", (SELECT id from myServer.parent_category pc where pc.name = "Catch-All"), "Paper", 0.0);
