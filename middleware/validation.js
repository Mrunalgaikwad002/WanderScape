const validateUserInput = (req, res, next) => {
    const { name, email, phone, password, cpassword } = req.body;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation (minimum 6 characters, at least one number and one letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: "Password must be at least 6 characters long and contain at least one letter and one number" 
        });
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Name validation (non-empty, only letters and spaces)
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ message: "Name must contain only letters and be at least 2 characters long" });
    }

    next();
};

export default validateUserInput; 