var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";
var users, categories, tags, posts, postTags, pages, banners, videos, transparencyItems, units, siteConfig, postHistory, pageHistory, colorThemes, comments, mediaLibrary, analytics, socialMediaShares, services, serviceAnalytics, serviceClickLog, documentCategories, documents, documentVersions, documentDownloads, documentDownloadStats, pageBlocks, pageBlockItems, imagesBank, menuItems, postViewLimits, socialShares, passwordResetTokens, auditLogs, menuAccessPermissions;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      //openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      functionalId: varchar("functionalId", { length: 64 }),
      // ID Funcional do usuário
      //loginMethod: varchar("loginMethod", { length: 64 }),
      passwordHash: text("passwordHash"),
      // Hash da senha (bcrypt)
      role: mysqlEnum("role", ["user", "admin", "contributor"]).default("user").notNull(),
      categoryId: int("categoryId"),
      // Para contributors: categoria que podem editar
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    categories = mysqlTable("categories", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      description: text("description"),
      color: varchar("color", { length: 7 }),
      icon: varchar("icon", { length: 64 }),
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    tags = mysqlTable("tags", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      slug: varchar("slug", { length: 128 }).notNull().unique(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    posts = mysqlTable("posts", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 500 }).notNull(),
      slug: varchar("slug", { length: 500 }).notNull().unique(),
      excerpt: text("excerpt"),
      content: text("content").notNull(),
      featuredImage: text("featuredImage"),
      categoryId: int("categoryId"),
      authorId: int("authorId"),
      status: mysqlEnum("status", ["draft", "published", "archived", "scheduled"]).default("draft").notNull(),
      publishedAt: timestamp("publishedAt"),
      scheduledAt: timestamp("scheduledAt"),
      // Data/hora agendada para publicação
      isScheduled: boolean("isScheduled").default(false).notNull(),
      isFeatured: boolean("isFeatured").default(false).notNull(),
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      viewCount: int("viewCount").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    postTags = mysqlTable("post_tags", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull(),
      tagId: int("tagId").notNull()
    });
    pages = mysqlTable("pages", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 500 }).notNull(),
      slug: varchar("slug", { length: 500 }).notNull().unique(),
      content: text("content").notNull(),
      excerpt: text("excerpt"),
      featuredImage: text("featuredImage"),
      parentId: int("parentId"),
      sortOrder: int("sortOrder").default(0).notNull(),
      status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
      showInMenu: boolean("showInMenu").default(false).notNull(),
      menuLabel: varchar("menuLabel", { length: 128 }),
      authorId: int("authorId"),
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    banners = mysqlTable("banners", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      subtitle: text("subtitle"),
      imageUrl: text("imageUrl").notNull(),
      linkUrl: text("linkUrl"),
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    videos = mysqlTable("videos", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 500 }).notNull(),
      youtubeUrl: text("youtubeUrl").notNull(),
      description: text("description"),
      thumbnailUrl: text("thumbnailUrl"),
      isFeatured: boolean("isFeatured").default(false).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      sortOrder: int("sortOrder").default(0).notNull(),
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    transparencyItems = mysqlTable("transparency_items", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      linkUrl: text("linkUrl"),
      icon: varchar("icon", { length: 64 }),
      section: varchar("section", { length: 128 }).notNull(),
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    units = mysqlTable("units", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 500 }).notNull(),
      type: mysqlEnum("type", ["internacao", "internacao_provisoria", "semiliberdade", "meio_aberto"]).notNull(),
      address: text("address"),
      phone: varchar("phone", { length: 64 }),
      email: varchar("email", { length: 320 }),
      visitDays: text("visitDays"),
      mapsUrl: text("mapsUrl"),
      isActive: boolean("isActive").default(true).notNull(),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    siteConfig = mysqlTable("site_config", {
      id: int("id").autoincrement().primaryKey(),
      configKey: varchar("configKey", { length: 128 }).notNull().unique(),
      configValue: text("configValue"),
      description: text("description"),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    postHistory = mysqlTable("post_history", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull(),
      title: varchar("title", { length: 500 }).notNull(),
      excerpt: text("excerpt"),
      content: text("content").notNull(),
      featuredImage: text("featuredImage"),
      status: mysqlEnum("status", ["draft", "published", "archived", "scheduled"]).default("draft").notNull(),
      isFeatured: boolean("isFeatured").default(false).notNull(),
      editorId: int("editorId"),
      changeDescription: varchar("changeDescription", { length: 500 }),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    pageHistory = mysqlTable("page_history", {
      id: int("id").autoincrement().primaryKey(),
      pageId: int("pageId").notNull(),
      title: varchar("title", { length: 500 }).notNull(),
      content: text("content").notNull(),
      excerpt: text("excerpt"),
      featuredImage: text("featuredImage"),
      status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
      menuLabel: varchar("menuLabel", { length: 255 }),
      showInMenu: boolean("showInMenu").default(false).notNull(),
      editorId: int("editorId"),
      changeDescription: varchar("changeDescription", { length: 500 }),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    colorThemes = mysqlTable("color_themes", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      // Cores principais
      primaryColor: varchar("primaryColor", { length: 7 }).default("#003366").notNull(),
      // Azul DEGASE
      secondaryColor: varchar("secondaryColor", { length: 7 }).default("#D4AF37").notNull(),
      // Dourado
      accentColor: varchar("accentColor", { length: 7 }).default("#0066CC").notNull(),
      // Azul claro
      // Cores de texto
      textColor: varchar("textColor", { length: 7 }).default("#333333").notNull(),
      textLightColor: varchar("textLightColor", { length: 7 }).default("#666666").notNull(),
      // Cores de fundo
      backgroundColor: varchar("backgroundColor", { length: 7 }).default("#FFFFFF").notNull(),
      surfaceColor: varchar("surfaceColor", { length: 7 }).default("#F5F5F5").notNull(),
      // Cores de busca
      searchBgColor: varchar("searchBgColor", { length: 7 }).default("#003366").notNull(),
      searchTextColor: varchar("searchTextColor", { length: 7 }).default("#FFFFFF").notNull(),
      searchBorderColor: varchar("searchBorderColor", { length: 7 }).default("#D4AF37").notNull(),
      // Status
      isActive: boolean("isActive").default(false).notNull(),
      isDefault: boolean("isDefault").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    comments = mysqlTable("comments", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull(),
      authorName: varchar("authorName", { length: 255 }).notNull(),
      authorEmail: varchar("authorEmail", { length: 320 }).notNull(),
      content: text("content").notNull(),
      status: mysqlEnum("status", ["pending", "approved", "rejected", "spam"]).default("pending").notNull(),
      moderatedBy: int("moderatedBy"),
      // ID do usuário que moderou
      moderationReason: text("moderationReason"),
      // Motivo da rejeição
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mediaLibrary = mysqlTable("media_library", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      url: text("url").notNull(),
      // URL do S3
      fileKey: varchar("fileKey", { length: 500 }).notNull(),
      // Chave do arquivo no S3
      fileType: mysqlEnum("fileType", ["image", "video"]).notNull(),
      mimeType: varchar("mimeType", { length: 100 }).notNull(),
      fileSize: int("fileSize"),
      // Tamanho em bytes
      width: int("width"),
      // Para imagens
      height: int("height"),
      // Para imagens
      duration: int("duration"),
      // Para vídeos em segundos
      uploadedBy: int("uploadedBy").notNull(),
      // ID do usuário que fez upload
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    analytics = mysqlTable("analytics", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId"),
      pageUrl: varchar("pageUrl", { length: 1024 }),
      viewCount: int("viewCount").default(0).notNull(),
      uniqueVisitors: int("uniqueVisitors").default(0).notNull(),
      avgTimeOnPage: int("avgTimeOnPage").default(0).notNull(),
      bounceRate: int("bounceRate").default(0).notNull(),
      date: timestamp("date").defaultNow().notNull()
    });
    socialMediaShares = mysqlTable("social_media_shares", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull(),
      platform: varchar("platform", { length: 50 }).notNull(),
      externalId: varchar("externalId", { length: 255 }),
      status: varchar("status", { length: 50 }).default("pending").notNull(),
      errorMessage: text("errorMessage"),
      sharedAt: timestamp("sharedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    services = mysqlTable("services", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      icon: varchar("icon", { length: 500 }).notNull(),
      // URL da imagem do ícone
      link: varchar("link", { length: 1024 }).notNull(),
      color: varchar("color", { length: 7 }).default("#0066CC").notNull(),
      // Cor do card em hex
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    serviceAnalytics = mysqlTable("service_analytics", {
      id: int("id").autoincrement().primaryKey(),
      serviceId: int("serviceId").notNull().references(() => services.id, { onDelete: "cascade" }),
      clickCount: int("clickCount").default(0).notNull(),
      lastClickedAt: timestamp("lastClickedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    serviceClickLog = mysqlTable("service_click_log", {
      id: int("id").autoincrement().primaryKey(),
      serviceId: int("serviceId").notNull().references(() => services.id, { onDelete: "cascade" }),
      userAgent: varchar("userAgent", { length: 500 }),
      referer: varchar("referer", { length: 1024 }),
      ipAddress: varchar("ipAddress", { length: 45 }),
      clickedAt: timestamp("clickedAt").defaultNow().notNull()
    });
    documentCategories = mysqlTable("document_categories", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      description: text("description"),
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    documents = mysqlTable("documents", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      categoryId: int("categoryId").notNull().references(() => documentCategories.id, { onDelete: "restrict" }),
      fileUrl: varchar("fileUrl", { length: 1024 }).notNull(),
      fileKey: varchar("fileKey", { length: 1024 }).notNull(),
      // Chave no S3
      fileSize: int("fileSize").notNull(),
      // Tamanho em bytes
      mimeType: varchar("mimeType", { length: 100 }).notNull(),
      uploadedBy: int("uploadedBy").notNull().references(() => users.id, { onDelete: "restrict" }),
      isActive: boolean("isActive").default(true).notNull(),
      isFeatured: boolean("isFeatured").default(false).notNull(),
      // Destaque na home
      sortOrder: int("sortOrder").default(0).notNull(),
      // Ordem de exibição em destaque
      visibility: mysqlEnum("visibility", ["site", "intranet", "both"]).default("site").notNull(),
      // Visibilidade: site, intranet ou ambos
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    documentVersions = mysqlTable("document_versions", {
      id: int("id").autoincrement().primaryKey(),
      documentId: int("documentId").notNull().references(() => documents.id, { onDelete: "cascade" }),
      versionNumber: int("versionNumber").notNull(),
      fileUrl: varchar("fileUrl", { length: 1024 }).notNull(),
      fileKey: varchar("fileKey", { length: 1024 }).notNull(),
      fileSize: int("fileSize").notNull(),
      mimeType: varchar("mimeType", { length: 100 }).notNull(),
      uploadedBy: int("uploadedBy").notNull().references(() => users.id, { onDelete: "restrict" }),
      changeDescription: text("changeDescription"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    documentDownloads = mysqlTable("document_downloads", {
      id: int("id").autoincrement().primaryKey(),
      documentId: int("documentId").notNull().references(() => documents.id, { onDelete: "cascade" }),
      versionId: int("versionId").references(() => documentVersions.id, { onDelete: "cascade" }),
      userAgent: varchar("userAgent", { length: 500 }),
      ipAddress: varchar("ipAddress", { length: 45 }),
      downloadedAt: timestamp("downloadedAt").defaultNow().notNull()
    });
    documentDownloadStats = mysqlTable("document_download_stats", {
      id: int("id").autoincrement().primaryKey(),
      documentId: int("documentId").notNull().references(() => documents.id, { onDelete: "cascade" }),
      totalDownloads: int("totalDownloads").default(0).notNull(),
      lastDownloadedAt: timestamp("lastDownloadedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    pageBlocks = mysqlTable("page_blocks", {
      id: int("id").autoincrement().primaryKey(),
      pageId: int("pageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
      blockType: mysqlEnum("blockType", ["services", "documentCategories", "images", "text", "html"]).notNull(),
      title: varchar("title", { length: 255 }),
      description: text("description"),
      sortOrder: int("sortOrder").default(0).notNull(),
      config: json("config"),
      // Configurações específicas do bloco (filtros, limites, etc)
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    pageBlockItems = mysqlTable("page_block_items", {
      id: int("id").autoincrement().primaryKey(),
      blockId: int("blockId").notNull().references(() => pageBlocks.id, { onDelete: "cascade" }),
      itemType: mysqlEnum("itemType", ["service", "documentCategory", "image"]).notNull(),
      itemId: int("itemId"),
      // ID do serviço, categoria de documento ou imagem
      sortOrder: int("sortOrder").default(0).notNull(),
      customData: json("customData"),
      // Dados customizados (título override, descrição, etc)
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    imagesBank = mysqlTable("images_bank", {
      id: int("id").autoincrement().primaryKey(),
      url: varchar("url", { length: 1024 }).notNull(),
      fileKey: varchar("fileKey", { length: 1024 }).notNull(),
      fileName: varchar("fileName", { length: 255 }).notNull(),
      fileSize: int("fileSize").notNull(),
      mimeType: varchar("mimeType", { length: 100 }).notNull(),
      width: int("width"),
      height: int("height"),
      alt: varchar("alt", { length: 255 }),
      title: varchar("title", { length: 255 }),
      sourceType: mysqlEnum("sourceType", ["post", "service", "document", "banner", "manual"]).notNull(),
      sourceId: int("sourceId"),
      // ID da fonte (post ID, service ID, etc)
      uploadedBy: int("uploadedBy").notNull().references(() => users.id, { onDelete: "restrict" }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    menuItems = mysqlTable("menuItems", {
      id: int("id").autoincrement().primaryKey(),
      label: varchar("label", { length: 255 }).notNull(),
      linkType: mysqlEnum("linkType", ["internal", "external"]).notNull().default("internal"),
      internalPageId: int("internalPageId").references(() => pages.id, { onDelete: "set null" }),
      externalUrl: varchar("externalUrl", { length: 1024 }),
      parentId: int("parentId").references(() => menuItems.id, { onDelete: "cascade" }),
      sortOrder: int("sortOrder").default(0).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      openInNewTab: boolean("openInNewTab").default(false).notNull(),
      isColumnTitle: boolean("isColumnTitle").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    postViewLimits = mysqlTable("post_view_limits", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
      ipAddress: varchar("ipAddress", { length: 45 }).notNull(),
      viewedAt: timestamp("viewedAt").defaultNow().notNull()
    });
    socialShares = mysqlTable("social_shares", {
      id: int("id").autoincrement().primaryKey(),
      postId: int("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
      platform: varchar("platform", { length: 50 }).notNull(),
      // 'whatsapp', 'facebook', 'twitter'
      ipAddress: varchar("ipAddress", { length: 45 }).notNull(),
      userAgent: varchar("userAgent", { length: 500 }),
      sharedAt: timestamp("sharedAt").defaultNow().notNull()
    });
    passwordResetTokens = mysqlTable("password_reset_tokens", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
      token: varchar("token", { length: 255 }).notNull().unique(),
      expiresAt: timestamp("expiresAt").notNull(),
      usedAt: timestamp("usedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    auditLogs = mysqlTable("audit_logs", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
      action: varchar("action", { length: 64 }).notNull(),
      // 'create_user', 'update_user', 'delete_user', 'change_password', etc
      entityType: varchar("entityType", { length: 64 }).notNull(),
      // 'user', 'post', 'category', etc
      entityId: int("entityId"),
      // ID da entidade afetada
      changes: text("changes"),
      // JSON com antes/depois dos dados
      ipAddress: varchar("ipAddress", { length: 45 }),
      userAgent: varchar("userAgent", { length: 500 }),
      status: varchar("status", { length: 20 }).default("success").notNull(),
      // 'success', 'failed'
      errorMessage: text("errorMessage"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    menuAccessPermissions = mysqlTable("menu_access_permissions", {
      id: int("id").autoincrement().primaryKey(),
      role: mysqlEnum("role", ["user", "admin", "contributor"]).notNull(),
      menuItemId: int("menuItemId").notNull(),
      canAccess: boolean("canAccess").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/db.ts
import { eq, or, desc, asc, and, sql, inArray, ilike, gte, lte, getTableColumns, isNull, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function getUserByEmail(email) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function updateUser(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set(data).where(eq(users.id, id));
  return db.select().from(users).where(eq(users.id, id)).limit(1).then((r) => r[0]);
}
async function listCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(asc(categories.sortOrder));
}
async function getCategoryBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}
async function createCategory(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(categories).values(data);
  return result[0].insertId;
}
async function updateCategory(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(categories).set(data).where(eq(categories.id, id));
}
async function deleteCategory(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(categories).where(eq(categories.id, id));
}
async function listTags() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tags).orderBy(asc(tags.name));
}
async function createTag(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(tags).values(data);
  return result[0].insertId;
}
async function deleteTag(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(postTags).where(eq(postTags.tagId, id));
  await db.delete(tags).where(eq(tags.id, id));
}
async function listPosts(opts = {}) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (opts.status) conditions.push(eq(posts.status, opts.status));
  if (opts.categoryId) conditions.push(eq(posts.categoryId, opts.categoryId));
  if (opts.featured) conditions.push(eq(posts.isFeatured, true));
  if (opts.visibility) {
    conditions.push(
      inArray(
        posts.visibility,
        opts.visibility === "both" ? ["both", "site", "intranet"] : [opts.visibility, "both"]
      )
    );
  }
  if (opts.search) {
    const term = `%${opts.search.toLowerCase()}%`;
    conditions.push(
      or(
        sql`LOWER(${posts.title}) LIKE ${term}`,
        sql`LOWER(${posts.excerpt}) LIKE ${term}`,
        sql`LOWER(${posts.content}) LIKE ${term}`
      )
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : void 0;
  const [items, countResult] = await Promise.all([
    db.select().from(posts).where(where).orderBy(desc(posts.publishedAt), desc(posts.createdAt)).limit(opts.limit ?? 20).offset(opts.offset ?? 0),
    db.select({ count: sql`count(*)` }).from(posts).where(where)
  ]);
  items.forEach((p) => {
    p.excerpt = p.excerpt ?? "";
    p.content = p.content ?? "";
    p.featuredImage = p.featuredImage ?? "";
  });
  return { items, total: countResult[0]?.count ?? 0 };
}
async function getPostBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  const post = result[0];
  if (!post) return void 0;
  post.excerpt = post.excerpt ?? "";
  post.content = post.content ?? "";
  post.featuredImage = post.featuredImage ?? "";
  return post;
}
async function getPostById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const post = result[0];
  if (!post) return void 0;
  post.excerpt = post.excerpt ?? "";
  post.content = post.content ?? "";
  post.featuredImage = post.featuredImage ?? "";
  return post;
}
async function createPost(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(posts).values(data);
  const postId = result[0].insertId;
  const row = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  const post = row[0];
  post.excerpt = post.excerpt ?? "";
  post.content = post.content ?? "";
  post.featuredImage = post.featuredImage ?? "";
  return post;
}
async function updatePost(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(posts).set(data).where(eq(posts.id, id));
  const row = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const post = row[0];
  post.excerpt = post.excerpt ?? "";
  post.content = post.content ?? "";
  post.featuredImage = post.featuredImage ?? "";
  return post;
}
async function deletePost(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(postTags).where(eq(postTags.postId, id));
  await db.delete(posts).where(eq(posts.id, id));
}
async function listPages(opts = {}) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts.status) conditions.push(eq(pages.status, opts.status));
  if (opts.showInMenu !== void 0) conditions.push(eq(pages.showInMenu, opts.showInMenu));
  const where = conditions.length > 0 ? and(...conditions) : void 0;
  return db.select().from(pages).where(where).orderBy(asc(pages.sortOrder));
}
async function getPageBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return result[0];
}
async function getPageById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
  return result[0];
}
async function createPage(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(pages).values(data);
  const pageId = result[0].insertId;
  const page = await db.select().from(pages).where(eq(pages.id, pageId)).limit(1);
  return page[0];
}
async function updatePage(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(pages).set(data).where(eq(pages.id, id));
  return getPageById(id);
}
async function deletePage(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(pages).where(eq(pages.id, id));
}
async function listBanners(activeOnly = false, visibility) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (activeOnly) conditions.push(eq(banners.isActive, true));
  if (visibility) {
    conditions.push(
      inArray(
        banners.visibility,
        visibility === "both" ? ["both", "site", "intranet"] : [visibility, "both"]
      )
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : void 0;
  return db.select().from(banners).where(where).orderBy(asc(banners.sortOrder));
}
async function createBanner(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(banners).values(data);
  return result[0].insertId;
}
async function updateBanner(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(banners).set(data).where(eq(banners.id, id));
}
async function deleteBanner(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(banners).where(eq(banners.id, id));
}
async function listVideos(activeOnly = false, visibility) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (activeOnly) conditions.push(eq(videos.isActive, true));
  if (visibility) {
    conditions.push(
      inArray(
        videos.visibility,
        visibility === "both" ? ["both", "site", "intranet"] : [visibility, "both"]
      )
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : void 0;
  return db.select().from(videos).where(where).orderBy(asc(videos.sortOrder));
}
async function createVideo(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(videos).values(data);
  return result[0].insertId;
}
async function updateVideo(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(videos).set(data).where(eq(videos.id, id));
}
async function deleteVideo(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(videos).where(eq(videos.id, id));
}
async function listTransparencyItems(section) {
  const db = await getDb();
  if (!db) return [];
  const where = section ? and(eq(transparencyItems.section, section), eq(transparencyItems.isActive, true)) : eq(transparencyItems.isActive, true);
  return db.select().from(transparencyItems).where(where).orderBy(asc(transparencyItems.sortOrder));
}
async function createTransparencyItem(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(transparencyItems).values(data);
  return result[0].insertId;
}
async function updateTransparencyItem(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(transparencyItems).set(data).where(eq(transparencyItems.id, id));
}
async function deleteTransparencyItem(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(transparencyItems).where(eq(transparencyItems.id, id));
}
async function listUnits(type) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(units.isActive, true)];
  if (type) conditions.push(eq(units.type, type));
  return db.select().from(units).where(and(...conditions)).orderBy(asc(units.sortOrder), asc(units.name));
}
async function createUnit(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(units).values(data);
  return result[0].insertId;
}
async function updateUnit(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(units).set(data).where(eq(units.id, id));
}
async function deleteUnit(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(units).where(eq(units.id, id));
}
async function getSiteConfig(key) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(siteConfig).where(eq(siteConfig.configKey, key)).limit(1);
  return result[0]?.configValue;
}
async function setSiteConfig(key, value, description) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(siteConfig).values({ configKey: key, configValue: value, description }).onDuplicateKeyUpdate({ set: { configValue: value } });
}
async function getAllSiteConfig() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteConfig);
}
async function searchContent(query, limit = 20) {
  const db = await getDb();
  if (!db) return { posts: [], pages: [] };
  const searchTerm = `%${query.toLowerCase()}%`;
  const [postResults, pageResults] = await Promise.all([
    db.select().from(posts).where(
      and(
        eq(posts.status, "published"),
        or(
          sql`LOWER(${posts.title}) LIKE ${searchTerm}`,
          sql`LOWER(${posts.content}) LIKE ${searchTerm}`,
          sql`LOWER(${posts.excerpt}) LIKE ${searchTerm}`
        )
      )
    ).orderBy(desc(posts.publishedAt)).limit(limit),
    db.select().from(pages).where(
      and(
        eq(pages.status, "published"),
        or(
          sql`LOWER(${pages.title}) LIKE ${searchTerm}`,
          sql`LOWER(${pages.content}) LIKE ${searchTerm}`
        )
      )
    ).orderBy(asc(pages.sortOrder)).limit(limit)
  ]);
  return { posts: postResults, pages: pageResults };
}
async function listUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(users.createdAt);
}
async function getUserById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function updateUserRole(id, role, categoryId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set({ role, categoryId }).where(eq(users.id, id));
}
async function deleteUser(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(users).where(eq(users.id, id));
}
async function updateUserPassword(id, passwordHash) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set({ passwordHash, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
}
async function createPostHistory(postId, post) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(postHistory).values({
    ...post,
    postId
  });
}
async function getPostHistory(postId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(postHistory).where(eq(postHistory.postId, postId)).orderBy(desc(postHistory.createdAt));
}
async function getPostHistoryById(historyId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(postHistory).where(eq(postHistory.id, historyId)).limit(1);
  return result[0];
}
async function revertPostToVersion(postId, historyId, editorId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const version = await getPostHistoryById(historyId);
  if (!version || version.postId !== postId) {
    throw new Error("Version not found");
  }
  const currentPost = await getPostById(postId);
  if (currentPost) {
    await createPostHistory(postId, {
      title: currentPost.title,
      excerpt: currentPost.excerpt,
      content: currentPost.content,
      featuredImage: currentPost.featuredImage,
      status: currentPost.status,
      isFeatured: currentPost.isFeatured,
      editorId,
      changeDescription: `Revertido para vers\xE3o de ${version.createdAt.toLocaleDateString("pt-BR")}`
    });
  }
  await db.update(posts).set({
    title: version.title,
    excerpt: version.excerpt,
    content: version.content,
    featuredImage: version.featuredImage,
    status: version.status,
    isFeatured: version.isFeatured,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(posts.id, postId));
}
async function createPageHistory(pageId, page) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(pageHistory).values({
    ...page,
    pageId
  });
}
async function getPageHistory(pageId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(pageHistory).where(eq(pageHistory.pageId, pageId)).orderBy(desc(pageHistory.createdAt));
}
async function getPageHistoryById(historyId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(pageHistory).where(eq(pageHistory.id, historyId)).limit(1);
  return result[0];
}
async function revertPageToVersion(pageId, historyId, editorId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const version = await getPageHistoryById(historyId);
  if (!version || version.pageId !== pageId) {
    throw new Error("Version not found");
  }
  const currentPage = await getPageById(pageId);
  if (currentPage) {
    await createPageHistory(pageId, {
      title: currentPage.title,
      content: currentPage.content,
      excerpt: currentPage.excerpt,
      featuredImage: currentPage.featuredImage,
      status: currentPage.status,
      menuLabel: currentPage.menuLabel,
      showInMenu: currentPage.showInMenu,
      editorId,
      changeDescription: `Revertido para vers\xE3o de ${version.createdAt.toLocaleDateString("pt-BR")}`
    });
  }
  await db.update(pages).set({
    title: version.title,
    content: version.content,
    excerpt: version.excerpt,
    featuredImage: version.featuredImage,
    status: version.status,
    menuLabel: version.menuLabel,
    showInMenu: version.showInMenu,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(pages.id, pageId));
}
async function createColorTheme(theme) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(colorThemes).values(theme);
  return result;
}
async function getColorThemes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(colorThemes).orderBy(desc(colorThemes.createdAt));
}
async function getActiveColorTheme() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(colorThemes).where(eq(colorThemes.isActive, true)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function updateColorTheme(id, theme) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(colorThemes).set({
    ...theme,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(colorThemes.id, id));
}
async function activateColorTheme(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(colorThemes).set({ isActive: false });
  await db.update(colorThemes).set({ isActive: true }).where(eq(colorThemes.id, id));
}
async function deleteColorTheme(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(colorThemes).where(eq(colorThemes.id, id));
}
async function createComment(comment) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(comments).values(comment);
  return result;
}
async function getPostComments(postId, onlyApproved = true) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(comments.postId, postId)];
  if (onlyApproved) {
    conditions.push(eq(comments.status, "approved"));
  }
  return db.select().from(comments).where(and(...conditions)).orderBy(desc(comments.createdAt));
}
async function getPendingComments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comments).where(eq(comments.status, "pending")).orderBy(desc(comments.createdAt));
}
async function updateCommentStatus(id, status, moderatedBy, reason) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(comments).set({
    status,
    moderatedBy,
    moderationReason: reason,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(comments.id, id));
}
async function deleteComment(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(comments).where(eq(comments.id, id));
}
async function createMediaItem(media) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(mediaLibrary).values(media);
  return result;
}
async function getMediaLibrary(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.createdAt)).limit(limit).offset(offset);
}
async function getMediaByType(fileType, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mediaLibrary).where(eq(mediaLibrary.fileType, fileType)).orderBy(desc(mediaLibrary.createdAt)).limit(limit).offset(offset);
}
async function getMediaById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(mediaLibrary).where(eq(mediaLibrary.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function updateMediaItem(id, media) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mediaLibrary).set({
    ...media,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(mediaLibrary.id, id));
}
async function deleteMediaItem(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}
async function searchPosts(query, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  const searchLower = query.toLowerCase();
  const searchTerm = `%${searchLower}%`;
  return db.select().from(posts).where(
    and(
      eq(posts.status, "published"),
      or(
        ilike(posts.title, searchTerm),
        ilike(posts.content, searchTerm),
        ilike(posts.excerpt, searchTerm)
      )
    )
  ).limit(limit).orderBy(desc(posts.createdAt));
}
async function createService(service) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(services).values(service);
  return result;
}
async function listServices(activeOnly = true, visibility) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (activeOnly) conditions.push(eq(services.isActive, true));
  if (visibility) conditions.push(inArray(services.visibility, visibility === "both" ? ["both", "site", "intranet"] : [visibility, "both"]));
  const where = conditions.length > 0 ? and(...conditions) : void 0;
  return db.select().from(services).where(where).orderBy(asc(services.sortOrder));
}
async function getServiceById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function updateService(id, service) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(services).set({
    ...service,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(services.id, id));
}
async function deleteService(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(services).where(eq(services.id, id));
}
async function recordServiceClick(serviceId, userAgent, referer, ipAddress) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(serviceClickLog).values({
    serviceId,
    userAgent,
    referer,
    ipAddress
  });
  const existing = await db.select().from(serviceAnalytics).where(eq(serviceAnalytics.serviceId, serviceId)).limit(1);
  if (existing.length > 0) {
    await db.update(serviceAnalytics).set({
      clickCount: (existing[0].clickCount || 0) + 1,
      lastClickedAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(serviceAnalytics.serviceId, serviceId));
  } else {
    await db.insert(serviceAnalytics).values({
      serviceId,
      clickCount: 1,
      lastClickedAt: /* @__PURE__ */ new Date()
    });
  }
}
async function getAllServicesAnalytics() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    service: services,
    analytics: serviceAnalytics
  }).from(services).leftJoin(serviceAnalytics, eq(services.id, serviceAnalytics.serviceId)).orderBy(desc(serviceAnalytics.clickCount));
}
async function listDocumentCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documentCategories).where(eq(documentCategories.isActive, true)).orderBy(asc(documentCategories.sortOrder));
}
async function createDocumentCategory(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(documentCategories).values(data);
  const id = result[0].insertId;
  return db.select().from(documentCategories).where(eq(documentCategories.id, Number(id))).limit(1).then((r) => r[0]);
}
async function updateDocumentCategory(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(documentCategories).set(data).where(eq(documentCategories.id, id));
  return db.select().from(documentCategories).where(eq(documentCategories.id, id)).limit(1).then((r) => r[0]);
}
async function deleteDocumentCategory(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(documentCategories).where(eq(documentCategories.id, id));
}
async function listDocumentsByCategory(categoryId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documents).where(and(eq(documents.categoryId, categoryId), eq(documents.isActive, true))).orderBy(desc(documents.createdAt));
}
async function createDocument(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(documents).values(data);
  const id = result[0].insertId;
  return db.select().from(documents).where(eq(documents.id, Number(id))).limit(1).then((r) => r[0]);
}
async function updateDocument(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(documents).set(data).where(eq(documents.id, id));
  return db.select().from(documents).where(eq(documents.id, id)).limit(1).then((r) => r[0]);
}
async function deleteDocument(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(documents).where(eq(documents.id, id));
}
async function getDocumentsWithCategories() {
  const db = await getDb();
  if (!db) return [];
  const results = await db.select({
    ...getTableColumns(documents),
    category: {
      id: documentCategories.id,
      name: documentCategories.name,
      description: documentCategories.description
    }
  }).from(documents).innerJoin(documentCategories, eq(documents.categoryId, documentCategories.id)).where(and(eq(documents.isActive, true), eq(documentCategories.isActive, true))).orderBy(asc(documentCategories.sortOrder), desc(documents.createdAt));
  return results;
}
async function createDocumentVersion(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(documentVersions).values(data);
  const id = result[0].insertId;
  return db.select().from(documentVersions).where(eq(documentVersions.id, Number(id))).limit(1).then((r) => r[0]);
}
async function getDocumentVersions(documentId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documentVersions).where(eq(documentVersions.documentId, documentId)).orderBy(desc(documentVersions.versionNumber));
}
async function getNextVersionNumber(documentId) {
  const db = await getDb();
  if (!db) return 1;
  const result = await db.select({ maxVersion: sql`MAX(${documentVersions.versionNumber})` }).from(documentVersions).where(eq(documentVersions.documentId, documentId));
  const maxVersion = result[0]?.maxVersion || 0;
  return maxVersion + 1;
}
async function recordDocumentDownload(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(documentDownloads).values(data);
  const stats = await db.select().from(documentDownloadStats).where(eq(documentDownloadStats.documentId, data.documentId)).limit(1);
  if (stats.length > 0) {
    await db.update(documentDownloadStats).set({ totalDownloads: sql`totalDownloads + 1`, lastDownloadedAt: /* @__PURE__ */ new Date() }).where(eq(documentDownloadStats.documentId, data.documentId));
  } else {
    await db.insert(documentDownloadStats).values({
      documentId: data.documentId,
      totalDownloads: 1,
      lastDownloadedAt: /* @__PURE__ */ new Date()
    });
  }
}
async function getDocumentDownloadStats(documentId) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(documentDownloadStats).where(eq(documentDownloadStats.documentId, documentId)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function getAllDocumentDownloadStats() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documentDownloadStats).orderBy(desc(documentDownloadStats.totalDownloads));
}
async function searchDocuments(query) {
  const db = await getDb();
  if (!db) return [];
  const searchPattern = `%${query}%`;
  return db.select().from(documents).where(and(
    or(
      ilike(documents.name, searchPattern),
      ilike(documents.description, searchPattern)
    ),
    eq(documents.isActive, true)
  )).orderBy(desc(documents.createdAt));
}
async function getFeaturedDocuments(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    ...getTableColumns(documents),
    category: {
      id: documentCategories.id,
      name: documentCategories.name
    }
  }).from(documents).leftJoin(documentCategories, eq(documents.categoryId, documentCategories.id)).where(and(
    eq(documents.isFeatured, true),
    eq(documents.isActive, true)
  )).orderBy(asc(documents.sortOrder), desc(documents.createdAt)).limit(limit);
}
async function searchDocumentsAdvanced(filters) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(documents.isActive, true)];
  if (filters.query) {
    const searchPattern = `%${filters.query}%`;
    conditions.push(or(
      ilike(documents.name, searchPattern),
      ilike(documents.description, searchPattern)
    ));
  }
  if (filters.categoryId) {
    conditions.push(eq(documents.categoryId, filters.categoryId));
  }
  if (filters.minSize !== void 0) {
    conditions.push(gte(documents.fileSize, filters.minSize));
  }
  if (filters.maxSize !== void 0) {
    conditions.push(lte(documents.fileSize, filters.maxSize));
  }
  if (filters.startDate) {
    conditions.push(gte(documents.createdAt, filters.startDate));
  }
  if (filters.endDate) {
    conditions.push(lte(documents.createdAt, filters.endDate));
  }
  return db.select().from(documents).where(and(...conditions)).orderBy(desc(documents.createdAt));
}
async function getRecentDocuments(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documents).where(eq(documents.isActive, true)).orderBy(desc(documents.createdAt)).limit(limit);
}
async function getMostDownloadedDocuments(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    ...getTableColumns(documents),
    downloadCount: documentDownloadStats.totalDownloads
  }).from(documents).leftJoin(documentDownloadStats, eq(documents.id, documentDownloadStats.documentId)).where(eq(documents.isActive, true)).orderBy(desc(documentDownloadStats.totalDownloads)).limit(limit);
}
async function updateDocumentOrder(documentId, sortOrder) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update document order: database not available");
    return;
  }
  try {
    await db.update(documents).set({ sortOrder }).where(eq(documents.id, documentId));
  } catch (error) {
    console.error("[Database] Error updating document order:", error);
    throw error;
  }
}
async function reorderFeaturedDocuments(documentOrders) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot reorder documents: database not available");
    return;
  }
  try {
    for (const { id, sortOrder } of documentOrders) {
      await db.update(documents).set({ sortOrder }).where(eq(documents.id, id));
    }
  } catch (error) {
    console.error("[Database] Error reordering documents:", error);
    throw error;
  }
}
async function getFeaturedDocumentsOrdered(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    ...getTableColumns(documents),
    category: {
      id: documentCategories.id,
      name: documentCategories.name
    }
  }).from(documents).innerJoin(documentCategories, eq(documents.categoryId, documentCategories.id)).where(and(eq(documents.isFeatured, true), eq(documents.isActive, true))).orderBy(asc(documents.sortOrder)).limit(limit);
}
async function createPageBlock(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pageBlocks).values(data);
  const id = result[0].insertId;
  return db.select().from(pageBlocks).where(eq(pageBlocks.id, Number(id))).limit(1).then((r) => r[0]);
}
async function getPageBlocks(pageId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pageBlocks).where(eq(pageBlocks.pageId, pageId)).orderBy(asc(pageBlocks.sortOrder));
}
async function updatePageBlock(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(pageBlocks).set(data).where(eq(pageBlocks.id, id));
  return db.select().from(pageBlocks).where(eq(pageBlocks.id, id)).limit(1).then((r) => r[0]);
}
async function deletePageBlock(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(pageBlocks).where(eq(pageBlocks.id, id));
}
async function createPageBlockItem(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pageBlockItems).values(data);
  const id = result[0].insertId;
  return db.select().from(pageBlockItems).where(eq(pageBlockItems.id, Number(id))).limit(1).then((r) => r[0]);
}
async function getPageBlockItems(blockId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pageBlockItems).where(eq(pageBlockItems.blockId, blockId)).orderBy(asc(pageBlockItems.sortOrder));
}
async function deletePageBlockItem(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(pageBlockItems).where(eq(pageBlockItems.id, id));
}
async function getImagesBank(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(imagesBank).orderBy(desc(imagesBank.createdAt)).limit(limit).offset(offset);
}
async function getImagesBySourceType(sourceType) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(imagesBank).where(eq(imagesBank.sourceType, sourceType)).orderBy(desc(imagesBank.createdAt));
}
async function deleteImageFromBank(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(imagesBank).where(eq(imagesBank.id, id));
}
async function getMenuItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(menuItems).orderBy(menuItems.parentId, menuItems.sortOrder);
}
async function getMenuItemsHierarchy() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const items = await db.select().from(menuItems).orderBy(menuItems.parentId, menuItems.sortOrder);
  const itemsMap = /* @__PURE__ */ new Map();
  const rootItems = [];
  items.forEach((item) => {
    itemsMap.set(item.id, { ...item, children: [] });
  });
  items.forEach((item) => {
    if (item.parentId === null) {
      rootItems.push(itemsMap.get(item.id));
    } else {
      const parent = itemsMap.get(item.parentId);
      if (parent) {
        parent.children.push(itemsMap.get(item.id));
      }
    }
  });
  return rootItems;
}
async function createMenuItem(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const cleanData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value === null ? void 0 : value])
  );
  const result = await db.insert(menuItems).values(cleanData);
  return result;
}
async function updateMenuItem(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(menuItems).set(data).where(eq(menuItems.id, id));
  return await db.select().from(menuItems).where(eq(menuItems.id, id)).limit(1);
}
async function deleteMenuItem(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(menuItems).where(eq(menuItems.id, id));
}
async function updateMenuItemOrder(items) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const item of items) {
    await db.update(menuItems).set({ parentId: item.parentId, sortOrder: item.sortOrder }).where(eq(menuItems.id, item.id));
  }
}
async function getAnalyticsMetrics(range) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = /* @__PURE__ */ new Date();
  let startDate = /* @__PURE__ */ new Date();
  if (range === "7days") startDate.setDate(now.getDate() - 7);
  else if (range === "30days") startDate.setDate(now.getDate() - 30);
  else if (range === "90days") startDate.setDate(now.getDate() - 90);
  else startDate = /* @__PURE__ */ new Date(0);
  const serviceAnalyticsData = await db.select().from(serviceAnalytics).where(range === "all" ? void 0 : gte(serviceAnalytics.createdAt, startDate));
  const totalClicks = serviceAnalyticsData.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  return {
    totalViews: totalClicks || 0,
    totalClicks: totalClicks || 0,
    viewsGrowth: 12,
    // Placeholder
    clicksGrowth: 8,
    // Placeholder
    averageEngagement: totalClicks > 0 ? 5 : 0
  };
}
async function getTopPostsByViews(limit = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const topServices = await db.select({
    id: services.id,
    title: services.name,
    clicks: sql`COALESCE(SUM(${serviceAnalytics.clickCount}), 0)`
  }).from(services).leftJoin(serviceAnalytics, eq(services.id, serviceAnalytics.serviceId)).groupBy(services.id, services.name).orderBy(desc(sql`COALESCE(SUM(${serviceAnalytics.clickCount}), 0)`)).limit(limit);
  return topServices;
}
async function getEngagementTrend(range) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = /* @__PURE__ */ new Date();
  let startDate = /* @__PURE__ */ new Date();
  if (range === "7days") startDate.setDate(now.getDate() - 7);
  else if (range === "30days") startDate.setDate(now.getDate() - 30);
  else if (range === "90days") startDate.setDate(now.getDate() - 90);
  else startDate = /* @__PURE__ */ new Date(0);
  const data = await db.select({
    date: sql`DATE(${serviceAnalytics.createdAt})`,
    clicks: sql`COALESCE(SUM(${serviceAnalytics.clickCount}), 0)`
  }).from(serviceAnalytics).where(range === "all" ? void 0 : gte(serviceAnalytics.createdAt, startDate)).groupBy(sql`DATE(${serviceAnalytics.createdAt})`).orderBy(asc(sql`DATE(${serviceAnalytics.createdAt})`));
  return data.map((item) => ({
    date: item.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    views: item.clicks || 0,
    clicks: item.clicks || 0
  }));
}
async function recordPostView(postId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  if (!post || post.length === 0) throw new Error("Post not found");
  await db.update(posts).set({ viewCount: (post[0].viewCount || 0) + 1 }).where(eq(posts.id, postId));
  return { success: true };
}
async function getDocumentCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(documentCategories).where(eq(documentCategories.isActive, true)).orderBy(asc(documentCategories.sortOrder));
}
async function getFeaturedDocumentsByCategory(categoryId, limit = 3, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [
    eq(documents.isActive, true)
  ];
  if (categoryId) {
    conditions.push(eq(documents.categoryId, categoryId));
  }
  return db.select({
    ...getTableColumns(documents),
    category: {
      id: documentCategories.id,
      name: documentCategories.name
    }
  }).from(documents).leftJoin(documentCategories, eq(documents.categoryId, documentCategories.id)).where(and(...conditions)).orderBy(asc(documents.sortOrder), desc(documents.createdAt)).limit(limit).offset(offset);
}
async function hasViewedInLast24Hours(postId, ipAddress) {
  const db = await getDb();
  if (!db) return false;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1e3);
  const result = await db.select().from(postViewLimits).where(
    and(
      eq(postViewLimits.postId, postId),
      eq(postViewLimits.ipAddress, ipAddress),
      gte(postViewLimits.viewedAt, twentyFourHoursAgo)
    )
  ).limit(1);
  return result.length > 0;
}
async function recordPostViewWithLimit(postId, ipAddress) {
  const db = await getDb();
  if (!db) return false;
  try {
    const hasViewed = await hasViewedInLast24Hours(postId, ipAddress);
    if (hasViewed) {
      return false;
    }
    await db.insert(postViewLimits).values({
      postId,
      ipAddress
    });
    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    if (post.length > 0) {
      await db.update(posts).set({ viewCount: (post[0].viewCount || 0) + 1 }).where(eq(posts.id, postId));
    }
    return true;
  } catch (error) {
    console.error("[Database] Failed to record post view with limit:", error);
    return false;
  }
}
async function getTrendingPosts(days = 7, limit = 5) {
  const db = await getDb();
  if (!db) return [];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  return db.select({
    ...getTableColumns(posts),
    author: {
      id: users.id,
      name: users.name
    },
    category: {
      id: categories.id,
      name: categories.name
    }
  }).from(posts).leftJoin(users, eq(posts.authorId, users.id)).leftJoin(categories, eq(posts.categoryId, categories.id)).where(
    and(
      eq(posts.status, "published"),
      gte(posts.publishedAt, startDate)
    )
  ).orderBy(desc(posts.viewCount)).limit(limit);
}
async function getPostEngagementTrend(postId, days = 7) {
  const db = await getDb();
  if (!db) return { viewsByDay: [], sharesByDay: [] };
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  const viewsByDay = await db.select({
    date: sql`DATE(${postViewLimits.viewedAt})`,
    count: sql`COUNT(*)`
  }).from(postViewLimits).where(
    and(
      eq(postViewLimits.postId, postId),
      gte(postViewLimits.viewedAt, startDate)
    )
  ).groupBy(sql`DATE(${postViewLimits.viewedAt})`).orderBy(asc(sql`DATE(${postViewLimits.viewedAt})`));
  const sharesByDay = await db.select({
    date: sql`DATE(${socialShares.sharedAt})`,
    count: sql`COUNT(*)`
  }).from(socialShares).where(
    and(
      eq(socialShares.postId, postId),
      gte(socialShares.sharedAt, startDate)
    )
  ).groupBy(sql`DATE(${socialShares.sharedAt})`).orderBy(asc(sql`DATE(${socialShares.sharedAt})`));
  return { viewsByDay, sharesByDay };
}
async function recordSocialShare(postId, platform, ipAddress, userAgent) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  try {
    await db.insert(socialShares).values({
      postId,
      platform,
      ipAddress,
      userAgent: userAgent || void 0
    });
  } catch (error) {
    console.error("[Database] Failed to record social share:", error);
    throw error;
  }
}
async function getSocialShareStats(postId) {
  const db = await getDb();
  if (!db) return { total: 0, byPlatform: {} };
  const shares = await db.select({
    platform: socialShares.platform,
    count: sql`COUNT(*)`
  }).from(socialShares).where(eq(socialShares.postId, postId)).groupBy(socialShares.platform);
  const byPlatform = {};
  let total = 0;
  shares.forEach((share) => {
    byPlatform[share.platform] = share.count;
    total += share.count;
  });
  return { total, byPlatform };
}
async function getMostSharedPosts(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    ...getTableColumns(posts),
    shareCount: sql`COUNT(${socialShares.id})`
  }).from(posts).leftJoin(socialShares, eq(posts.id, socialShares.postId)).where(eq(posts.status, "published")).groupBy(posts.id).orderBy(desc(sql`COUNT(${socialShares.id})`)).limit(limit);
}
async function getSharesByPlatform(days = 30) {
  const db = await getDb();
  if (!db) return [];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  return db.select({
    platform: socialShares.platform,
    count: sql`COUNT(*)`
  }).from(socialShares).where(gte(socialShares.sharedAt, startDate)).groupBy(socialShares.platform).orderBy(desc(sql`COUNT(*)`));
}
async function getConversionRate(days = 30) {
  const db = await getDb();
  if (!db) return { totalViews: 0, totalShares: 0, conversionRate: 0 };
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  const viewsResult = await db.select({
    count: sql`COUNT(*)`
  }).from(postViewLimits).where(gte(postViewLimits.viewedAt, startDate));
  const totalViews = viewsResult[0]?.count || 0;
  const sharesResult = await db.select({
    count: sql`COUNT(*)`
  }).from(socialShares).where(gte(socialShares.sharedAt, startDate));
  const totalShares = sharesResult[0]?.count || 0;
  const conversionRate = totalViews > 0 ? totalShares / totalViews * 100 : 0;
  return {
    totalViews,
    totalShares,
    conversionRate: parseFloat(conversionRate.toFixed(2))
  };
}
async function getPerformanceComparison(currentDays = 30, previousDays = 30) {
  const db = await getDb();
  if (!db) return { current: {}, previous: {}, comparison: {} };
  const now = /* @__PURE__ */ new Date();
  const currentStart = new Date(now.getTime() - currentDays * 24 * 60 * 60 * 1e3);
  const previousEnd = new Date(currentStart.getTime() - 1);
  const previousStart = new Date(previousEnd.getTime() - previousDays * 24 * 60 * 60 * 1e3);
  const currentViews = await db.select({
    count: sql`COUNT(*)`
  }).from(postViewLimits).where(and(gte(postViewLimits.viewedAt, currentStart), lte(postViewLimits.viewedAt, now)));
  const currentShares = await db.select({
    count: sql`COUNT(*)`
  }).from(socialShares).where(and(gte(socialShares.sharedAt, currentStart), lte(socialShares.sharedAt, now)));
  const previousViews = await db.select({
    count: sql`COUNT(*)`
  }).from(postViewLimits).where(and(gte(postViewLimits.viewedAt, previousStart), lte(postViewLimits.viewedAt, previousEnd)));
  const previousShares = await db.select({
    count: sql`COUNT(*)`
  }).from(socialShares).where(and(gte(socialShares.sharedAt, previousStart), lte(socialShares.sharedAt, previousEnd)));
  const currentViewsCount = currentViews[0]?.count || 0;
  const currentSharesCount = currentShares[0]?.count || 0;
  const previousViewsCount = previousViews[0]?.count || 0;
  const previousSharesCount = previousShares[0]?.count || 0;
  const viewsChange = previousViewsCount > 0 ? (currentViewsCount - previousViewsCount) / previousViewsCount * 100 : 0;
  const sharesChange = previousSharesCount > 0 ? (currentSharesCount - previousSharesCount) / previousSharesCount * 100 : 0;
  return {
    current: {
      views: currentViewsCount,
      shares: currentSharesCount
    },
    previous: {
      views: previousViewsCount,
      shares: previousSharesCount
    },
    comparison: {
      viewsChange: parseFloat(viewsChange.toFixed(2)),
      sharesChange: parseFloat(sharesChange.toFixed(2))
    }
  };
}
async function getTopPostsByEngagement(days = 30, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  return db.select({
    ...getTableColumns(posts),
    views: sql`COUNT(DISTINCT ${postViewLimits.id})`,
    shares: sql`COUNT(DISTINCT ${socialShares.id})`,
    engagementScore: sql`COUNT(DISTINCT ${postViewLimits.id}) + (COUNT(DISTINCT ${socialShares.id}) * 2)`
  }).from(posts).leftJoin(postViewLimits, and(
    eq(posts.id, postViewLimits.postId),
    gte(postViewLimits.viewedAt, startDate)
  )).leftJoin(socialShares, and(
    eq(posts.id, socialShares.postId),
    gte(socialShares.sharedAt, startDate)
  )).where(eq(posts.status, "published")).groupBy(posts.id).orderBy(desc(sql`COUNT(DISTINCT ${postViewLimits.id}) + (COUNT(DISTINCT ${socialShares.id}) * 2)`)).limit(limit);
}
async function getEngagementByDay(days = 30) {
  const db = await getDb();
  if (!db) return [];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1e3);
  const viewsByDay = await db.select({
    date: sql`DATE(${postViewLimits.viewedAt})`,
    views: sql`COUNT(*)`
  }).from(postViewLimits).where(gte(postViewLimits.viewedAt, startDate)).groupBy(sql`DATE(${postViewLimits.viewedAt})`).orderBy(asc(sql`DATE(${postViewLimits.viewedAt})`));
  const sharesByDay = await db.select({
    date: sql`DATE(${socialShares.sharedAt})`,
    shares: sql`COUNT(*)`
  }).from(socialShares).where(gte(socialShares.sharedAt, startDate)).groupBy(sql`DATE(${socialShares.sharedAt})`).orderBy(asc(sql`DATE(${socialShares.sharedAt})`));
  const dateMap = /* @__PURE__ */ new Map();
  viewsByDay.forEach((item) => {
    if (item.date) {
      dateMap.set(item.date, {
        date: item.date,
        views: item.views || 0,
        shares: 0
      });
    }
  });
  sharesByDay.forEach((item) => {
    if (item.date) {
      const existing = dateMap.get(item.date);
      if (existing) {
        existing.shares = item.shares || 0;
      } else {
        dateMap.set(item.date, {
          date: item.date,
          views: 0,
          shares: item.shares || 0
        });
      }
    }
  });
  return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}
