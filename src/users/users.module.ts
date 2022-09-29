import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [RolesModule],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders],
    exports: [UsersModule, UsersService],
})
export class UsersModule {}
