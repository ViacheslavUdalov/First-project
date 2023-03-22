    import {PhotosType, ProfileType} from "../types/Types";
import {APIResponse, instance} from "./api";

type savePhotoReadyType = {
        photos: PhotosType
}

export const ProfileAPI = {
    profileRequest(userId: number) {
        return instance.get<ProfileType>('profile/' + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponse>('profile/status', {status: status})
            .then(res => res.data);
    },
    savePhotoReady(photos: File) {
        const formData = new FormData();
        formData.append('image', photos);
        return instance.put<APIResponse<savePhotoReadyType>>('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => res.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<APIResponse>('profile', profile).then(res => res.data)
    }
}