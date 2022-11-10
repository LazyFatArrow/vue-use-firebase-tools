<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { useFileUpload } from '../lib'
  import { app } from './services/firebase/firebase.service'

  const fileUpload = useFileUpload({
    firebaseApp: app,
    storageUrl: 'gs://playing-around-9c543.appspot.com',
    path: 'image.jpg',
  })

  const fileInput = ref(null) as Ref<null | HTMLInputElement>

  const handleClick = () => {
    if (fileInput.value?.files?.length > 0) {
      fileUpload.upload(fileInput.value!.files![0])
    }
  }
</script>

<template>
  <input type="file" ref="fileInput" />
  <button @click="handleClick">Upload!</button>

  <ul>
    <li>progress: {{ fileUpload.progress }}</li>
    <li>progressInPercentage: {{ fileUpload.progressInPercentage }}</li>
    <li>downloadUrl: {{ fileUpload.downloadUrl }}</li>
  </ul>
</template>
