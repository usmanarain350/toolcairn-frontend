export function useToolApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // PDF Compress
  async function uploadPdf(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return await $fetch<{
      file_id: string
      original_name: string
      original_size: number
    }>(`${apiBase}/pdf/upload`, {
      method: 'POST',
      body: formData,
    })
  }

  async function compressPdf(fileId: string, level: 'low' | 'medium' | 'high') {
    return await $fetch<{
      compressed_file_id: string
      compressed_size: number
      original_size: number
      reduction_percent: number
      download_url: string
    }>(`${apiBase}/pdf/compress`, {
      method: 'POST',
      body: { file_id: fileId, compression_level: level },
    })
  }

  function getPdfDownloadUrl(fileId: string): string {
    return `${apiBase}/pdf/download/${fileId}`
  }

  // Image Compress
  async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return await $fetch<{
      file_id: string
      original_name: string
      original_size: number
      format: string
    }>(`${apiBase}/image/upload`, {
      method: 'POST',
      body: formData,
    })
  }

  async function compressImage(fileId: string, quality: number) {
    return await $fetch<{
      compressed_file_id: string
      compressed_size: number
      original_size: number
      reduction_percent: number
      download_url: string
    }>(`${apiBase}/image/compress`, {
      method: 'POST',
      body: { file_id: fileId, quality },
    })
  }

  function getImageDownloadUrl(fileId: string): string {
    return `${apiBase}/image/download/${fileId}`
  }

  // PDF Merge
  async function mergePdfs(files: File[]) {
    const formData = new FormData()
    files.forEach(file => formData.append('files[]', file))

    return await $fetch<{
      merge_id: string
      file_count: number
      total_input_size: number
      merged_size: number
      download_url: string
    }>(`${apiBase}/pdf/merge`, {
      method: 'POST',
      body: formData,
    })
  }

  function getMergeDownloadUrl(mergeId: string): string {
    return `${apiBase}/pdf/merge/download/${mergeId}`
  }

  // PDF to Image
  async function convertPdfToImage(file: File, format: 'jpg' | 'png' = 'jpg', dpi: number = 150) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    formData.append('dpi', dpi.toString())

    return await $fetch<{
      convert_id: string
      page_count: number
      type: 'single' | 'zip'
      size: number
      download_url: string
    }>(`${apiBase}/pdf/to-image`, {
      method: 'POST',
      body: formData,
    })
  }

  function getConvertDownloadUrl(convertId: string): string {
    return `${apiBase}/pdf/to-image/download/${convertId}`
  }

  return {
    uploadPdf,
    compressPdf,
    getPdfDownloadUrl,
    uploadImage,
    compressImage,
    getImageDownloadUrl,
    mergePdfs,
    getMergeDownloadUrl,
    convertPdfToImage,
    getConvertDownloadUrl,
  }
}
