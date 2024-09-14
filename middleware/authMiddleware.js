export const checkVendorAuth = (req, res, next) => {
  const { cookies } = req;
  const token = cookies["vendor-auth-token"]; // Check for auth cookie

  if (!token) {
    return res.redirect("/auth/");
  }

  // Validate the token and continue
  next();
};
