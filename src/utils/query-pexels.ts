import { PexelsGalleryResponse } from '@/types/gallery'

const pexels_api_key = import.meta.env.VITE_PEXELS_API_KEY

const queryPexels = async ({
  query,
  per_page,
  page,
}: {
  query: string
  per_page: number
  page: number
}) => {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`
  const response = await fetch(url, {
    headers: {
      Authorization: pexels_api_key,
    },
  })
  const data: PexelsGalleryResponse = await response.json()
  return data
}

export default queryPexels
