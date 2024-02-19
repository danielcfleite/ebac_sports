import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type FavoritosState = {
  favoritos: Produto[]
}

const initialState: FavoritosState = {
  favoritos: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload

      if (state.favoritos.find((p) => p.id === produto.id)) {
        if (confirm(`Deseja remover ${produto.nome} dos favoritos ?`)) {
          const favoritosSemProduto = state.favoritos.filter(
            (p) => p.id !== produto.id
          )
          state.favoritos = favoritosSemProduto
        } else {
          return
        }
      } else {
        state.favoritos.push(produto)
      }
    }
  }
})

export const selectFavoritos = (state: FavoritosState) => state.favoritos

export const { favoritar } = favoritosSlice.actions
export default favoritosSlice.reducer
