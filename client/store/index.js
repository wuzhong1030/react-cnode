import AppState from "./app-state";

export {
    AppState
}

export default AppState;

// ssr
export const createStoreMap = () => {
    return {
        appState: new AppState()
    }
}