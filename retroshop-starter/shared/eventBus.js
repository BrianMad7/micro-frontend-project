/**
 * Event Bus - Communication entre Micro-Frontends
 *
 * Pattern Pub/Sub simple et efficace.
 *
 * Usage:
 *   import eventBus from 'shared/eventBus';
 *
 *   // S'abonner
 *   eventBus.on('event:name', (data) => console.log(data));
 *
 *   // Emettre
 *   eventBus.emit('event:name', { key: 'value' });
 *
 *   // Se desabonner
 *   eventBus.off('event:name', callback);
 */

class EventBus {
  constructor() {
    this.listeners = {};
  }

  _getTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
  }

  /**
   * S'abonner a un evenement
   * @param {string} event - Nom de l'evenement
   * @param {Function} callback - Fonction a appeler
   * @returns {Function} Fonction pour se desabonner
   */
  on(event, callback, subscriberName = 'inconnu') {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      const wrappedCallback = (data) => {
        console.log(`${this._getTime()} EVENT BUS ↓ ${event} (traite par ${subscriberName})`);
        callback(data);
      };

      wrappedCallback.originalCallback = callback;
      
      this.listeners[event].push(wrappedCallback);

      return () => this.off(event, callback);
    }

  /**
   * Se desabonner d'un evenement
   * @param {string} event - Nom de l'evenement
   * @param {Function} callback - Fonction a retirer
   */
  off(event, callback) {
    if (!this.listeners[event]) return;
    
    this.listeners[event] = this.listeners[event].filter(
      cb => cb.originalCallback !== callback
    );
  }

  /**
   * Emettre un evenement
   * @param {string} event - Nom de l'evenement
   * @param {any} data - Donnees a transmettre
   */
  emit(event, data) {
    console.log(`${this._getTime()} EVENT BUS ↑ ${event}`, data);

    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[EventBus] Error in listener for ${event}:`, error);
      }
    });
  }

  /**
   * S'abonner une seule fois
   * @param {string} event - Nom de l'evenement
   * @param {Function} callback - Fonction a appeler
   */
  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// Singleton global - partage entre tous les MFEs
if (!window.__EVENT_BUS__) {
  window.__EVENT_BUS__ = new EventBus();
}

export default window.__EVENT_BUS__;
