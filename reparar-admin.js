const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function reparar() {
    const connection = await mysql.createConnection({
        host: 'db',
        user: 'degase',
        password: 'Degase@2026',
        database: 'portal_db'
    });

    // Gera o hash usando a biblioteca exata do projeto
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin', salt);

    try {
        // Atualiza o usuário ID 1 com o novo hash
        await connection.execute(
            "UPDATE users SET passwordHash = ?, role = 'admin', loginMethod = 'local' WHERE id = 1",
            [hash]
        );
        console.log('✅ Senha do administrador (ID 1) atualizada com sucesso!');
        
        // Verifica se o usuário existe
        const [rows] = await connection.execute("SELECT id, email FROM users WHERE id = 1");
        console.log('👤 Usuário atual:', rows[0]);
    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await connection.end();
    }
}

reparar();
