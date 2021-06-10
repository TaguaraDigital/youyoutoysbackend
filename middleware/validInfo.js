module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {

        if (![email, name, password].every(Boolean)) {
            return res.status(401).json({
                status: 401,
                success: false,
                msg: 'Register --> Missing Credentials'
            });
        } else if (!validEmail(email)) {
            return res.status(401).json({
                status: 401,
                success: false,
                msg: "Register --> Invalid Email"
            })
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json({
                status: 401,
                success: false,
                msg: 'Login --> Missing Credentials'
            });
        } else if (!validEmail(email)) {
            return res.status(401).json({
                status: 401,
                success: false,
                msg: "Login --> Invalid Email"
            })
        }
    }
    next();
};