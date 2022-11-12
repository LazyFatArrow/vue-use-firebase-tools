import { FirebaseApp } from 'firebase/app'
import { beforeEach, describe, test, expect, vi, Mock } from 'vitest'
import useFileUpload from './useFileUpload.composable'
import { uploadBytesResumable } from 'firebase/storage'

vi.mock('firebase/storage')

const mockedUploadBytesResumable = uploadBytesResumable as Mock

const getMockedUploadTask = () => ({
  on: (eventName: string, callback: (snapshot) => void) => callback({
    bytesTransferred: 30,
    totalBytes: 50,
    state: 'running',
  }),
})

describe('useFileUpload Composable', () => {
  const firebaseApp = {} as FirebaseApp
  const storageUrl = 'storage-url'
  const path = 'path'

  beforeEach(() => {
    mockedUploadBytesResumable.mockReturnValue({
      on: vi.fn(),
    })
  })

  test('uploads file to firebase', () => {
    const fileUpload = useFileUpload({
      firebaseApp,
      storageUrl,
      path,
    })

    fileUpload.upload(new File([], 'file'))

    expect(uploadBytesResumable).toHaveBeenCalled()
  })

  test.todo('provides download url after uploading successfully')

  test('provides upload progress and progress in percentage', () => {
    mockedUploadBytesResumable.mockImplementation(() => getMockedUploadTask())

    const fileUpload = useFileUpload({
      firebaseApp,
      storageUrl,
      path,
    })

    fileUpload.upload(new File([], 'file'))

    expect(fileUpload.progress.value).toBe(60)
    expect(fileUpload.progressInPercentage.value).toBe('60%')
  })

  test.todo('something when an error happens')
})
