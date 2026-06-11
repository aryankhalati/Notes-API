const z = require('zod');

const todoSchema = z.object({
    title: z.string()
        .trim()
        .min(1, 'Title is required')
        .max(100, 'Title must be at most 100 characters')
});

module.exports = { todoSchema };