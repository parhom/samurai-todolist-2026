import {appReducer, changeThemeModeAC, ThemeMode} from "./app-reducer.ts";
import {expect, test} from "vitest";

let startState = {
	themeMode: 'light' as ThemeMode
}

test('correct switch themeMode',()=>{
	const endState = appReducer(startState, changeThemeModeAC({mode:'dark'}))
	
	expect(endState.themeMode).toBe('dark')
})