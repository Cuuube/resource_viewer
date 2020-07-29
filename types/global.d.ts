interface Dict<T> {
    [key: string]: T,
}

interface IFileInfo {
    fullpath: string
    isDir: boolean
    modifyTime: number
    name?: string
    size: number
    ext?: string
}