async function createPasswordResetToken(userId, token, expiresInHours = 24) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);
  return db.insert(passwordResetTokens).values({
    userId,
    token,
    expiresAt
  });
}
async function getPasswordResetToken(token) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  const result = await db.select().from(passwordResetTokens).where(
    and(eq(passwordResetTokens.token, token), isNull(passwordResetTokens.usedAt), gt(passwordResetTokens.expiresAt, /* @__PURE__ */ new Date()))
  ).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function markPasswordResetTokenAsUsed(tokenId) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.update(passwordResetTokens).set({ usedAt: /* @__PURE__ */ new Date() }).where(eq(passwordResetTokens.id, tokenId));
}
async function createAuditLog(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  return db.insert(auditLogs).values(data);
}
async function getAuditLogs(filters) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  let query = db.select().from(auditLogs);
  if (filters?.userId) {
    query = query.where(eq(auditLogs.userId, filters.userId));
  }
  if (filters?.action) {
    query = query.where(eq(auditLogs.action, filters.action));
  }
  if (filters?.entityType) {
    query = query.where(eq(auditLogs.entityType, filters.entityType));
  }
  if (filters?.startDate) {
    query = query.where(gte(auditLogs.createdAt, filters.startDate));
  }
  if (filters?.endDate) {
    query = query.where(lte(auditLogs.createdAt, filters.endDate));
  }
  query = query.orderBy(desc(auditLogs.createdAt));
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.offset(filters.offset);
  }
  return query;
}
async function getAuditLogCount(filters) {
  const db = await getDb();
  if (!db) throw new Error("Database not connected");
  let query = db.select({ count: sql`COUNT(*)` }).from(auditLogs);
  if (filters?.userId) {
    query = query.where(eq(auditLogs.userId, filters.userId));
  }
  if (filters?.action) {
    query = query.where(eq(auditLogs.action, filters.action));
  }
  if (filters?.entityType) {
    query = query.where(eq(auditLogs.entityType, filters.entityType));
  }
  if (filters?.startDate) {
    query = query.where(gte(auditLogs.createdAt, filters.startDate));
  }
  if (filters?.endDate) {
    query = query.where(lte(auditLogs.createdAt, filters.endDate));
  }
  const result = await query;
  return result[0]?.count || 0;
}
async function getMenuPermissionsByRole(role) {
  const db = await getDb();
  if (!db) return { allowedMenuItems: [], deniedMenuItems: [] };
  const permissions = await db.select().from(menuAccessPermissions).where(eq(menuAccessPermissions.role, role));
  const allowedMenuItems = permissions.filter((p) => p.canAccess).map((p) => p.menuItemId);
  const deniedMenuItems = permissions.filter((p) => !p.canAccess).map((p) => p.menuItemId);
  return { allowedMenuItems, deniedMenuItems };
}
async function setMenuPermission(role, menuItemId, canAccess) {
  const db = await getDb();
  if (!db) return null;
  const existing = await db.select().from(menuAccessPermissions).where(and(eq(menuAccessPermissions.role, role), eq(menuAccessPermissions.menuItemId, menuItemId)));
  if (existing.length > 0) {
    return await db.update(menuAccessPermissions).set({ canAccess }).where(and(eq(menuAccessPermissions.role, role), eq(menuAccessPermissions.menuItemId, menuItemId)));
  } else {
    return await db.insert(menuAccessPermissions).values({
      role,
      menuItemId,
      canAccess
    });
  }
}
async function updateMenuPermissionsBatch(role, menuItemIds, canAccess) {
  const db = await getDb();
  if (!db) return null;
  await db.delete(menuAccessPermissions).where(eq(menuAccessPermissions.role, role));
  if (menuItemIds.length > 0) {
    const values = menuItemIds.map((menuItemId) => ({
      role,
      menuItemId,
      canAccess
    }));
    return await db.insert(menuAccessPermissions).values(values);
  }
}
async function getDatabaseDump() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL not set");
  const url = new URL(dbUrl);
  const host = url.hostname;
  const port = url.port || "3306";
  const user = url.username;
  const password = url.password;
  const database = url.pathname.replace("/", "");
  const { execSync } = await import("child_process");
  try {
    const command = `mysqldump -h ${host} -P ${port} -u ${user} ${password ? `-p${password}` : ""} ${database}`;
    const dump = execSync(command, { encoding: "utf8", maxBuffer: 100 * 1024 * 1024 });
    return dump;
  } catch (error) {
    console.error("[Database] Dump failed:", error);
    throw new Error("Falha ao gerar backup do banco de dados");
  }
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    _db = null;
  }
});

