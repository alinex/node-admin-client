/*
export const somNutations = (state) => {
}
*/
export const login = (state, val) => {
  state.login = val !== undefined ? val : !state.login
}
