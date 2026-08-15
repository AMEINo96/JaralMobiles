import { groq } from 'next-sanity'

export const getAllProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    images,
    "category": category->title,
    inStock,
    description
  }
`

export const getFeaturedProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    slug,
    price,
    images,
    "category": category->title,
    inStock,
    description
  }
`

export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    images,
    "category": category->title,
    inStock,
    description
  }
`

export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const getStoreSettingsQuery = groq`
  *[_type == "storeSettings"][0] {
    siteLogo,
    siteTitle,
    siteDescription,
    whatsappNumber,
    easypaisaDetails,
    jazzcashDetails,
    bankDetails,
    address,
    workingHours,
    emailAddress,
    instagramLink,
    facebookLink,
    googleMapsLink,
    orderEmailIntro,
    repairEmailIntro,
    announcementActive,
    announcementType,
    announcementText,
    announcementLink
  }
`

export const getHeroBannerQuery = groq`
  *[_type == "heroBanner"][0] {
    title,
    slides[] {
      image,
      altText,
      link
    }
  }
`

export const getRepairSettingsQuery = groq`
  *[_type == "repairSettings"][0] {
    repairBrands,
    repairIssues
  }
`