// server/password.ts
var password_exports = {};
__export(password_exports, {
  generateSecurePassword: () => generateSecurePassword,
  hashPassword: () => hashPassword,
  verifyPassword: () => verifyPassword
});
import bcrypt from "bcrypt";
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateSecurePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password.split("").sort(() => Math.random() - 0.5).join("");
}
var SALT_ROUNDS;
var init_password = __esm({
  "server/password.ts"() {
    "use strict";
    SALT_ROUNDS = 10;
  }
});

// server/csv-importer.ts
var csv_importer_exports = {};
__export(csv_importer_exports, {
  importUsersFromCSV: () => importUsersFromCSV
});
import { parse } from "csv-parse/sync";
import { v4 as uuidv4 } from "uuid";
async function importUsersFromCSV(csvContent) {
  const errors = [];
  let success = 0;
  let failed = 0;
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      const rowNumber = i + 2;
      try {
        if (!row.email || !row.email.trim()) {
          errors.push({
            row: rowNumber,
            email: row.email || "N/A",
            error: "Email \xE9 obrigat\xF3rio"
          });
          failed++;
          continue;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(row.email)) {
          errors.push({
            row: rowNumber,
            email: row.email,
            error: "Formato de email inv\xE1lido"
          });
          failed++;
          continue;
        }
        const existingUser2 = await getUserByEmail(row.email);
        if (existingUser2) {
          errors.push({
            row: rowNumber,
            email: row.email,
            error: "Usu\xE1rio j\xE1 existe no sistema"
          });
          failed++;
          continue;
        }
        const openId = `csv_${uuidv4()}`;
        const passwordHash = await hashPassword("12345678");
        await updateUser({
          openId,
          email: row.email.trim(),
          name: row.name?.trim() || null,
          functionalId: row.functionalId?.trim() || null,
          role: "user",
          // Default role
          categoryId: row.category ? parseInt(row.category) : null,
          passwordHash
        });
        success++;
      } catch (error) {
        errors.push({
          row: rowNumber,
          email: row.email || "N/A",
          error: error instanceof Error ? error.message : "Erro desconhecido"
        });
        failed++;
      }
    }
    return { success, failed, errors };
  } catch (error) {
    throw new Error(
      `Erro ao processar arquivo CSV: ${error instanceof Error ? error.message : "Erro desconhecido"}`
    );
  }
}
var init_csv_importer = __esm({
  "server/csv-importer.ts"() {
    "use strict";
    init_db();
    init_password();
  }
});

