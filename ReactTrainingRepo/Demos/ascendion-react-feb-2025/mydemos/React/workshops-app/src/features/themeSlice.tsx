import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Theme = "light" | "dark";

interface ThemeState {
    value: Theme;
}

const initialState: ThemeState = {
    value: "light",
};

const themeSlice = createSlice({
    name: "theme",
    // initialState : initialState,
    initialState,
    reducers: {
        // one action type will be defined - "theme/toggleTheme"
        // one action creator will be defined - function toggleTheme() { return { type: "theme/toggleTheme" } }
        // curState is NOT the actual current state slice, but a copy of it (slice is just a part of the state that thhis reducer maintains)
        // you can mutate (change) curState as you wish
        // toolkit (using Immer.js) will create a new state internally
        toggleTheme(curState /*, action */) {
            // any arguments passed to the action creator will be available in action.payload
            curState.value = curState.value === "light" ? "dark" : "light";
        },
        // resetTheme() { // "theme/resetTheme"

        // }
    },
});

// selector used by the components
export const themeSelector = (state: RootState) => state.theme.value;

// action creators
const { toggleTheme /*, resetTheme */ } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

export type { Theme, ThemeState };
export { toggleTheme /*, resetTheme */, themeReducer };

export default themeSlice;