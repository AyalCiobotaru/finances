INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Gas",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Public Transportation",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Tolls/EZ-Pass",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Maintenance",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Motorcycle",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Tickets/Fines",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Uber",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
INSERT INTO myServer.account(id, name, parent_id, type, balance) VALUES (UUID(), "Parking",(SELECT id from myServer.parent_category pc where pc.name = "Transportation"), "Paper", 0.0);
