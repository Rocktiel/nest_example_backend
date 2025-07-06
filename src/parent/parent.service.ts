import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from 'src/_common/typeorm';
import { RegisterRequestDto } from 'src/auth/dto/request/RegisterRequest.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  async createParent(data: { email: string; password: string; firstName: string; lastName: string; phoneNumber: string }) {
    const parent = this.parentRepository.create(data);
    return await this.parentRepository.save(parent);
  }
  async isPhoneAvailable(phone: string) {
    return await this.parentRepository.exists({ where: { phoneNumber: phone }, withDeleted: true });
  }
  async isEmailAvailable(email: string) {
    return await this.parentRepository.exists({ where: { email: email }, withDeleted: true });
  }
  constructor(
    @InjectRepository(Parent)
    private readonly parentRepository: Repository<Parent>,
  ) {}

  async findParentForLogin(emailOrPhone: string, isEmail: boolean) {
    let parent: Parent | null;
    if (isEmail) {
      parent = await this.parentRepository.findOneBy({ email: emailOrPhone });
    } else {
      parent = await this.parentRepository.findOneBy({
        phoneNumber: emailOrPhone,
      });
    }
    return parent;
  }
  async getAll() {
    return await this.parentRepository.find();
  }
}
