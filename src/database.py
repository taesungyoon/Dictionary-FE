import sqlite3

database_path = "dict_database.db"

conn = sqlite3.connect(database_path)

cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS wordnet_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        synset_id TEXT,
        pos TEXT,
        lemma TEXT,
        sense_key TEXT
    );
''')

conn.commit()
conn.close()
