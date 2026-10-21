
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminPassword || !jwtSecret) {
      return res.status(500).json({
        message: "Admin authentication is not configured.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      adminPassword
    ).catch(() => false);

    const isValidPassword =
      passwordMatches || password === adminPassword;

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid admin password.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      jwtSecret,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Admin login successful.",
      token,
      expiresIn: "2h",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Something went wrong during admin login.",
    });
  }
};
