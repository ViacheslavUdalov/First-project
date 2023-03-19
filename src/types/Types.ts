export type Posts = {
    id: number,
    message: string,
    likesCount: number
}
export type Contacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: Contacts
    photos: PhotosType
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
    // followed: boolean
}