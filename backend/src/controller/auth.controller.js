export const signup = async (res, req) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feild required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at leat 6 characters" });
    }
    //check if email is valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //    const user
  } catch (error) {}
};
