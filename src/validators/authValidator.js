const z = require('zod');

const registerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .trim(),
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(72, 'Password must be at most 72 characters')
});

const loginSchema = z.object({
    email: z.string()
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(72, 'Password must be at most 72 characters')
});

module.exports = { registerSchema, loginSchema };