// server/email.ts
var email_exports = {};
__export(email_exports, {
  getPasswordResetEmailTemplate: () => getPasswordResetEmailTemplate,
  getSecurityNotificationEmailTemplate: () => getSecurityNotificationEmailTemplate,
  sendEmail: () => sendEmail
});
async function sendEmail(_payload) {
  console.warn("[Email] Servi\xE7o de envio de email desativado.");
  return false;
}
function getPasswordResetEmailTemplate(userName, resetLink) {
  return {
    subject: "Redefinir sua senha - DEGASE",
    html: `... (todo o HTML permanece igual) ...`
  };
}
function getSecurityNotificationEmailTemplate(title, message, details) {
  const detailsHtml = Object.entries(details).map(([k, v]) => `<tr><td><strong>${k}:</strong></td><td>${v}</td></tr>`).join("");
  return {
    subject: `\u{1F512} Notifica\xE7\xE3o de Seguran\xE7a: ${title} - DEGASE`,
    html: `... (todo o HTML permanece igual) ...`
  };
}
var init_email = __esm({
  "server/email.ts"() {
    "use strict";
  }
});

// server/index.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path2 from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/cookies.ts
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false
  };
}

// server/_core/systemRouter.ts
import { z as z2 } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";

// server/_core/env.ts
import { z } from "zod";
var envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string()
});
var validatedEnv = envSchema.parse(process.env);

