import { db } from "../data/data.js";
import { registerUserService } from "../services/userService.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sua-chave-super-secreta-e-longa-12345";

export const login = async (req, res) => {
  const { email, password } = req.body;
  db.read();
  const users = db.data.users;

  // 1. Validar se email e senha foram enviados
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    // 2. Encontrar o usuário no banco de dados
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    // 3. Verificar se a senha está correta
    if (user.senha !== password) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }

    // 4. Se tudo estiver correto, gerar o Token JWT
    const payload = {
      userId: user.id,
      name: user.nome,
      userRole: user.papel || "user",
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // 5. Anexa o token no cabeçalho através do Cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 hora
    });

    // 6. RETORNO JSON: Em vez de dar redirect aqui, avisamos ao front-end que deu certo
    // e enviamos a URL para onde ele deve guiar o usuário.
    return res.status(200).json({
      success: true,
      redirectTo: "/",
    });
  } catch (error) {
    console.error("Erro no processamento do login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
