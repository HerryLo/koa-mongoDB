"use strict"

import path from 'path'
import fs from 'fs'
import config from '../config/config'

/**
 * 上传文件保存到服务器
 */
export async function CreateArtimgFs(file) {
    const ext ='.'+file.type.split('/')[1]
    const name = file.name.split('.')[0]
    const imgName = `${name}_${new Date().getTime().toString()}${ext}`
    const newpath =path.join(__dirname, '../public/artimg/'+imgName)
    const reader = await fs.createReadStream(file.path) //创建可读流
    const stream = await fs.createWriteStream(newpath) //创建一个可写流
    await reader.pipe(stream)
    return `${config.Imgurl}/artimg/${imgName}`
}