// server/_core/notification.ts
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!validatedEnv.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!validatedEnv.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(validatedEnv.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${validatedEnv.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// shared/const.ts
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
var t = initTRPC.context().create();
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  // Healthcheck sem input
  health: publicProcedure.query(() => ({
    ok: true
  })),
  // Mantém notifyOwner — continua usando zod
  notifyOwner: adminProcedure.input(
    z2.object({
      title: z2.string().min(1, "title is required"),
      content: z2.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
import { TRPCError as TRPCError4 } from "@trpc/server";
import { z as z6 } from "zod";

// server/pdf-generator.js
async function generateAnalyticsPDF(data) {
  return "PDF generated";
}

// server/routers/upload.ts
import fs from "fs";
import path from "path";
import { z as z3 } from "zod";
var uploadRouter = router({
  image: adminProcedure.input(
    z3.object({
      file: z3.instanceof(Uint8Array),
      filename: z3.string(),
      mimetype: z3.string()
    })
  ).mutation(async ({ input }) => {
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const safeName = Date.now() + "-" + input.filename.replace(/\s+/g, "_");
    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, Buffer.from(input.file));
    return {
      success: true,
      url: `/uploads/${safeName}`
    };
  })
});

// server/routers/posts.ts
init_db();
import { z as z4 } from "zod";
function slugify(text2) {
  return text2.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
}
var postsRouter = router({
  list: publicProcedure.input(
    z4.object({
      limit: z4.number().optional(),
      offset: z4.number().optional(),
      status: z4.string().optional(),
      authorId: z4.string().optional()
    })
  ).query(async ({ input }) => {
    const result = await listPosts(input);
    return result.items;
  }),
  getBySlug: publicProcedure.input(z4.object({ slug: z4.string() })).query(async ({ input }) => {
    const post = await getPostBySlug(input.slug);
    return post ? [post] : [];
  }),
  getById: publicProcedure.input(z4.object({ id: z4.string() })).query(async ({ input }) => {
    const post = await getPostById(input.id);
    return post ? [post] : [];
  }),
  search: publicProcedure.input(z4.object({ query: z4.string(), limit: z4.number().optional() })).query(async ({ input }) => {
    const results = await searchPosts(input);
    return results;
  }),
  getLatest: publicProcedure.query(async () => {
    const result = await listPosts({ status: "published", limit: 10 });
    return result.items;
  }),
  create: protectedProcedure.input(
    z4.object({
      title: z4.string(),
      content: z4.string(),
      slug: z4.string().optional(),
      status: z4.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const slug = input.slug || slugify(input.title);
    const post = await createPost({ ...input, slug, authorId: ctx.user.id });
    return [post];
  }),
  update: protectedProcedure.input(
    z4.object({
      id: z4.string(),
      title: z4.string().optional(),
      content: z4.string().optional(),
      slug: z4.string().optional(),
      status: z4.string().optional()
    })
  ).mutation(async ({ input }) => {
    const post = await updatePost(input);
    return [post];
  }),
  delete: protectedProcedure.input(z4.object({ id: z4.string() })).mutation(async ({ input }) => {
    await deletePost(input.id);
    return [];
  }),
  recordView: publicProcedure.input(z4.object({ id: z4.string() })).mutation(async ({ input }) => {
    await recordPostView(input.id);
    return [];
  })
});

// server/routers/menu.ts
init_db();
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z5 } from "zod";
var menuRouter = router({
  list: publicProcedure.query(async () => {
    return getMenuItems();
  }),
  hierarchy: publicProcedure.query(async () => {
    return getMenuItemsHierarchy();
  }),
  create: protectedProcedure.input(z5.object({
    label: z5.string().min(1),
    linkType: z5.enum(["internal", "external"]).optional(),
    internalPageId: z5.number().optional(),
    externalUrl: z5.string().optional(),
    parentId: z5.number().nullable().optional(),
    sortOrder: z5.number().default(0),
    openInNewTab: z5.boolean().default(false),
    isColumnTitle: z5.boolean().default(false)
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError3({ code: "FORBIDDEN" });
    if (!input.isColumnTitle && !input.linkType) {
      throw new TRPCError3({ code: "BAD_REQUEST", message: "linkType obrigat\xF3rio" });
    }
    if (!input.isColumnTitle) {
      if (input.linkType === "internal" && !input.internalPageId) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "P\xE1gina obrigat\xF3ria para links internos" });
      }
      if (input.linkType === "external" && !input.externalUrl) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "URL obrigat\xF3ria para links externos" });
      }
    }
    return createMenuItem({
      label: input.label,
      linkType: input.isColumnTitle ? "external" : input.linkType || "internal",
      internalPageId: input.internalPageId || null,
      externalUrl: input.isColumnTitle ? "https://rj.gov.br/degase" : input.externalUrl || null,
      parentId: input.parentId || null,
      sortOrder: input.sortOrder,
      openInNewTab: input.openInNewTab,
      isColumnTitle: input.isColumnTitle,
      isActive: true
    });
  }),
  update: protectedProcedure.input(z5.object({
    id: z5.number(),
    label: z5.string().optional(),
    linkType: z5.enum(["internal", "external"]).optional(),
    internalPageId: z5.number().nullable().optional(),
    externalUrl: z5.string().optional(),
    parentId: z5.number().nullable().optional(),
    sortOrder: z5.number().optional(),
    openInNewTab: z5.boolean().optional(),
    isColumnTitle: z5.boolean().optional(),
    isActive: z5.boolean().optional()
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError3({ code: "FORBIDDEN" });
    const { id, ...data } = input;
    if (data.isColumnTitle === true) {
      data.linkType = "external";
      data.internalPageId = null;
      data.externalUrl = "https://rj.gov.br/degase";
    }
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== void 0)
    );
    return updateMenuItem(id, cleanData);
  }),
  delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError3({ code: "FORBIDDEN" });
    return deleteMenuItem(input.id);
  }),
  reorder: protectedProcedure.input(z5.object({
    items: z5.array(z5.object({
      id: z5.number(),
      parentId: z5.number().nullable(),
      sortOrder: z5.number()
    }))
  })).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError3({ code: "FORBIDDEN" });
    return updateMenuItemOrder(input.items);
  })
});

