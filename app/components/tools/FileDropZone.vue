<template>
  <div
    class="border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer"
    :class="isDragging ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
    @click="openFilePicker"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="hidden"
      @change="onFileSelect"
    />

    <div v-if="!file">
      <div class="text-4xl mb-3">📁</div>
      <p class="text-gray-700 font-medium">{{ $t('fileDropZone.dragDrop') }}</p>
      <p class="text-sm text-gray-400 mt-1">{{ $t('fileDropZone.orBrowse') }}</p>
      <p class="text-xs text-gray-400 mt-2">{{ $t('fileDropZone.maxSize', { accept: acceptLabel, max: maxSizeMB }) }}</p>
    </div>

    <div v-else class="flex items-center justify-center gap-4">
      <div class="text-3xl">📄</div>
      <div class="text-left">
        <p class="font-medium text-gray-900">{{ file.name }}</p>
        <p class="text-sm text-gray-500">{{ formatSize(file.size) }}</p>
      </div>
      <button
        class="text-sm text-red-500 hover:text-red-700 ml-4"
        @click.stop="removeFile"
      >
        {{ $t('fileDropZone.remove') }}
      </button>
    </div>
  </div>

  <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  accept: string
  acceptLabel: string
  maxSizeMB: number
}>()

const emit = defineEmits<{
  selected: [file: File]
  removed: []
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const file = ref<File | null>(null)
const error = ref('')

function openFilePicker() {
  fileInput.value?.click()
}

function validateFile(f: File): boolean {
  error.value = ''

  const maxBytes = props.maxSizeMB * 1024 * 1024
  if (f.size > maxBytes) {
    error.value = t('fileDropZone.errorTooLarge', { max: props.maxSizeMB })
    return false
  }

  const acceptedTypes = props.accept.split(',').map(s => s.trim())
  const ext = '.' + f.name.split('.').pop()?.toLowerCase()
  if (!acceptedTypes.includes(ext) && !acceptedTypes.includes(f.type)) {
    error.value = t('fileDropZone.errorWrongType', { accept: props.acceptLabel })
    return false
  }

  return true
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const f = e.dataTransfer?.files[0]
  if (f && validateFile(f)) {
    file.value = f
    emit('selected', f)
  }
}

function onFileSelect(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f && validateFile(f)) {
    file.value = f
    emit('selected', f)
  }
}

function removeFile() {
  file.value = null
  error.value = ''
  if (fileInput.value) fileInput.value.value = ''
  emit('removed')
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>
