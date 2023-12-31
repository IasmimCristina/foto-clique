import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void,
  mediaUrl: string,
}


const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })


  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 cursor-pointer rounded-xl'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="Imagem" className='file_uploader-img' />
          </div>
            <p className='file_uploader-label'>Clique ou arraste uma foto para substituir</p>
          
          </>

        ) : (
          <div className="file_uploader-box">
            <img src="/assets/icons/file-upload.svg"
              width={96} height={77} alt="Carregar arquivo" />
            <h3 className='base-medium text-light-2 mb-2 mt-6'>Arraste a foto para cá</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

            <Button className='shad-button_secondary'>Escolher do dispositivo</Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader