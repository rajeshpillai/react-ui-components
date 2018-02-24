  const  createStore = (reducer, defaultState) => {
    let state = defaultState || [];
    let listeners = [];
    const getState = () => state;
    
    const dispatch = (action) => {
      state = reducer(state,action);
      listeners.forEach(listener => listener());
    };
    
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
    
    dispatch({});  // init
    
    return { getState, dispatch, subscribe};
    
  }
  
  const combineReducers = (reducers) => {
    return function combination (state = {}, action) {
      return Object.keys(reducers).reduce((nextState, key) => {
          nextState[key] = reducers[key](state[key],action);
          return nextState;
        },
        {} // initial next state
      );
    }
  }
  
  export {createStore, combineReducers};