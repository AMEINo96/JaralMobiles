import { groq } from 'next-sanity'

export const getAllProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    images,
    "category": category->title,
    "categorySlug": category->slug.current,
    inStock,
    description
  }
`

export const getFeaturedProductsQuery = groq`
  *[_type == "product"] | order(isFeatured desc, _createdAt desc)[0...4] {
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
    description,
    hasWarranty,
    warrantyDuration,
    hasReturn,
    returnDuration
  }
`

export const getSimilarProductsQuery = groq`
  *[_type == "product" && category->title == $category && slug.current != $slug] | order(_createdAt desc)[0...4] {
    _id,
    title,
    slug,
    price,
    images,
    "category": category->title,
    inStock
  }
`

export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    iconName
  }
`

export const getStoreSettingsQuery = groq`
  *[_type == "storeSettings"][0] {
    siteLogo,
    siteTitle,
    siteDescription,
    activeTheme,
    heroBadge,
    heroTitle,
    heroSubtitle,
    taxRate,
    shippingFee,
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
  *[_type == "heroBanner"] | order(_updatedAt desc)[0] {
    title,
    layout,
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
