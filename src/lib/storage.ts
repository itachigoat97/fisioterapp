import { createServerClient } from './supabase/server'

const BUCKET_NAME = 'cms-images'

// Upload immagine e restituisce URL pubblico
export async function uploadImage(
  file: File,
  folder: string = 'general'
): Promise<string | null> {
  try {
    const supabase = createServerClient()

    // Genera nome file unico
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${folder}/${timestamp}.${extension}`

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    // Ottieni URL pubblico
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Error in uploadImage:', error)
    return null
  }
}

// Elimina immagine
export async function deleteImage(url: string): Promise<boolean> {
  try {
    const supabase = createServerClient()

    // Estrai il path dal URL
    const urlParts = url.split(`${BUCKET_NAME}/`)
    if (urlParts.length < 2) return false

    const path = urlParts[1]

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Error deleting image:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteImage:', error)
    return false
  }
}

// Lista immagini in una cartella
export async function listImages(folder: string = ''): Promise<string[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('Error listing images:', error)
      return []
    }

    return data
      .filter((file) => !file.id.includes('.emptyFolderPlaceholder'))
      .map((file) => {
        const path = folder ? `${folder}/${file.name}` : file.name
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(path)
        return urlData.publicUrl
      })
  } catch (error) {
    console.error('Error in listImages:', error)
    return []
  }
}
