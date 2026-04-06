const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

async function atualizarSenha() {
  const connection = await mysql.createConnection({
    host: "db",
    user: "degase",
    password: "Degase@2026",
    database: "portal_db",
  });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("admin", salt);

  try {
    const [rows] = await connection.execute(
      "UPDATE users SET passwordHash = ? WHERE email = ?",
      [hash, "admin@degase.local"]
    );

    if (rows.affectedRows > 0) {
      console.log("✅ Senha do usuário administrador atualizada com sucesso!");
    } else {
      console.log("❌ Usuário 'admin@degase.local' não encontrado. Nenhum dado alterado.");
    }
  } catch (error) {
    console.error("❌ Erro ao atualizar senha:", error.message);
  } finally {
    await connection.end();
  }
}

atualizarSenha();
