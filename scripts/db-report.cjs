// db-report.js — Versão JavaScript pura, compatível com Node 20 e seu backend atual

// IMPORTANTE:
// O backend usa Drizzle com configuração em dist/_core/db.js
// Então importamos diretamente essa instância.

const { db } = require("./dist/_core/db");

// Importação das tabelas já compiladas no dist
const users = require("./dist/routers/users/schema").users;
const posts = require("./dist/routers/posts/schema").posts;
const categories = require("./dist/routers/categories/schema").categories;
const services = require("./dist/routers/services/schema").services;
const units = require("./dist/routers/units/schema").units;
const banners = require("./dist/routers/banners/schema").banners;
const menu = require("./dist/routers/menu/schema").menu;
const documents = require("./dist/routers/documents/schema").documents;
const videos = require("./dist/routers/videos/schema").videos;

async function section(title, table) {
  console.log(`\n====================`);
  console.log(`📌 ${title}`);
  console.log(`====================`);

  try {
    const rows = await db.select().from(table);
    console.log(`Total: ${rows.length}`);
    console.log(rows);
  } catch (err) {
    console.error(`Erro ao consultar ${title}:`, err.message);
  }
}

async function main() {
  console.log("\n==============================================");
  console.log("📄 RELATÓRIO COMPLETO DO BANCO DE DADOS DEGASE");
  console.log("==============================================\n");

  await section("USUÁRIOS", users);
  await section("CATEGORIAS", categories);
  await section("POSTS", posts);
  await section("SERVIÇOS", services);
  await section("UNIDADES", units);
  await section("BANNERS", banners);
  await section("MENU", menu);
  await section("DOCUMENTOS", documents);
  await section("VÍDEOS", videos);

  console.log("\nFinalizado.\n");
  process.exit(0);
}

main();