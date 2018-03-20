export class Script {
    constructor({ title, description, func, id = Date.now() }) {
        this.id = id;
        this.title = title;
        this.description = description,
        this.func = func;
    }

    static validateScript(title, description, func) {
        const errors = {};
        if (!title) errors.title = 'Title is required';
        if (!description) errors.description = 'Description is required';
        if (!func) errors.func =  'Function is required';

        return errors;
    }
}