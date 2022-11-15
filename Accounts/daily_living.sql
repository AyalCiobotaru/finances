INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Groceries", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Dry cleaning", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Dining Out", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Delivery_Carry-Out", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Snacks", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Coffee Shops", (SELECT id from myServer.parent_category pc where pc.name = "Daily Living"), "Paper", 0.0);
