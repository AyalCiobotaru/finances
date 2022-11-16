INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "CACI", (SELECT id from myServer.parent_category pc where pc.name = "Career"), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "CACI Contr.", (SELECT id from myServer.parent_category pc where pc.name = "Career"), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Various Income", (SELECT id from myServer.parent_category pc where pc.name = "Misc."), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Volleyball Winnings", (SELECT id from myServer.parent_category pc where pc.name = "Misc."), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Savings Interest", (SELECT id from myServer.parent_category pc where pc.name = "Interest"), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Checking Interest", (SELECT id from myServer.parent_category pc where pc.name = "Interest"), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Gifts-R", (SELECT id from myServer.parent_category pc where pc.name = "Misc."), "Income", 0.0);
INSERT INTO myServer.account (id, name, parent_id, type, balance) VALUES (uuid(),  "Cashback", (SELECT id from myServer.parent_category pc where pc.name = "Misc."), "Income", 0.0);
