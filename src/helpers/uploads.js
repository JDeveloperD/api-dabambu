// @ts-check
/**
 * @fileoverview upload.js, helpers para la carga de archivos
 * @version     1.0
 * @author      Interfaz
 *
 */

import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { v4 as uuidV4 } from 'uuid'

export const DIR_API = path.dirname(require.main.filename)
export const DIR_UPLOAD_PUBLIC = path.join(__dirname, '../../public/uploads')
export const DIR_UPLOAD_TEMP = path.join(DIR_API, 'temp')
export const fsPromises = fs.promises

export function fileStoreEngine () {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR_UPLOAD_TEMP)
    },
    filename: async (req, file, cb) => {
      const key = uuidV4()
      const nameFile = `${file.fieldname}_${Date.now()}_${key}${path.extname(file.originalname)}`
      cb(null, nameFile)
    }
  })
}

export const uploadTempImage = multer({
  storage: fileStoreEngine(),
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: (req, file, cb) => {
    const regex = /jpg|jpeg|png/
    if (isSupportedFile(regex, file)) {
      cb(null, true)
    } else {
      cb(new Error('No es un formato de imagen válida'))
    }
  }
})

/**
 * Función para validar la si un archivo es compatible de acuerdo al regex que se mande
 * @param {RegExp} regex
 * @param {*} file
 * @returns {Boolean}
 */
export function isSupportedFile (regex, file) {
  const { mimetype } = file

  return regex.test(mimetype)
}

/**
 * Función remover el archivo de la carpeta temporal
 *
 * @param {string} fileName
 *
 * @returns {Promise<void>}
 */
export async function deleteFileTemp (fileName) {
  const filePath = path.join(DIR_UPLOAD_TEMP, fileName)

  await fsPromises.unlink(filePath)
}

/**
 * Función para copiar los archivos de la carpeta temporal a una carpeta en específico
 *
 * @param {string} fileName
 * @param {string} dirName
 *
 * @returns {Promise<void>}
 */
export async function copyFile (fileName, dirName) {
  const fileSrc = path.join(DIR_UPLOAD_TEMP, fileName)
  const fileDest = path.join(DIR_UPLOAD_PUBLIC, dirName, fileName)

  await fsPromises.copyFile(fileSrc, fileDest)
  await deleteFileTemp(fileName)
}
