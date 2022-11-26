import { Injectable } from '@nestjs/common';
import { SortDirection } from '../../constants';
import { AuctionPaginationModel } from '../models/auction-pagination.model';
import { AuctionModel } from '../models/auction.model';
import { AuctionsRepository } from '../repositories/auctions.repository';

@Injectable()
export class AuctionsService {
    constructor(private readonly auctionsRepository: AuctionsRepository) {}
    async findAll(page: number, size: number, order: SortDirection) {
        const result = await this.auctionsRepository.findAll(page, size, order);
        return new AuctionPaginationModel(
            page,
            size,
            result.count,
            result.rows.map((auction) => AuctionModel.fromEntity(auction))
        );
    }
    async create(robotId: string, startAmount: number) {
        return await this.auctionsRepository.create(robotId, startAmount);
    }

    async getById(id: string) {
        const auction = await this.auctionsRepository.findOne(id);

        if (auction) return auction.get();

        return null;
    }

    async existsById(id: string) {
        return await this.auctionsRepository.existsById(id);
    }

    async existByRobotId(robotId: string) {
        return await this.auctionsRepository.existsByRobotId(robotId);
    }
}