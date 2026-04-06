const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function criarSuporte() {
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
        // Remove se já existir para evitar erro de duplicidade
        await connection.execute("DELETE FROM users WHERE email = 'suporte@degase.local'");
        
        // Insere o novo usuário com perfil 'admin'
        await connection.execute(
            "INSERT INTO users (openId, name, email, functionalId, loginMethod, passwordHash, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            ['suporte-id-001', 'Suporte Técnico', 'suporte@degase.local', 'SUP001', 'local', hash, 'admin']
        );
        console.log('✅ Usuário suporte@degase.local criado com sucesso!');
        
        // Verifica se o usuário existe e qual o seu papel (role)
        const [rows] = await connection.execute("SELECT id, email, role FROM users WHERE email = 'suporte@degase.local'");
        console.log('👤 Dados do usuário no banco:', rows[0]);
    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await connection.end();
    }
}

criarSuporte();
