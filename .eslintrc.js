module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: [
        'standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ["warn", 4, {
            //设置为1时强制switch语句中case的缩进为2个空格
            "SwitchCase": 1
		}],
		"prefer-promise-reject-errors": 0
    },
    globals: {
        "__dirname": false
    }
}
