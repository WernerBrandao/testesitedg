import { router } from "@trpc/server";

// importe aqui TODOS os sub-routers
//import { categoriesRouter } from "./categories/router";
//import { postsRouter } from "./posts/router";
//import { bannersRouter } from "./banners/router";
//import { servicesRouter } from "./services/router";
//import { documentsRouter } from "./documents/router";
//import { unitsRouter } from "./units/router";
//import { menuRouter } from "./menu/router";
//import { pagesRouter } from "./pages/router";
//import { videosRouter } from "./videos/router";
import { uploadRouter } from "./routers/uploads.js";

export const appRouter = router({
 // categories: categoriesRouter,
 // posts: postsRouter,
 // banners: bannersRouter,
 // services: servicesRouter,
 // documents: documentsRouter,
 // units: unitsRouter,
 // menu: menuRouter,
 // pages: pagesRouter,
 // videos: videosRouter,
  upload: uploadRouter
});

export type AppRouter = typeof appRouter;