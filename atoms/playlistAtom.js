import { atom } from "recoil";

export const playlistState = atom({
  key: 'playlistState',
  default: null
})

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '764YuHmq3p3tkL6Rxcnq0N'
})

export const showPlaylistState = atom({
  key: 'showPlaylistState',
  default: false,
})

export const showMenuState = atom({
  key: 'showMenuState',
  default: false,
})