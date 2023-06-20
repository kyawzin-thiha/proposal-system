import { HttpException, Injectable } from '@nestjs/common';
import { ProposalDbService } from 'src/db/proposal.service';

@Injectable()
export class ProposalService {
    constructor(private readonly proposal: ProposalDbService) { }

    async create(author: string, title: string, description: string) {
        const [proposal, error] = await this.proposal.create(author, title, description)

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return proposal;
    }

    async get(id: string) {
        const [proposal, error] = await this.proposal.find(id);

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return proposal;
    }

    async getAll() {
        const [proposals, error] = await this.proposal.getByStatus("APPROVED");

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return proposals;
    }

    async getPendingProposal() {
        const [proposals, error] = await this.proposal.getByStatus("PENDING");

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return proposals;
    }

    async getWithdrawnProposal() {
        const [proposals, error] = await this.proposal.getByStatus("WITHDRAWN");

        if (error) {
            throw new HttpException(error.message, error.status);
        }

        return proposals;
    }

    async approveProposal(id: string) {
        const error = await this.proposal.updateStatus(id, "APPROVED");

        if (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async withdrawProposal(id: string) {
        const error = await this.proposal.updateStatus(id, "WITHDRAWN");

        if (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async updateProposal(id: string, title: string, description: string) {
        const error = await this.proposal.update(id, title, description);

        if (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteProposal(id: string) {
        const error = await this.proposal.delete(id);

        if (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
