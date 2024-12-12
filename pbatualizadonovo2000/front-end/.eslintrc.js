module.exports = {
  rules: {
    'vue/multi-word-component-names': "off", // Desativa a regra globalmente
  },
  extends: [
    'plugin:vue/vue3-recommended', // ou vue3-essential, se preferir
  ],
  parserOptions: {
    ecmaVersion: 2020, // ou superior
    sourceType: 'module',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
};