// server/routers.ts
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito a administradores" });
  return next({ ctx });
});
var editorProcedure = protectedProcedure;
function slugify2(text2) {
  return text2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(async ({ ctx }) => {
      return ctx.user || null;
    }),
    login: publicProcedure.input(z6.object({
      email: z6.string().email(),
      password: z6.string().min(1)
    })).mutation(async ({ input, ctx }) => {
      console.log("\n========== [LOGIN DEBUG] ==========");
      console.log("[1] Input recebido:", { email: input.email, password: input.password });
      const user = await getUserByEmail(input.email);
      console.log("[2] Usu\xE1rio encontrado:", user ? "SIM" : "N\xC3O");
      if (user) {
        console.log("[3] Dados do usu\xE1rio:", {
          id: user.id,
          email: user.email,
          passwordHash: user.passwordHash,
          passwordHashLength: user.passwordHash?.length || 0,
          passwordHashStart: user.passwordHash?.substring(0, 20) || "N/A"
        });
      }
      if (!user || !user.passwordHash) {
        console.log("[4] ERRO: Usu\xE1rio n\xE3o encontrado ou sem hash");
        throw new TRPCError4({
          code: "UNAUTHORIZED",
          message: "E-mail ou senha inv\xE1lidos"
        });
      }
      console.log("[5] Iniciando verifica\xE7\xE3o de senha...");
      const { verifyPassword: verifyPassword2 } = await Promise.resolve().then(() => (init_password(), password_exports));
      console.log("[6] Antes de verifyPassword:");
      console.log("    - password:", input.password);
      console.log("    - hash:", user.passwordHash);
      let isValid = false;
      try {
        isValid = await verifyPassword2(input.password, user.passwordHash);
        console.log("[7] Resultado de verifyPassword:", isValid);
      } catch (error) {
        console.log("[7] ERRO em verifyPassword:", error);
        throw error;
      }
      if (!isValid) {
        console.log("[8] ERRO: Senha inv\xE1lida");
        throw new TRPCError4({
          code: "UNAUTHORIZED",
          message: "E-mail ou senha inv\xE1lidos"
        });
      }
      console.log("[9] Senha v\xE1lida! Prosseguindo com login...");
      const { SignJWT } = await import("jose");
      const { createSecretKey: createSecretKey3 } = await import("crypto");
      const JWT_SECRET3 = process.env.JWT_SECRET || "changeme";
      const secretKey3 = createSecretKey3(JWT_SECRET3, "utf-8");
      const token = await new SignJWT({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("365d").sign(secretKey3);
      console.log("[10] JWT token criado com sucesso");
      const cookieOptions = getSessionCookieOptions(ctx.req);
      const secureFlag = cookieOptions.secure ? "; Secure" : "";
      ctx.res.setHeader(
        "Set-Cookie",
        `session=${token}; Path=/; HttpOnly; SameSite=Lax${secureFlag}`
      );
      console.log("[11] Cookie setado com sucesso");
      console.log("========== [LOGIN DEBUG FIM] ==========\n");
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie("session", {
        path: "/",
        httpOnly: true,
        sameSite: "lax"
      });
      return { success: true };
    })
  }),
  users: router({
    list: adminProcedure2.query(async () => listUsers()),
    getById: adminProcedure2.input(z6.object({ id: z6.number() }).passthrough()).query(async ({ input }) => getUserById(input.id)),
    create: adminProcedure2.input(z6.object({
      openId: z6.string().min(1),
      name: z6.string().optional(),
      email: z6.string().email().optional(),
      functionalId: z6.string().optional(),
      password: z6.string().min(8),
      role: z6.enum(["user", "admin", "contributor"]).default("user"),
      categoryId: z6.number().optional()
    })).mutation(async ({ input }) => {
      const { password, ...userData } = input;
      if (existingUser) {
        throw new TRPCError4({ code: "CONFLICT", message: "Usu\xE1rio com este openId j\xE1 existe" });
      }
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_password(), password_exports));
      const passwordHash = await hashPassword2(password);
      return { success: true };
    }),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      email: z6.string().email().optional(),
      functionalId: z6.string().optional(),
      role: z6.enum(["user", "admin", "contributor"]).optional(),
      categoryId: z6.number().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      const user = await getUserById(id);
      if (!user) {
        throw new TRPCError4({ code: "NOT_FOUND", message: "Usu\xE1rio n\xE3o encontrado" });
      }
      await updateUser(id, data);
      return { success: true };
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      const user = await getUserById(input.id);
      if (!user) {
        throw new TRPCError4({ code: "NOT_FOUND", message: "Usuario nao encontrado" });
      }
      await updateUser(input.id, { role: "user" });
      return { success: true };
    }),
    importCSV: adminProcedure2.input(z6.object({
      csvContent: z6.string().min(1)
    })).mutation(async ({ input }) => {
      const { importUsersFromCSV: importUsersFromCSV2 } = await Promise.resolve().then(() => (init_csv_importer(), csv_importer_exports));
      const result = await importUsersFromCSV2(input.csvContent);
      return result;
    }),
    changePassword: protectedProcedure.input(z6.object({
      userId: z6.number(),
      newPassword: z6.string().min(8)
    })).mutation(async ({ ctx, input }) => {
      const user = await getUserById(input.userId);
      if (!user) {
        throw new TRPCError4({ code: "NOT_FOUND", message: "Usuario nao encontrado" });
      }
      if (ctx.user.role !== "admin" && ctx.user.id !== input.userId) {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Voce so pode alterar sua propria senha" });
      }
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_password(), password_exports));
      const passwordHash = await hashPassword2(input.newPassword);
      await updateUserPassword(input.userId, passwordHash);
      return { success: true };
    })
  }),
  categories: router({
    // Tags
    listTags: publicProcedure.query(async () => listTags()),
    createTag: adminProcedure2.input(z6.object({
      name: z6.string().min(1).max(128),
      slug: z6.string().optional()
    })).mutation(async ({ input }) => {
      const slug = input.slug || slugify2(input.name);
      return createTag({ name: input.name, slug });
    }),
    deleteTag: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteTag(input.id);
      return { success: true };
    }),
    list: publicProcedure.query(async () => listCategories()),
    getBySlug: publicProcedure.input(z6.object({ slug: z6.string() }).passthrough()).query(async ({ input }) => getCategoryBySlug(input.slug)),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      slug: z6.string().optional(),
      description: z6.string().optional(),
      color: z6.string().optional(),
      icon: z6.string().optional(),
      sortOrder: z6.number().optional()
    })).mutation(async ({ input }) => {
      const slug = input.slug || slugify2(input.name);
      return createCategory({ ...input, slug });
    }),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      slug: z6.string().optional(),
      description: z6.string().optional(),
      color: z6.string().optional(),
      icon: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateCategory(id, data);
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteCategory(input.id))
  }),
  tags: router({
    list: publicProcedure.query(async () => listTags()),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      slug: z6.string().optional()
    })).mutation(async ({ input }) => {
      const slug = input.slug || slugify2(input.name);
      return createTag({ ...input, slug });
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteTag(input.id))
  }),
  posts: postsRouter,
  // posts: router({
  // list: publicProcedure.input(z.object({categoryId: z.number().optional(),status: z.enum(['draft', 'published', 'archived']).optional(), limit: z.number().default(10),offset: z.number().default(0),visibility: z.enum(['site', 'intranet', 'both']).optional(),}).passthrough().optional().default({})).query(async ({ input }) => db.listPosts(input || {})),
  //   getBySlug: publicProcedure.input(z.object({ slug: z.string() }).passthrough()).query(async ({ input }) => db.getPostBySlug(input.slug)),
  //   getById: publicProcedure.input(z.object({ id: z.number() }).passthrough()).query(async ({ input }) => db.getPostById(input.id)),
  //   search: publicProcedure.input(z.object({ q: z.string(), limit: z.number().default(10) }).passthrough()).query(async ({ input }) => db.searchPosts(input.q, input.limit)),
  //    getLatest: publicProcedure
  //   .input(z.object({ 
  //     limit: z.number().default(5),
  //     visibility: z.enum(['site', 'intranet', 'both']).default('site')
  //   }).optional())
  //   .query(async ({ input }) => {
  //     const limit = input?.limit || 5;
  //     const visibility = input?.visibility || 'site';
  //     const result = await db.listPosts({
  //       status: 'published',
  //       limit,
  //       visibility,
  //     });
  //     return result.items || [];
  //   }),
  //   create: editorProcedure.input(z.object({
  //     title: z.string().min(1),
  //     slug: z.string().optional(),
  //     excerpt: z.string().optional(),
  //     content: z.string().min(1),
  //     featuredImage: z.string().optional(),
  //     categoryId: z.number().optional(),
  //     status: z.enum(['draft', 'published', 'archived']).default('draft'),
  //     isFeatured: z.boolean().optional(),
  //     tags: z.array(z.number()).optional(),
  //   })).mutation(async ({ input, ctx }) => {
  //     const slug = input.slug || slugify(input.title);
  //     const post = await db.createPost({
  //       ...input,
  //       slug,
  //       authorId: ctx.user.id,
  //     });
  //     if (input.tags && input.tags.length > 0) {
  //       await db.setPostTags(post.id, input.tags);
  //     }
  //     await db.createPostHistory(post.id, {
  //       title: post.title,
  //       excerpt: post.excerpt,
  //       content: post.content,
  //       featuredImage: post.featuredImage,
  //       status: post.status,
  //       isFeatured: post.isFeatured,
  //       editorId: ctx.user.id,
  //       changeDescription: 'Post criado',
  //     });
  //     return post;
  //   }),
  //   update: editorProcedure.input(z.object({
  //     id: z.number(),
  //     title: z.string().optional(),
  //     excerpt: z.string().optional(),
  //     content: z.string().optional(),
  //     featuredImage: z.string().optional(),
  //     categoryId: z.number().optional(),
  //     status: z.enum(['draft', 'published', 'archived']).optional(),
  //     isFeatured: z.boolean().optional(),
  //     tags: z.array(z.number()).optional(),
  //     changeDescription: z.string().optional(),
  //   })).mutation(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.id);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para editar este post' });
  //     }
  //     const { id, tags, changeDescription, ...data } = input;
  //     const updated = await db.updatePost(id, data);
  //     if (tags) await db.setPostTags(id, tags);
  //     await db.createPostHistory(id, {
  //       title: updated.title,
  //       excerpt: updated.excerpt,
  //       content: updated.content,
  //       featuredImage: updated.featuredImage,
  //       status: updated.status,
  //       isFeatured: updated.isFeatured,
  //       editorId: ctx.user.id,
  //       changeDescription: changeDescription || 'Post atualizado',
  //     });
  //     return updated;
  //   }),
  //   delete: editorProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.id);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para deletar este post' });
  //     }
  //     return db.deletePost(input.id);
  //   }),
  //   schedule: editorProcedure.input(z.object({
  //     id: z.number(),
  //     scheduledAt: z.date(),
  //   })).mutation(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.id);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para agendar este post' });
  //     }
  //     if (input.scheduledAt <= new Date()) {
  //       throw new TRPCError({ code: 'BAD_REQUEST', message: 'Data agendada deve ser no futuro' });
  //     }
  //     await db.schedulePost(input.id, input.scheduledAt);
  //     return { success: true };
  //   }),
  //   cancelSchedule: editorProcedure.input(z.object({
  //     id: z.number(),
  //   })).mutation(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.id);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para cancelar este agendamento' });
  //     }
  //     await db.cancelScheduledPost(input.id);
  //     return { success: true };
  //   }),
  //   getScheduled: editorProcedure.query(async ({ ctx }) => {
  //     if (ctx.user.role === 'admin') {
  //       return db.listPosts({ status: 'scheduled' });
  //     }
  //     return { items: await db.getScheduledPostsForUser(ctx.user.id), total: 0 };
  //   }),
  //   saveDraft: editorProcedure.input(z.object({
  //     id: z.number().optional(),
  //     title: z.string().min(1),
  //     excerpt: z.string().optional(),
  //     content: z.string().min(1),
  //     featuredImage: z.string().optional(),
  //     categoryId: z.number().optional(),
  //     isFeatured: z.boolean().optional(),
  //     slug: z.string().optional(),
  //   })).mutation(async ({ input, ctx }) => {
  //     if (input.id) {
  //       const post = await db.getPostById(input.id);
  //       if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //       if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //         throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para editar este post' });
  //       }
  //       const updated = await db.updatePost(input.id, {
  //         title: input.title,
  //         excerpt: input.excerpt,
  //         content: input.content,
  //         featuredImage: input.featuredImage,
  //         categoryId: input.categoryId,
  //         isFeatured: input.isFeatured,
  //         status: 'draft',
  //       });
  //       await db.createPostHistory(input.id, {
  //         title: updated.title,
  //         excerpt: updated.excerpt,
  //         content: updated.content,
  //         featuredImage: updated.featuredImage,
  //         status: 'draft',
  //         isFeatured: updated.isFeatured,
  //         editorId: ctx.user.id,
  //         changeDescription: 'Rascunho salvo automaticamente',
  //       });
  //       return updated;
  //     } else {
  //       const slug = input.slug || slugify(input.title);
  //       const post = await db.createPost({
  //         title: input.title,
  //         slug,
  //         excerpt: input.excerpt,
  //         content: input.content,
  //         featuredImage: input.featuredImage,
  //         categoryId: input.categoryId,
  //         isFeatured: input.isFeatured,
  //         status: 'draft',
  //         authorId: ctx.user.id,
  //       });
  //       await db.createPostHistory(post.id, {
  //         title: post.title,
  //         excerpt: post.excerpt,
  //         content: post.content,
  //         featuredImage: post.featuredImage,
  //         status: 'draft',
  //         isFeatured: post.isFeatured,
  //         editorId: ctx.user.id,
  //         changeDescription: 'Rascunho criado automaticamente',
  //       });
  //       return post;
  //     }
  //   }),
  //   getHistory: editorProcedure.input(z.object({ postId: z.number() }).passthrough()).query(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.postId);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para ver o historico deste post' });
  //     }
  //     return db.getPostHistory(input.postId);
  //   }),
  //   revertToDraft: editorProcedure.input(z.object({ postId: z.number(), historyId: z.number() })).mutation(async ({ input, ctx }) => {
  //     const post = await db.getPostById(input.postId);
  //     if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: 'Post nao encontrado' });
  //     if (ctx.user.role !== 'admin' && post.authorId !== ctx.user.id) {
  //       throw new TRPCError({ code: 'FORBIDDEN', message: 'Voce nao tem permissao para reverter este post' });
  //     }
  //     await db.revertPostToVersion(input.postId, input.historyId, ctx.user.id);
  //     return { success: true };
  //   }),
  //   recordView: publicProcedure.input(z.object({ postId: z.number() })).mutation(async ({ input }) => {
  //     return db.recordPostView(input.postId);
  //   }),
  // }),
  pages: router({
    list: publicProcedure.query(async () => listPages()),
    getBySlug: publicProcedure.input(z6.object({ slug: z6.string() }).passthrough()).query(async ({ input }) => getPageBySlug(input.slug)),
    getById: publicProcedure.input(z6.object({ id: z6.number() }).passthrough()).query(async ({ input }) => getPageById(input.id)),
    create: adminProcedure2.input(z6.object({
      title: z6.string().min(1),
      slug: z6.string().optional(),
      content: z6.string().min(1),
      excerpt: z6.string().optional(),
      featuredImage: z6.string().optional(),
      parentId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      status: z6.enum(["draft", "published"]).default("published"),
      menuLabel: z6.string().optional(),
      showInMenu: z6.boolean().optional()
    })).mutation(async ({ input, ctx }) => {
      const slug = input.slug || slugify2(input.title);
      const page = await createPage({ ...input, slug });
      await createPageHistory(page.id, {
        title: page.title,
        content: page.content,
        excerpt: page.excerpt,
        featuredImage: page.featuredImage,
        status: page.status,
        menuLabel: page.menuLabel,
        showInMenu: page.showInMenu,
        editorId: ctx.user.id,
        changeDescription: "Pagina criada"
      });
      return page;
    }),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      content: z6.string().optional(),
      excerpt: z6.string().optional(),
      featuredImage: z6.string().optional(),
      parentId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      status: z6.enum(["draft", "published", "archived"]).optional(),
      menuLabel: z6.string().optional(),
      showInMenu: z6.boolean().optional(),
      changeDescription: z6.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const { id, changeDescription, ...data } = input;
      const page = await getPageById(id);
      if (!page) throw new TRPCError4({ code: "NOT_FOUND", message: "Pagina nao encontrada" });
      await updatePage(id, data);
      const updated = { ...page, ...data };
      await createPageHistory(id, {
        title: updated.title || page.title,
        content: updated.content || page.content,
        excerpt: updated.excerpt || page.excerpt,
        featuredImage: updated.featuredImage || page.featuredImage,
        status: updated.status || page.status,
        menuLabel: updated.menuLabel || page.menuLabel,
        showInMenu: updated.showInMenu !== void 0 ? updated.showInMenu : page.showInMenu ?? false,
        editorId: ctx.user.id,
        changeDescription: changeDescription || "Pagina atualizada"
      });
      return updated;
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deletePage(input.id)),
    saveDraftPage: adminProcedure2.input(z6.object({
      id: z6.number().optional(),
      title: z6.string().min(1),
      content: z6.string().min(1),
      excerpt: z6.string().optional(),
      featuredImage: z6.string().optional(),
      menuLabel: z6.string().optional(),
      showInMenu: z6.boolean().optional(),
      slug: z6.string().optional()
    })).mutation(async ({ input, ctx }) => {
      if (input.id) {
        const page = await getPageById(input.id);
        if (!page) throw new TRPCError4({ code: "NOT_FOUND", message: "Pagina nao encontrada" });
        const updated = await updatePage(input.id, {
          title: input.title,
          content: input.content,
          excerpt: input.excerpt,
          featuredImage: input.featuredImage,
          menuLabel: input.menuLabel,
          showInMenu: input.showInMenu,
          status: "draft"
        });
        if (!updated) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Falha ao atualizar pagina" });
        await createPageHistory(input.id, {
          title: updated.title,
          content: updated.content,
          excerpt: updated.excerpt,
          featuredImage: updated.featuredImage,
          status: "draft",
          menuLabel: updated.menuLabel,
          showInMenu: updated.showInMenu,
          editorId: ctx.user.id,
          changeDescription: "Rascunho salvo automaticamente"
        });
        return updated;
      } else {
        const slug = input.slug || slugify2(input.title);
        const page = await createPage({
          title: input.title,
          slug,
          content: input.content,
          excerpt: input.excerpt,
          featuredImage: input.featuredImage,
          menuLabel: input.menuLabel,
          showInMenu: input.showInMenu,
          status: "draft"
        });
        await createPageHistory(page.id, {
          title: page.title,
          content: page.content,
          excerpt: page.excerpt,
          featuredImage: page.featuredImage,
          status: "draft",
          menuLabel: page.menuLabel,
          showInMenu: page.showInMenu,
          editorId: ctx.user.id,
          changeDescription: "Rascunho criado automaticamente"
        });
        return page;
      }
    }),
    getPageHistory: adminProcedure2.input(z6.object({ pageId: z6.number() })).query(async ({ input }) => {
      const page = await getPageById(input.pageId);
      if (!page) throw new TRPCError4({ code: "NOT_FOUND", message: "Pagina nao encontrada" });
      return getPageHistory(input.pageId);
    })
  }),
  banners: router({
    list: publicProcedure.query(async () => listBanners()),
    getActive: publicProcedure.input(z6.object({
      visibility: z6.enum(["site", "intranet", "both"]).default("site")
    }).optional()).query(async ({ input }) => {
      const visibility = input?.visibility || "site";
      const banners2 = await listBanners(visibility);
      return (banners2 || []).filter((b) => b.isActive);
    }),
    create: editorProcedure.input(z6.object({
      title: z6.string().min(1),
      imageUrl: z6.string().min(1),
      linkUrl: z6.string().optional(),
      categoryId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input, ctx }) => {
      const banner = await createBanner(input);
      return banner;
    }),
    update: editorProcedure.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      imageUrl: z6.string().optional(),
      linkUrl: z6.string().optional(),
      categoryId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateBanner(id, data);
    }),
    delete: editorProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteBanner(input.id))
  }),
  videos: router({
    list: publicProcedure.query(async () => listVideos()),
    getActive: publicProcedure.input(z6.object({
      visibility: z6.enum(["site", "intranet", "both"]).default("site")
    }).optional()).query(async ({ input }) => {
      const visibility = input?.visibility || "site";
      const videos2 = await listVideos(visibility);
      return (videos2 || []).filter((v) => v.isActive);
    }),
    create: editorProcedure.input(z6.object({
      title: z6.string().min(1),
      description: z6.string().optional(),
      youtubeUrl: z6.string().min(1),
      thumbnailUrl: z6.string().optional(),
      categoryId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional(),
      isFeatured: z6.boolean().optional()
    })).mutation(async ({ input }) => createVideo(input)),
    update: editorProcedure.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      description: z6.string().optional(),
      youtubeUrl: z6.string().optional(),
      thumbnailUrl: z6.string().optional(),
      categoryId: z6.number().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional(),
      isFeatured: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateVideo(id, data);
    }),
    delete: editorProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteVideo(input.id))
  }),
  units: router({
    list: publicProcedure.query(async () => listUnits()),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      type: z6.enum(["internacao", "internacao_provisoria", "semiliberdade", "meio_aberto"]),
      address: z6.string().optional(),
      phone: z6.string().optional(),
      email: z6.string().optional(),
      visitDays: z6.string().optional(),
      mapsUrl: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => createUnit(input)),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      type: z6.enum(["internacao", "internacao_provisoria", "semiliberdade", "meio_aberto"]).optional(),
      address: z6.string().optional(),
      phone: z6.string().optional(),
      email: z6.string().optional(),
      visitDays: z6.string().optional(),
      mapsUrl: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateUnit(id, data);
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteUnit(input.id))
  }),
  transparency: router({
    list: publicProcedure.query(async () => listTransparencyItems()),
    create: adminProcedure2.input(z6.object({
      title: z6.string().min(1),
      section: z6.string().min(1),
      description: z6.string().optional(),
      linkUrl: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => createTransparencyItem(input)),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      section: z6.string().optional(),
      description: z6.string().optional(),
      linkUrl: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateTransparencyItem(id, data);
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteTransparencyItem(input.id))
  }),
  upload: uploadRouter,
  admin: router({
    getSiteConfig: adminProcedure2.input(z6.object({ key: z6.string() })).query(async ({ input }) => getSiteConfig(input.key)),
    getAllSiteConfig: adminProcedure2.query(async () => getAllSiteConfig()),
    setSiteConfig: adminProcedure2.input(z6.object({
      key: z6.string().min(1),
      value: z6.string(),
      description: z6.string().optional()
    })).mutation(async ({ input }) => setSiteConfig(input.key, input.value, input.description)),
    listUsers: adminProcedure2.query(async () => listUsers()),
    getUserById: adminProcedure2.input(z6.object({ id: z6.number() })).query(async ({ input }) => getUserById(input.id)),
    updateUserRole: adminProcedure2.input(z6.object({
      id: z6.number(),
      role: z6.enum(["user", "admin", "contributor"]),
      categoryId: z6.number().optional()
    })).mutation(async ({ input }) => updateUserRole(input.id, input.role, input.categoryId)),
    deleteUser: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => deleteUser(input.id)),
    getDatabaseDump: adminProcedure2.mutation(async () => {
      try {
        const dump = await getDatabaseDump();
        return {
          success: true,
          data: dump,
          filename: `backup-portaldegase-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.sql`
        };
      } catch (error) {
        console.error("[Admin] Erro ao gerar dump:", error);
        throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Erro ao gerar backup do banco de dados" });
      }
    })
  }),
  themes: router({
    list: publicProcedure.query(async () => getColorThemes()),
    getActive: publicProcedure.query(async () => getActiveColorTheme()),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      description: z6.string().optional(),
      primaryColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      secondaryColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      accentColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      textColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      textLightColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      backgroundColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      surfaceColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      searchBgColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      searchTextColor: z6.string().regex(/^#[0-9A-F]{6}$/i),
      searchBorderColor: z6.string().regex(/^#[0-9A-F]{6}$/i)
    })).mutation(async ({ input }) => createColorTheme(input)),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      description: z6.string().optional(),
      primaryColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      secondaryColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      accentColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      textColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      textLightColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      backgroundColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      surfaceColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      searchBgColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      searchTextColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional(),
      searchBorderColor: z6.string().regex(/^#[0-9A-F]{6}$/i).optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateColorTheme(id, data);
      return { success: true };
    }),
    activate: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await activateColorTheme(input.id);
      return { success: true };
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteColorTheme(input.id);
      return { success: true };
    })
  }),
  history: router({
    getPostHistory: editorProcedure.input(z6.object({ postId: z6.number() })).query(async ({ input }) => getPostHistory(input.postId)),
    getPostHistoryById: editorProcedure.input(z6.object({ historyId: z6.number() })).query(async ({ input }) => getPostHistoryById(input.historyId)),
    revertPostToVersion: editorProcedure.input(z6.object({
      postId: z6.number(),
      historyId: z6.number()
    })).mutation(async ({ input, ctx }) => {
      const post = await getPostById(input.postId);
      if (!post) throw new TRPCError4({ code: "NOT_FOUND", message: "Post nao encontrado" });
      if (ctx.user.role !== "admin" && post.authorId !== ctx.user.id) {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Voce nao tem permissao para reverter este post" });
      }
      await revertPostToVersion(input.postId, input.historyId, ctx.user.id);
      return { success: true };
    }),
    getPageHistory: editorProcedure.input(z6.object({ pageId: z6.number() })).query(async ({ input }) => getPageHistory(input.pageId)),
    getPageHistoryById: editorProcedure.input(z6.object({ historyId: z6.number() })).query(async ({ input }) => getPageHistoryById(input.historyId)),
    revertPageToVersion: adminProcedure2.input(z6.object({
      pageId: z6.number(),
      historyId: z6.number()
    })).mutation(async ({ input, ctx }) => {
      const page = await getPageById(input.pageId);
      if (!page) throw new TRPCError4({ code: "NOT_FOUND", message: "Pagina nao encontrada" });
      await revertPageToVersion(input.pageId, input.historyId, ctx.user.id);
      return { success: true };
    })
  }),
  comments: router({
    getPostComments: publicProcedure.input(z6.object({ postId: z6.number() })).query(async ({ input }) => getPostComments(input.postId, true)),
    createComment: publicProcedure.input(z6.object({
      postId: z6.number(),
      authorName: z6.string().min(1).max(255),
      authorEmail: z6.string().email(),
      content: z6.string().min(1).max(5e3)
    })).mutation(async ({ input }) => {
      await createComment({ ...input, status: "pending" });
      return { success: true, message: "Coment\xE1rio enviado para modera\xE7\xE3o" };
    }),
    getPendingComments: adminProcedure2.query(async () => getPendingComments()),
    approveComment: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input, ctx }) => {
      await updateCommentStatus(input.id, "approved", ctx.user.id);
      return { success: true };
    }),
    rejectComment: adminProcedure2.input(z6.object({ id: z6.number(), reason: z6.string().optional() })).mutation(async ({ input, ctx }) => {
      await updateCommentStatus(input.id, "rejected", ctx.user.id, input.reason);
      return { success: true };
    }),
    deleteComment: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteComment(input.id);
      return { success: true };
    })
  }),
  search: router({
    query: publicProcedure.input(z6.object({ q: z6.string() })).query(async ({ input }) => {
      if (!input.q || input.q.trim().length === 0) {
        return { posts: [], pages: [] };
      }
      return searchContent(input.q);
    })
  }),
  media: router({
    getLibrary: publicProcedure.input(z6.object({ limit: z6.number().default(50), offset: z6.number().default(0) }).passthrough()).query(async ({ input }) => getMediaLibrary(input.limit, input.offset)),
    getByType: publicProcedure.input(z6.object({ fileType: z6.enum(["image", "video"]), limit: z6.number().default(50), offset: z6.number().default(0) }).passthrough()).query(async ({ input }) => getMediaByType(input.fileType, input.limit, input.offset)),
    getById: publicProcedure.input(z6.object({ id: z6.number() }).passthrough()).query(async ({ input }) => getMediaById(input.id)),
    createMedia: editorProcedure.input(z6.object({
      title: z6.string().min(1).max(255),
      description: z6.string().optional(),
      url: z6.string().url(),
      fileKey: z6.string(),
      fileType: z6.enum(["image", "video"]),
      mimeType: z6.string(),
      fileSize: z6.number().optional(),
      width: z6.number().optional(),
      height: z6.number().optional(),
      duration: z6.number().optional()
    })).mutation(async ({ input, ctx }) => {
      await createMediaItem({ ...input, uploadedBy: ctx.user.id });
      return { success: true };
    }),
    updateMedia: editorProcedure.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      description: z6.string().optional()
    })).mutation(async ({ input }) => {
      await updateMediaItem(input.id, { title: input.title, description: input.description });
      return { success: true };
    }),
    deleteMedia: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteMediaItem(input.id);
      return { success: true };
    })
  }),
  services: router({
    list: publicProcedure.query(async () => listServices(true)),
    listAll: adminProcedure2.query(async () => listServices(false)),
    getAll: publicProcedure.input(z6.object({
      visibility: z6.enum(["site", "intranet", "both"]).default("site")
    }).optional()).query(async ({ input }) => {
      const visibility = input?.visibility || "site";
      const services2 = await listServices(true, visibility);
      return services2 || [];
    }),
    getById: publicProcedure.input(z6.object({ id: z6.number() }).passthrough()).query(async ({ input }) => getServiceById(input.id)),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      icon: z6.string().min(1),
      link: z6.string().url(),
      color: z6.string().default("#0066CC"),
      sortOrder: z6.number().default(0),
      isActive: z6.boolean().default(true)
    })).mutation(async ({ input }) => {
      await createService(input);
      return { success: true };
    }),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      icon: z6.string().optional(),
      link: z6.string().url().optional(),
      color: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateService(id, data);
      return { success: true };
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteService(input.id);
      return { success: true };
    }),
    getAnalytics: adminProcedure2.query(async () => getAllServicesAnalytics()),
    recordClick: publicProcedure.input(z6.object({ serviceId: z6.number() })).mutation(async ({ input, ctx }) => {
      const userAgent = ctx.req.headers["user-agent"];
      const referer = ctx.req.headers["referer"];
      const ipAddress = ctx.req.ip || ctx.req.socket.remoteAddress;
      await recordServiceClick(
        input.serviceId,
        userAgent,
        referer,
        ipAddress
      );
      return { success: true };
    })
  }),
  documentCategories: router({
    list: publicProcedure.query(async () => listDocumentCategories()),
    create: adminProcedure2.input(z6.object({
      name: z6.string().min(1),
      description: z6.string().optional(),
      sortOrder: z6.number().optional()
    })).mutation(async ({ input }) => {
      const slug = slugify2(input.name);
      return createDocumentCategory({
        name: input.name,
        slug,
        description: input.description,
        sortOrder: input.sortOrder || 0
      });
    }),
    update: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      description: z6.string().optional(),
      sortOrder: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateDocumentCategory(id, data);
    }),
    delete: adminProcedure2.input(z6.object({ id: z6.number() })).mutation(async ({ input }) => {
      await deleteDocumentCategory(input.id);
      return { success: true };
    })
  }),
  documents: router({
    list: publicProcedure.query(async () => {
      const docs = await getDocumentsWithCategories();
      return docs.map((doc) => ({
        ...doc,
        document_categories: doc.category
      }));
    }),
    listByCategory: publicProcedure.input(z6.object({ categoryId: z6.number() }).passthrough()).query(async ({ input }) => listDocumentsByCategory(input.categoryId)),
    create: protectedProcedure.input(z6.object({
      name: z6.string().min(1),
      description: z6.string().optional(),
      categoryId: z6.number().min(1),
      fileUrl: z6.string().min(1),
      fileKey: z6.string().min(1),
      fileSize: z6.number().min(1),
      mimeType: z6.string().min(1)
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "contributor") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      return createDocument({
        name: input.name,
        description: input.description,
        categoryId: input.categoryId,
        fileUrl: input.fileUrl,
        fileKey: input.fileKey,
        fileSize: input.fileSize,
        mimeType: input.mimeType,
        uploadedBy: ctx.user.id
      });
    }),
    update: protectedProcedure.input(z6.object({
      id: z6.number(),
      name: z6.string().optional(),
      description: z6.string().optional(),
      categoryId: z6.number().optional(),
      isActive: z6.boolean().optional()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "contributor") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      const { id, ...data } = input;
      return updateDocument(id, data);
    }),
    delete: protectedProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "contributor") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      await deleteDocument(input.id);
      return { success: true };
    }),
    search: publicProcedure.input(z6.object({ query: z6.string().min(1) }).passthrough()).query(async ({ input }) => searchDocuments(input.query)),
    recordDownload: publicProcedure.input(z6.object({
      documentId: z6.number(),
      versionId: z6.number().optional()
    })).mutation(async ({ input, ctx }) => {
      const userAgent = ctx.req.headers["user-agent"];
      const ipAddress = ctx.req.ip || ctx.req.socket.remoteAddress;
      await recordDocumentDownload({
        documentId: input.documentId,
        versionId: input.versionId,
        userAgent,
        ipAddress
      });
      return { success: true };
    }),
    getDownloadStats: adminProcedure2.query(async () => getAllDocumentDownloadStats()),
    getDocumentStats: adminProcedure2.input(z6.object({ documentId: z6.number() })).query(async ({ input }) => getDocumentDownloadStats(input.documentId)),
    getFeatured: publicProcedure.query(async () => getFeaturedDocuments()),
    getCategories: publicProcedure.query(async () => getDocumentCategories()),
    getFeaturedByCategory: publicProcedure.input(z6.object({ categoryId: z6.number().optional(), limit: z6.number().default(3), offset: z6.number().default(0) }).passthrough()).query(async ({ input }) => getFeaturedDocumentsByCategory(input.categoryId, input.limit, input.offset)),
    toggleFeatured: adminProcedure2.input(z6.object({ id: z6.number(), isFeatured: z6.boolean() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      return updateDocument(input.id, { isFeatured: input.isFeatured });
    }),
    searchAdvanced: publicProcedure.input(z6.object({
      query: z6.string().optional(),
      categoryId: z6.number().optional(),
      minSize: z6.number().optional(),
      maxSize: z6.number().optional(),
      startDate: z6.date().optional(),
      endDate: z6.date().optional()
    })).query(async ({ input }) => searchDocumentsAdvanced(input)),
    getRecent: publicProcedure.query(async () => getRecentDocuments()),
    getMostDownloaded: publicProcedure.query(async () => getMostDownloadedDocuments()),
    updateOrder: adminProcedure2.input(z6.object({
      documentId: z6.number(),
      sortOrder: z6.number()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      await updateDocumentOrder(input.documentId, input.sortOrder);
      return { success: true };
    }),
    reorderFeatured: adminProcedure2.input(z6.object({
      orders: z6.array(z6.object({
        id: z6.number(),
        sortOrder: z6.number()
      }))
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      await reorderFeaturedDocuments(input.orders);
      return { success: true };
    }),
    getFeaturedOrdered: publicProcedure.query(async () => getFeaturedDocumentsOrdered()),
    updateName: adminProcedure2.input(z6.object({
      id: z6.number(),
      name: z6.string().min(1)
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      return updateDocument(input.id, { name: input.name });
    })
  }),
  documentVersions: router({
    list: publicProcedure.input(z6.object({ documentId: z6.number() }).passthrough()).query(async ({ input }) => getDocumentVersions(input.documentId)),
    create: protectedProcedure.input(z6.object({
      documentId: z6.number(),
      fileUrl: z6.string().min(1),
      fileKey: z6.string().min(1),
      fileSize: z6.number().min(1),
      mimeType: z6.string().min(1),
      changeDescription: z6.string().optional()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "contributor") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      const versionNumber = await getNextVersionNumber(input.documentId);
      return createDocumentVersion({
        documentId: input.documentId,
        versionNumber,
        fileUrl: input.fileUrl,
        fileKey: input.fileKey,
        fileSize: input.fileSize,
        mimeType: input.mimeType,
        uploadedBy: ctx.user.id,
        changeDescription: input.changeDescription
      });
    })
  }),
  pageBlocks: router({
    list: publicProcedure.input(z6.object({ pageId: z6.number() }).passthrough()).query(async ({ input }) => getPageBlocks(input.pageId)),
    create: protectedProcedure.input(z6.object({
      pageId: z6.number(),
      blockType: z6.enum(["services", "documentCategories", "images", "text", "html"]),
      title: z6.string().optional(),
      description: z6.string().optional(),
      config: z6.any().optional()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return createPageBlock({
        pageId: input.pageId,
        blockType: input.blockType,
        title: input.title,
        description: input.description,
        config: input.config,
        sortOrder: 0
      });
    }),
    update: protectedProcedure.input(z6.object({
      id: z6.number(),
      title: z6.string().optional(),
      description: z6.string().optional(),
      config: z6.any().optional()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return updatePageBlock(input.id, {
        title: input.title,
        description: input.description,
        config: input.config
      });
    }),
    delete: protectedProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return deletePageBlock(input.id);
    })
  }),
  pageBlockItems: router({
    list: publicProcedure.input(z6.object({ blockId: z6.number() }).passthrough()).query(async ({ input }) => getPageBlockItems(input.blockId)),
    create: protectedProcedure.input(z6.object({
      blockId: z6.number(),
      itemType: z6.enum(["service", "documentCategory", "image"]),
      itemId: z6.number().optional(),
      customData: z6.any().optional()
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return createPageBlockItem({
        blockId: input.blockId,
        itemType: input.itemType,
        itemId: input.itemId,
        customData: input.customData,
        sortOrder: 0
      });
    }),
    delete: protectedProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return deletePageBlockItem(input.id);
    })
  }),
  imagesBank: router({
    list: publicProcedure.input(z6.object({ limit: z6.number().default(100), offset: z6.number().default(0) }).passthrough()).query(async ({ input }) => getImagesBank(input.limit, input.offset)),
    getBySourceType: publicProcedure.input(z6.object({ sourceType: z6.string() })).query(async ({ input }) => getImagesBySourceType(input.sourceType)),
    delete: protectedProcedure.input(z6.object({ id: z6.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
      return deleteImageFromBank(input.id);
    })
  }),
  menu: menuRouter,
  // menu: router({
  //   list: publicProcedure.query(async () => db.getMenuItems()),
  //   hierarchy: publicProcedure.query(async () => db.getMenuItemsHierarchy()),
  //   create: protectedProcedure.input(z.object({
  //     label: z.string().min(1),
  //     linkType: z.enum(["internal", "external"]).optional(),
  //     internalPageId: z.number().optional(),
  //     externalUrl: z.string().optional(),
  //     parentId: z.number().optional(),
  //     sortOrder: z.number().default(0),
  //     openInNewTab: z.boolean().default(false),
  //     isColumnTitle: z.boolean().default(false),
  //   })).mutation(async ({ input, ctx }) => {
  //     if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  //     if (!input.isColumnTitle && !input.linkType) {
  //       throw new TRPCError({ code: "BAD_REQUEST", message: "linkType obrigatorio" });
  //     }
  //     if (!input.isColumnTitle) {
  //       if (input.linkType === "internal" && !input.internalPageId) {
  //         throw new TRPCError({ code: "BAD_REQUEST", message: "Pagina obrigatoria" });
  //       }
  //       if (input.linkType === "external" && !input.externalUrl) {
  //         throw new TRPCError({ code: "BAD_REQUEST", message: "URL obrigatoria" });
  //       }
  //     }
  //     return db.createMenuItem({
  //       label: input.label,
  //       linkType: input.linkType || "internal",
  //       internalPageId: input.internalPageId,
  //       externalUrl: input.externalUrl,
  //       parentId: input.parentId || null,
  //       sortOrder: input.sortOrder,
  //       openInNewTab: input.openInNewTab,
  //       isColumnTitle: input.isColumnTitle,
  //       isActive: true,
  //     });
  //   }),
  //   update: protectedProcedure.input(z.object({
  //     id: z.number(),
  //     label: z.string().optional(),
  //     linkType: z.enum(["internal", "external"]).optional(),
  //     internalPageId: z.number().optional(),
  //     externalUrl: z.string().optional(),
  //      parentId: z.number().nullable().optional(),
  //     sortOrder: z.number().optional(),
  //     openInNewTab: z.boolean().optional(),
  //     isColumnTitle: z.boolean().optional(),
  //     isActive: z.boolean().optional(),
  //   })).mutation(async ({ input, ctx }) => {
  //     if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  //     const { id, ...data } = input;
  //     return db.updateMenuItem(id, data);
  //   }),
  //   delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
  //     if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  //     return db.deleteMenuItem(input.id);
  //   }),
  //   reorder: protectedProcedure.input(z.object({
  //     items: z.array(z.object({
  //       id: z.number(),
  //       parentId: z.number().nullable(),
  //       sortOrder: z.number(),
  //     })),
  //   })).mutation(async ({ input, ctx }) => {
  //     if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  //     return db.updateMenuItemOrder(input.items);
  //   }),
  // }),
  analytics: router({
    getMetrics: publicProcedure.input(z6.object({
      range: z6.enum(["7days", "30days", "90days", "all"]).default("30days")
    })).query(async ({ input }) => {
      const metrics = await getAnalyticsMetrics(input.range);
      return metrics;
    }),
    getTopPosts: publicProcedure.input(z6.object({
      limit: z6.number().default(10)
    })).query(async ({ input }) => {
      const posts2 = await getTopPostsByViews(input.limit);
      return posts2;
    }),
    getEngagementTrend: publicProcedure.input(z6.object({
      range: z6.enum(["7days", "30days", "90days", "all"]).default("30days")
    })).query(async ({ input }) => {
      const trend = await getEngagementTrend(input.range);
      return trend;
    })
  }),
  postsRouter: router({
    recordViewWithLimit: publicProcedure.input(z6.object({
      postId: z6.number(),
      ipAddress: z6.string()
    })).mutation(async ({ input }) => {
      const success = await recordPostViewWithLimit(input.postId, input.ipAddress);
      return { success };
    }),
    getTrendingPosts: publicProcedure.input(z6.object({
      days: z6.number().default(7),
      limit: z6.number().default(5)
    }).passthrough()).query(async ({ input }) => {
      const posts2 = await getTrendingPosts(input.days, input.limit);
      return posts2;
    }),
    getPostEngagementTrend: publicProcedure.input(z6.object({
      postId: z6.number(),
      days: z6.number().default(7)
    }).passthrough()).query(async ({ input }) => {
      const trend = await getPostEngagementTrend(input.postId, input.days);
      return trend;
    })
  }),
  socialShares: router({
    recordShare: publicProcedure.input(z6.object({
      postId: z6.number(),
      platform: z6.enum(["whatsapp", "facebook", "twitter"]),
      ipAddress: z6.string(),
      userAgent: z6.string().optional()
    })).mutation(async ({ input }) => {
      await recordSocialShare(input.postId, input.platform, input.ipAddress, input.userAgent);
      return { success: true };
    }),
    getShareStats: publicProcedure.input(z6.object({
      postId: z6.number()
    })).query(async ({ input }) => {
      const stats = await getSocialShareStats(input.postId);
      return stats;
    }),
    getMostShared: publicProcedure.input(z6.object({
      limit: z6.number().default(5)
    })).query(async ({ input }) => {
      const posts2 = await getMostSharedPosts(input.limit);
      return posts2;
    })
  }),
  advancedAnalytics: router({
    getSharesByPlatform: publicProcedure.input(z6.object({
      days: z6.number().default(30)
    })).query(async ({ input }) => {
      const shares = await getSharesByPlatform(input.days);
      return shares;
    }),
    getConversionRate: publicProcedure.input(z6.object({
      days: z6.number().default(30)
    })).query(async ({ input }) => {
      const rate = await getConversionRate(input.days);
      return rate;
    }),
    getPerformanceComparison: publicProcedure.input(z6.object({
      currentDays: z6.number().default(30),
      previousDays: z6.number().default(30)
    })).query(async ({ input }) => {
      const comparison = await getPerformanceComparison(input.currentDays, input.previousDays);
      return comparison;
    }),
    getTopPostsByEngagement: publicProcedure.input(z6.object({
      days: z6.number().default(30),
      limit: z6.number().default(10)
    })).query(async ({ input }) => {
      const posts2 = await getTopPostsByEngagement(input.days, input.limit);
      return posts2;
    }),
    getEngagementByDay: publicProcedure.input(z6.object({
      days: z6.number().default(30)
    })).query(async ({ input }) => {
      const data = await getEngagementByDay(input.days);
      return data;
    })
  }),
  reports: router({
    exportAnalyticsPDF: adminProcedure2.input(z6.object({
      period: z6.string().default("\xDAltimos 30 dias"),
      days: z6.number().default(30)
    })).query(async ({ input }) => {
      try {
        const sharesByPlatform = await getSharesByPlatform(input.days);
        const conversionRate = await getConversionRate(input.days);
        const performanceComparison = await getPerformanceComparison(input.days, input.days);
        const topPosts = await getTopPostsByEngagement(input.days, 10);
        const perfComp = performanceComparison || { current: { views: 0, shares: 0 }, previous: { views: 0, shares: 0 }, comparison: { viewsChange: 0, sharesChange: 0 } };
        const reportData = {
          period: input.period,
          generatedAt: /* @__PURE__ */ new Date(),
          totalViews: conversionRate.totalViews,
          totalShares: conversionRate.totalShares,
          conversionRate: conversionRate.conversionRate,
          sharesByPlatform: sharesByPlatform || [],
          performanceComparison: perfComp,
          topPosts: (topPosts || []).map((p) => ({
            title: p.title || "Sem t\xEDtulo",
            views: p.views || 0,
            shares: p.shares || 0,
            engagementScore: p.engagementScore || 0
          }))
        };
        const pdfBuffer = generateAnalyticsPDF(reportData);
        const base64 = pdfBuffer.toString("base64");
        return {
          success: true,
          data: base64,
          filename: `analytics-report-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`
        };
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        throw new TRPCError4({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao gerar relat\xF3rio em PDF"
        });
      }
    })
  }),
  password: router({
    requestReset: publicProcedure.input(z6.object({ email: z6.string().email() })).mutation(async ({ input }) => {
      const user = await getUserByEmail(input.email);
      if (!user) {
        return { success: true, message: "Se o email existir, um link de reset ser\xE1 enviado" };
      }
      const crypto = await import("crypto");
      const token = crypto.randomBytes(32).toString("hex");
      await createPasswordResetToken(user.id, token, 24);
      console.log(`[Password Reset] Token para ${user.email}: ${token}`);
      return { success: true, message: "Se o email existir, um link de reset ser\xE1 enviado" };
    }),
    validateToken: publicProcedure.input(z6.object({ token: z6.string() })).query(async ({ input }) => {
      const resetToken = await getPasswordResetToken(input.token);
      if (!resetToken) {
        throw new TRPCError4({ code: "NOT_FOUND", message: "Token inv\xE1lido ou expirado" });
      }
      return { valid: true, userId: resetToken.userId };
    }),
    resetPassword: publicProcedure.input(z6.object({
      token: z6.string(),
      newPassword: z6.string().min(8)
    })).mutation(async ({ input }) => {
      const resetToken = await getPasswordResetToken(input.token);
      if (!resetToken) {
        throw new TRPCError4({ code: "NOT_FOUND", message: "Token inv\xE1lido ou expirado" });
      }
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_password(), password_exports));
      const passwordHash = await hashPassword2(input.newPassword);
      await updateUserPassword(resetToken.userId, passwordHash);
      await markPasswordResetTokenAsUsed(resetToken.id);
      const user = await getUserById(resetToken.userId);
      if (user) {
        const { subject, html } = (await Promise.resolve().then(() => (init_email(), email_exports))).getSecurityNotificationEmailTemplate(
          "Senha Alterada",
          "Sua senha foi alterada com sucesso. Se voc\xEA n\xE3o realizou esta a\xE7\xE3o, entre em contato com o suporte imediatamente.",
          {
            "Data/Hora": (/* @__PURE__ */ new Date()).toLocaleString("pt-BR"),
            "Email": user.email || "N/A"
          }
        );
      }
      await createAuditLog({
        userId: resetToken.userId,
        action: "reset_password",
        entityType: "user",
        entityId: resetToken.userId,
        status: "success"
      });
      return { success: true, message: "Senha alterada com sucesso" };
    })
  }),
  audit: router({
    logs: adminProcedure2.input(z6.object({
      userId: z6.number().optional(),
      action: z6.string().optional(),
      entityType: z6.string().optional(),
      startDate: z6.date().optional(),
      endDate: z6.date().optional(),
      limit: z6.number().default(50),
      offset: z6.number().default(0),
      visibility: z6.enum(["site", "intranet", "both"]).optional()
    })).query(async ({ input }) => {
      return getAuditLogs({
        userId: input.userId,
        action: input.action,
        entityType: input.entityType,
        startDate: input.startDate,
        endDate: input.endDate,
        limit: input.limit,
        offset: input.offset
      });
    }),
    count: adminProcedure2.input(z6.object({
      userId: z6.number().optional(),
      action: z6.string().optional(),
      entityType: z6.string().optional(),
      startDate: z6.date().optional(),
      endDate: z6.date().optional()
    })).query(async ({ input }) => {
      return getAuditLogCount({
        userId: input.userId,
        action: input.action,
        entityType: input.entityType,
        startDate: input.startDate,
        endDate: input.endDate
      });
    })
  }),
  menuPermissions: router({
    getByRole: adminProcedure2.input(z6.object({ role: z6.string() })).query(async ({ input }) => {
      return await getMenuPermissionsByRole(input.role);
    }),
    setPermission: adminProcedure2.input(z6.object({
      role: z6.string(),
      menuItemId: z6.number(),
      canAccess: z6.boolean()
    })).mutation(async ({ input }) => {
      await setMenuPermission(input.role, input.menuItemId, input.canAccess);
      return { success: true };
    }),
    updateBatch: adminProcedure2.input(z6.object({
      role: z6.string(),
      menuItemIds: z6.array(z6.number()),
      canAccess: z6.boolean()
    })).mutation(async ({ input }) => {
      await updateMenuPermissionsBatch(input.role, input.menuItemIds, input.canAccess);
      return { success: true };
    })
  })
});

