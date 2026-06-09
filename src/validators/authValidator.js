const z = require('zod');

const Register = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const Login = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

module.exports = {Register, Login};