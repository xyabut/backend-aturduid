import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { ResponseModel } from 'src/model/response';
import { ResponseUtils } from 'src/utils/response_utils';
import { Hashing } from 'src/infrastructures/security/crypto/hashing.crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashing: Hashing
  ) {}

  async register(createUserDto: CreateUserDto)  {
    var responseModel = new ResponseModel();

    // check duplicate user by userId
    var duplicateUserId = await this.userRepository.find({
      where: {
        userId: createUserDto.userId
      }
    });

    if (duplicateUserId.length > 0) {
      return responseModel = ResponseUtils.create(false, 200, null, "User already exist.");
    }


    // create User to save
    var newUsers = new User();
    var userUuid = randomUUID().toString();

    newUsers.userId = createUserDto.userId;
    newUsers.emailAddress = createUserDto.emailAddress;
    newUsers.roleId = createUserDto.roleId;
    newUsers.uuid = userUuid;
    newUsers.password = await this.hashing.passHash(createUserDto.password);
    newUsers.createdAt = new Date();
    
    if (createUserDto.createdBy == undefined || createUserDto.createdBy == null) {
      newUsers.createdBy = userUuid;
    } else {
      newUsers.createdBy = createUserDto.createdBy;
    }

    var resAdd = await this.userRepository.save(newUsers);
    
    if (resAdd != null) {
      responseModel = ResponseUtils.create(true, 201, null, "Success register user");
    } else {
      responseModel = ResponseUtils.create(false, 200, null, "Failed to register user");
    }

    return responseModel;
  }

  async getUserbyId(userUuid: string) {
    const dataUser = await this.userRepository.find({
      select: {
        emailAddress: true,
        userId: true,
        role: true,
      },
      where: {
        uuid: userUuid,
        isDeleted: 0
      }
    });

    if (dataUser != null ) {
      return ResponseUtils.create(true, 200, dataUser, "Success get data user");
    } else {
      return ResponseUtils.create(true, 200, null, "User doesn't exist.");
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
