import { FirebaseApp } from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref as firebaseStorageRef,
  uploadBytesResumable,
  UploadTask,
} from 'firebase/storage'
import { ref, Ref, computed } from 'vue'

const useFileUpload = ({
  firebaseApp,
  storageUrl,
  path,
}: {
  firebaseApp: FirebaseApp
  storageUrl: string
  path: string
}) => {
  const storage = getStorage(firebaseApp, storageUrl)
  const storageRef = firebaseStorageRef(storage, path)

  const progress = ref(0)
  const progressInPercentage = computed(() => {
    return `${progress.value}%`
  })

  const downloadUrl = ref(null) as Ref<string | null>

  const upload = (file: File | Blob | Uint8Array): UploadTask => {
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        progress.value = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('Upload is completed')
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          downloadUrl.value = downloadURL
        })
      },
    )

    return uploadTask
  }

  return {
    upload,
    progress,
    progressInPercentage,
    downloadUrl,
  }
}

export default useFileUpload
