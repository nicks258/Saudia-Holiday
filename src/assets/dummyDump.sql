CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT,lastname TEXT ,phonenumber TEXT, email TEXT,image TEXT,sync TEXT);
CREATE TABLE IF NOT EXISTS refer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,phonenumber TEXT,sync TEXT);
INSERT INTO people(firstname, lastname, phonenumber,email,image,sync) VALUES ('sumit', 'mehra', '8144240078','mehra@g.com','image@path','0');
INSERT INTO people(firstname, lastname, phonenumber,email,image,sync) VALUES ('Nicks', 'Neo', '931777777','mery@g.com','imag2@@path','0');
INSERT INTO people(firstname, lastname, phonenumber,email,image,sync) VALUES ('Nja', 'meOpp', '888999078','meqwa@g.com','impoag2@@path','0');
INSERT INTO refer(name, phonenumber,sync) VALUES ('NEO258', '9314871109','0');
