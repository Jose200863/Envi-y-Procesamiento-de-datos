import pool from "../../config/db.js";

export async function agregarUsuario(req, res) {
    try {
        const { nombre, correo, contrasena, confirmacion } = req.body;

        // Validar nombre
        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({
                error: "El nombre es obligatorio"
            });
        }

        // Validar correo
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correo || !regexCorreo.test(correo)) {
            return res.status(400).json({
                error: "El correo no tiene un formato válido"
            });
        }

        // Validar contraseña
        const regexContrasena =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!contrasena || !regexContrasena.test(contrasena)) {
            return res.status(400).json({ error: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número" });
        }

        // Validar confirmación
        if (contrasena !== confirmacion) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" });
        }

        const [result] = await pool.execute(
            `INSERT INTO usuarios
      (nombre, correo, contrasena)
      VALUES (?, ?, ?)`,
            [
                nombre,
                correo,
                contrasena
            ]
        );

        res.status(201).json({ id: result.insertId, nombre, correo });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.sqlMessage
        });
    }

}

export async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [usuarios] = await pool.execute(
      "SELECT id, nombre, correo FROM usuarios WHERE id = ?",
      [id],
    );

    if (usuarios.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json(usuarios[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function busquedaTodo(req, res) {
    try {
        const [usuarios] = await pool.execute(
            "SELECT * FROM usuarios"
        );

        res.status(201).json({usuarios});

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.sqlMessage
        });
    }
}

export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [usuarios] = await pool.execute(
      " DELETE FROM usuarios WHERE id = ?",
      [id],
    );

    if (usuarios.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json({message: "Id "+ id + " Usuario eliminado correctamente"});

  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function editarUsuario(req, res) {
  try {
    const { id } = req.params;

    const { contrasena } = req.body;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [usuarios] = await pool.execute(
      " UPDATE usuarios SET contrasena = ? WHERE id = ?",
      [contrasena, id]
    );

    if (usuarios.affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json({message: "Id "+ id + " Usuario editado correctamente"});

  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}