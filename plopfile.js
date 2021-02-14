module.exports = function (plop) {
    plop.setGenerator('error', {
        description: 'custom error',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'error name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/errors/{{pascalCase name}}Error.ts',
            templateFile: 'plop-templates/error.ts.hbs'
        }]
    });
};
