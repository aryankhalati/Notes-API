const z = require('zod');

const noteSchema = z.object({
    title: z.string()
        .trim()
        .min(1, 'Title is required')
        .max(100, 'Title must be at most 100 characters'),
    content: z.string()
        .trim()
        .min(1, 'Content is required')
});

module.exports = { noteSchema };