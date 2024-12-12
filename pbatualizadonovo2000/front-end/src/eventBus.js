import { reactive } from 'vue';

const eventBus = reactive({
  events: {},
  
  // Método para adicionar eventos
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  // Método para emitir eventos
  emit(event, payload) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(payload));
    }
  },

  // Método para remover eventos
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
});

export default eventBus;
