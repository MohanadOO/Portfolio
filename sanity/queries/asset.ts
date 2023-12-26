export const getAllAssets = `*[_type == 'assets']{
  filename,
  file{asset->{url}}
}`

export const getAsset = (fileName: string) => {
  return `*[_type == 'assets' && filename == '${fileName}']{
      filename,
      downloadName,
      file{asset->{url}}
    }[0]`
}
