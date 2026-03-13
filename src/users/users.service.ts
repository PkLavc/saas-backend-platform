import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUsersRepository } from './repository/prisma-users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(organizationId: string, page: number = 1, limit: number = 10, filter?: any) {
    return this.usersRepository.findAll(organizationId, page, limit, filter);
  }

  async findOne(id: string, organizationId: string) {
    return this.usersRepository.findOne(id, organizationId);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: string, organizationId: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, organizationId, updateUserDto);
  }

  async remove(id: string, organizationId: string) {
    return this.usersRepository.remove(id, organizationId);
  }

  async organizationExists(organizationId: string): Promise<boolean> {
    return this.usersRepository.organizationExists(organizationId);
  }
}
