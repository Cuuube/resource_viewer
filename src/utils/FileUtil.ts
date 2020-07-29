export const isImage = (file: IFileInfo): boolean =>  {
    // why cant file.ext?.toLowerCase()
    return !file.isDir && ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'].includes((file.ext || '').toLowerCase())
}

export const isVideo = (file: IFileInfo): boolean => {
    return !file.isDir && ['mp4', 'm4v', 'mpeg4', 'avi'].includes((file.ext || '').toLowerCase())
}

export const isText = (file: IFileInfo): boolean => {
    return !file.isDir && ['txt', 'go', 'py', 'js', 'ts', 'html', 'htm', 'vue'].includes((file.ext || '').toLowerCase())
}