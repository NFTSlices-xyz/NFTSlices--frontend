import { atom } from 'jotai'

interface NFT {
  owner: string
  buyer: string
  price: number
  tokenId: number
}

export const textState = atom('')
export const NFTatom = atom<NFT>({ owner: '', buyer: '', price: 0, tokenId: 0 })
