import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignupDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository) {}

    async findByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        
        if(!user) {
            throw new NotFoundException('존재하지 않는 이메일입니다.');
        }

        return this.userRepository.findByEmail(email);
    }

    async create(signupDto: SignupDto) {
        const { email, name, password } = signupDto;

        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser) {
            throw new ConflictException('이미 사용 중인 이메일입니다.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        return this.userRepository.create({
            email: email,
            name: name,
            password: hashedPassword,
        });
    }
}
