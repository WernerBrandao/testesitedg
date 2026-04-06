const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function criarAdmin() {
    const connection = await mysql.createConnection({
        host: 'db',
        user: 'degase',
        password: 'Degase@2026',
        database: 'portal_db'
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin', salt);

    try {
        // Limpa tentativas anteriores para evitar erro de duplicidade
        await connection.execute("DELETE FROM users WHERE email = 'admin@degase.local'");
        
        await connection.execute(
            "INSERT INTO users (openId, name, email, functionalId, loginMethod, passwordHash, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ['admin-manual-id', 'Administrador', 'admin@degase.local', 'ADMIN001', 'local', hash, 'admin']
        );
        console.log('✅ Usuário administrador criado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao criar usuário:', error.message);
    } finally {
        await connection.end();
    }
}

criarAdmin();
