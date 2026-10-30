import {RootState} from "./store.ts";
import {ThemeMode} from "./app-reducer.ts";

export const selectThemeMode = (state: RootState):{themeMode:ThemeMode} => state.themeMode