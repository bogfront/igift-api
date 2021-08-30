import { SettingsDto } from './settings.dto';
import { PhotoDto } from '../../common/dto/photo.dto';

export class UserDto {
  constructor(object: any) {
    this.id = object._id;
    this.name = object.name;
    this.surname = object.surname;
    this.email = object.email;
    this.phone = object.phone;
    this.settings = new SettingsDto(object.settings);
    this.photos = {
      profilePic : new PhotoDto(object.photos.profilePic),
      gallery: []
    }
    if(object.photos && object.photos.gallery) {
      object.photos.gallery.forEach(photo => {
        this.photos.gallery.push(new PhotoDto(photo));
      });
    }
  };
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly phone: string;
  settings: SettingsDto
  photos: {
    profilePic: PhotoDto;
    gallery: PhotoDto[];
  };
}
