import { createServerClient } from './supabase/server'
import { defaultContent, type DefaultContent } from './default-content'
import type { SiteContent, PageContent } from '@/types'

type PageKey = keyof DefaultContent

// Recupera tutti i contenuti di una pagina
export async function getPageContent<T extends PageKey>(
  page: T
): Promise<DefaultContent[T]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('site_content')
      .select('section, content_key, content_value')
      .eq('page', page)
      .order('sort_order')

    if (error) {
      // Silenzioso se la tabella non esiste (comportamento atteso prima del setup)
      if (!error.message?.includes('does not exist')) {
        console.error('Error fetching content:', error)
      }
      return defaultContent[page]
    }

    if (!data || data.length === 0) {
      return defaultContent[page]
    }

    // Merge dei contenuti dal DB con i default
    const merged = JSON.parse(JSON.stringify(defaultContent[page])) as DefaultContent[T]

    for (const item of data) {
      const section = item.section as keyof DefaultContent[T]
      if (merged[section] && typeof merged[section] === 'object') {
        const sectionObj = merged[section] as Record<string, string>
        if (item.content_key in sectionObj) {
          sectionObj[item.content_key] = item.content_value
        }
      }
    }

    return merged
  } catch (error) {
    console.error('Error in getPageContent:', error)
    return defaultContent[page]
  }
}

// Recupera un singolo contenuto
export async function getContent(
  page: string,
  section: string,
  key: string
): Promise<string | null> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('site_content')
      .select('content_value')
      .eq('page', page)
      .eq('section', section)
      .eq('content_key', key)
      .single()

    if (error || !data) {
      // Fallback al contenuto di default
      const pageContent = defaultContent[page as PageKey]
      if (pageContent) {
        const sectionContent = pageContent[section as keyof typeof pageContent]
        if (sectionContent && typeof sectionContent === 'object') {
          return (sectionContent as Record<string, string>)[key] || null
        }
      }
      return null
    }

    return data.content_value
  } catch (error) {
    console.error('Error in getContent:', error)
    return null
  }
}

// Salva un contenuto (per admin)
export async function saveContent(
  page: string,
  section: string,
  key: string,
  value: string,
  contentType: 'text' | 'json' | 'image' = 'text'
): Promise<boolean> {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from('site_content')
      .upsert(
        {
          page,
          section,
          content_key: key,
          content_value: value,
          content_type: contentType,
        },
        {
          onConflict: 'page,section,content_key',
        }
      )

    if (error) {
      console.error('Error saving content:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in saveContent:', error)
    return false
  }
}

// Salva multipli contenuti in batch (per admin)
export async function saveContentBatch(
  items: Array<{
    page: string
    section: string
    key: string
    value: string
    contentType?: 'text' | 'json' | 'image'
  }>
): Promise<boolean> {
  try {
    const supabase = createServerClient()

    const records = items.map((item) => ({
      page: item.page,
      section: item.section,
      content_key: item.key,
      content_value: item.value,
      content_type: item.contentType || 'text',
    }))

    const { error } = await supabase
      .from('site_content')
      .upsert(records, {
        onConflict: 'page,section,content_key',
      })

    if (error) {
      console.error('Error saving content batch:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in saveContentBatch:', error)
    return false
  }
}

// Recupera tutti i contenuti di una pagina come oggetto flat (per admin editor)
export async function getPageContentRaw(page: string): Promise<SiteContent[]> {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', page)
      .order('section')
      .order('sort_order')

    if (error) {
      // Silenzioso se la tabella non esiste
      if (!error.message?.includes('does not exist')) {
        console.error('Error fetching raw content:', error)
      }
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getPageContentRaw:', error)
    return []
  }
}
