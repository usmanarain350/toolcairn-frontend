export function useToolApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

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

  function getDownloadUrl(compressedFileId: string): string {
    return `${apiBase}/pdf/download/${compressedFileId}`
  }

  return {
    uploadPdf,
    compressPdf,
    getDownloadUrl,
  }
}
