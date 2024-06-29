import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3, {
    message: 'Title is too short. Minimum length is $constraint1 characters.',
  })
  @MaxLength(30, {
    message: 'Title is too long. Maximum length is $constraint1 characters.',
  })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(5, {
    message:
      'Description is too short. Minimum length is $constraint1 characters.',
  })
  @MaxLength(200, {
    message:
      'Description is too long. Maximum length is $constraint1 characters.',
  })
  @IsNotEmpty()
  description: string;
}
