import { Router } from "express";

import { agregarUsuario } from "../controllers/usuario.controller.js";

import { busquedaTodo } from "../controllers/usuario.controller.js";

import { obtenerUsuarioPorId  } from "../controllers/usuario.controller.js";

import { eliminarUsuario } from "../controllers/usuario.controller.js";

import { editarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/",agregarUsuario);
router.get("/",busquedaTodo);
router.get("/:id", obtenerUsuarioPorId);
router.delete("/:id", eliminarUsuario);
router.put("/:id", editarUsuario);

export default router;