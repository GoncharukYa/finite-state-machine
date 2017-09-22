class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.initial = [config.initial];
      this.head = 0;
      this.states = {
          normal: {
              transitions: {
                  study: config.states.normal.transitions.study
              }
          },
          busy: {
              transitions: {
                  get_tired: config.states.busy.transitions.get_tired,
                  get_hungry: config.states.busy.transitions.get_hungry,
              }
          },
          hungry: {
              transitions: {
                  eat: config.states.hungry.transitions.eat
              }
          },
          sleeping: {
              transitions: {
                  get_hungry: config.states.sleeping.transitions.get_hungry,
                  get_up: config.states.sleeping.transitions.get_up,
              }
          }
      }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.initial[this.head];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (!(state in this.states)) {
        throw new SyntaxError("The state is missing!");
      } else {
        this.initial.length = this.head + 1; //Cut all states after head.
        this.initial.push(state);
        this.head++;
      }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (!(event in this.states[this.initial[this.head]].transitions)) {
        throw new SyntaxError("The transition is missing!");
      } else {
        this.initial.length = this.head + 1; //Cut all states after head.
        this.initial.push(this.states[this.initial[this.head]].transitions[event]);
        this.head++;
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.initial.length = 0;
      this.initial.push('normal');
      this.head = 0;

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (event === undefined) {
        return Object.keys(this.states);
      }
      let events = [];
      for (let state in this.states) {
        if (event in this.states[state].transitions) {
          events.push(state);
        }
      }
      return events;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.head > 0) {
      this.head--;
      return true;
      } else {
          return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.initial.length !== this.head + 1) {
      this.head++;
      return true;
      } else {
          return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      let currentState = this.initial[this.head];
      this.initial.length = 0;
      this.head = 0;
      this.initial.push(currentState);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
