INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Doctor Visit", (SELECT id from myServer.parent_category pc where pc.name = "Health"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Nutritional Items", (SELECT id from myServer.parent_category pc where pc.name = "Health"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Cleaning Service", (SELECT id from myServer.parent_category pc where pc.name = "Health"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Pharmacy", (SELECT id from myServer.parent_category pc where pc.name = "Health"), "Paper", 0.0);
