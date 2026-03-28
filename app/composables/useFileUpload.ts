export function useFileUpload() {
  const file = ref<File | null>(null)
  const isUploading = ref(false)
  const error = ref('')

  function setFile(f: File) {
    file.value = f
    error.value = ''
  }

  function clearFile() {
    file.value = null
    error.value = ''
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return {
    file,
    isUploading,
    error,
    setFile,
    clearFile,
    formatSize,
  }
}
