import axios from 'axios'

const HOST = `${location.protocol}//${location.hostname}:8081`

export const getFileList = async (filePath: string): Promise<IFileInfo[]> => {
    const url = `${HOST}/resources?path=${filePath}`
    let res = await axios.get(url)
    let data: IFileInfo[] = res.data
    data = data.filter(d => d.isDir).concat(data.filter(d => !d.isDir))
    return data
}

export const getFileData = async (filePath: string): Promise<string> => {
    const url = `${HOST}/resources?path=${filePath}`
    let res = await axios.get(url)
    let data: string = res.data
    return data
}

export const getResourceSrc = (filePath: string): string => {
    return `${HOST}/resources?path=${filePath}`
}
