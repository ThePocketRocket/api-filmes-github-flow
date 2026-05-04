module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        // Globals do Node.js
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly",
        
        // Globals do Jest (para não dar erro de variável não definida nos testes)
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    },
    rules: {
      // Regras básicas
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
