interface GetTileSize {
  (videoWidth: number, videoHeight: number): { [key: string] : { width: number, height: number }}
}

export const getTileSize: GetTileSize = (videoWidth, videoHeight) => {
  return {
    2: { width: videoWidth / 2, height: videoHeight},
    3: { width: videoWidth / 3, height: videoHeight},
    4: { width: videoWidth / 2, height: videoHeight / 2 },
    6: { width: videoWidth / 3, height: videoHeight / 2 },
    9: { width: videoWidth / 3, height: videoHeight / 3 }
  }
}