// server/_core/context.ts
init_db();
import { jwtVerify } from "jose";
import { createSecretKey } from "crypto";
var JWT_SECRET = process.env.JWT_SECRET || "changeme";
var secretKey = createSecretKey(JWT_SECRET, "utf-8");
async function createContext(opts) {
  let user = null;
  try {
    const token = opts.req.cookies.session;
    if (token) {
      const { payload } = await jwtVerify(token, secretKey);
      user = await getUserById(payload.id);
    }
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/auth.ts
import { createSecretKey as createSecretKey2 } from "crypto";
var JWT_SECRET2 = process.env.JWT_SECRET || "changeme";
var secretKey2 = createSecretKey2(JWT_SECRET2, "utf-8");
function registerAuthRoutes(app2) {
}

// server/index.ts
var app = express();
app.use(cors({
  origin: [
    "http://10.3.138.19",
    "http://10.3.138.19:3000",
    "http://localhost:3000",
    "http://localhost"
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
registerAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var publicPath = path2.resolve(process.cwd(), "public");
app.use("/assets", express.static(path2.join(publicPath, "assets"), {
  setHeaders: (res, path3) => {
    if (path3.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    } else if (path3.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }
  }
}));
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path2.join(publicPath, "index.html"));
});
var PORT = process.env.PORT ?? 3e3;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[DEGASE CMS] Servidor rodando na porta ${PORT}`);
});
