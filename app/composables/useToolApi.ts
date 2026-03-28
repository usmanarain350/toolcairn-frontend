interface ApiSuccessResponse<T> {
  error: false
  message: string
  data: T
}

export function useToolApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  async function api<T>(url: string, options: Parameters<typeof $fetch>[1] = {}): Promise<T> {
    const response = await $fetch<ApiSuccessResponse<T>>(url, options)
    return response.data
  }

  // PDF Compress
  async function uploadPdf(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api<{
      file_id: string
      original_name: string
      original_size: number
    }>(`${apiBase}/pdf/upload`, { method: 'POST', body: formData })
  }

  async function compressPdf(fileId: string, level: 'low' | 'medium' | 'high') {
    return api<{
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

    return api<{
      file_id: string
      original_name: string
      original_size: number
      format: string
    }>(`${apiBase}/image/upload`, { method: 'POST', body: formData })
  }

  async function compressImage(fileId: string, quality: number) {
    return api<{
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

    return api<{
      merge_id: string
      file_count: number
      total_input_size: number
      merged_size: number
      download_url: string
    }>(`${apiBase}/pdf/merge`, { method: 'POST', body: formData })
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

    return api<{
      convert_id: string
      page_count: number
      type: 'single' | 'zip'
      size: number
      download_url: string
    }>(`${apiBase}/pdf/to-image`, { method: 'POST', body: formData })
  }

  function getConvertDownloadUrl(convertId: string): string {
    return `${apiBase}/pdf/to-image/download/${convertId}`
  }

  // PDF Split
  async function uploadPdfForSplit(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api<{
      file_id: string
      original_name: string
      original_size: number
      page_count: number
    }>(`${apiBase}/pdf/split/upload`, { method: 'POST', body: formData })
  }

  async function splitPdf(fileId: string, mode: 'all' | 'range', fromPage?: number, toPage?: number) {
    return api<{
      split_id: string
      page_count: number
      type: 'zip' | 'pdf'
      size: number
      download_url: string
    }>(`${apiBase}/pdf/split`, {
      method: 'POST',
      body: { file_id: fileId, mode, from_page: fromPage, to_page: toPage },
    })
  }

  function getSplitDownloadUrl(splitId: string): string {
    return `${apiBase}/pdf/split/download/${splitId}`
  }

  // Image to PDF
  async function convertImagesToPdf(files: File[]) {
    const formData = new FormData()
    files.forEach(file => formData.append('files[]', file))

    return api<{
      convert_id: string
      image_count: number
      total_input_size: number
      pdf_size: number
      download_url: string
    }>(`${apiBase}/image/to-pdf`, { method: 'POST', body: formData })
  }

  function getImageToPdfDownloadUrl(convertId: string): string {
    return `${apiBase}/image/to-pdf/download/${convertId}`
  }

  // PDF Protect
  async function protectPdf(file: File, password: string) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('password', password)

    return api<{
      protect_id: string
      original_size: number
      protected_size: number
      download_url: string
    }>(`${apiBase}/pdf/protect`, { method: 'POST', body: formData })
  }

  function getProtectDownloadUrl(protectId: string): string {
    return `${apiBase}/pdf/protect/download/${protectId}`
  }

  // Word to PDF
  async function convertWordToPdf(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api<{
      convert_id: string
      original_name: string
      original_size: number
      pdf_size: number
      download_url: string
    }>(`${apiBase}/word/to-pdf`, { method: 'POST', body: formData })
  }

  function getWordToPdfDownloadUrl(convertId: string): string {
    return `${apiBase}/word/to-pdf/download/${convertId}`
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
    uploadPdfForSplit,
    splitPdf,
    getSplitDownloadUrl,
    protectPdf,
    getProtectDownloadUrl,
    convertImagesToPdf,
    getImageToPdfDownloadUrl,
    convertWordToPdf,
    getWordToPdfDownloadUrl,
  }
}
