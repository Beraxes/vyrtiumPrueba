import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'My first task',
    description: 'The title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a description of my first task',
    description: 'The description of the task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({ example: 'Work', description: 'The category of the task' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: false, description: 'Whether the task is public' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateTaskDto {
  @ApiProperty({
    example: 'My updated task',
    description: 'The updated title of the task',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is an updated description',
    description: 'The updated description of the task',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'The updated completion status of the task',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    example: 'Personal',
    description: 'The updated category of the task',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: true,
    description: 'The updated public status of the task',
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
