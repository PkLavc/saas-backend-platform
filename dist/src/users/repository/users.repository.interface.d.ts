import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export interface IUsersRepository {
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(organizationId: string, page: number, limit: number, filter?: any): Promise<any>;
    findOne(id: string, organizationId: string): Promise<any | null>;
    findByEmail(email: string): Promise<any | null>;
    update(id: string, organizationId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string, organizationId: string): Promise<any>;
}
