import { sql } from "../config/db.js";

// sql`
//   DROP TABLE videos
// `.then(() => console.log("Tabela excluida"));

sql`
  CREATE TABLE videos (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  );
`.then(() => console.log("Tabela criada"));
