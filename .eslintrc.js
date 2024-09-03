module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['node_modules']
            }
        }
    },
    plugins: ['node'],
    rules: {
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',
    },
};
