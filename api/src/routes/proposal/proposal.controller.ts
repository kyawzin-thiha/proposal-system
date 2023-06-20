import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/decorators/role.decorator';

@UseGuards(AuthGuard)
@Controller('proposal')
export class ProposalController {
    constructor(private readonly proposalService: ProposalService) { }

    @Get("get/:id")
    async getProposal(@Param('id') id: string) {
        return await this.proposalService.get(id);
    }

    @Get("get-all")
    async getAll() {
        return await this.proposalService.getAll();
    }

    @Get("get-pending")
    async getPendingProposal() {
        return await this.proposalService.getPendingProposal();
    }

    @Get("get-withdrawn")
    async getWithdrawnProposal() {
        return await this.proposalService.getWithdrawnProposal();
    }

    @Post("create")
    async createNewProposal(@Body() data: { title: string, description: string }, @Request() req: any) {
        const { user } = req.user;

        return await this.proposalService.create(user, data.title, data.description);
    }

    @Role("ADMIN")
    @Put("approve/:id")
    async approveProposal(@Param('id') id: string) {
        return await this.proposalService.approveProposal(id);
    }

    @Put("withdraw/:id")
    async withdrawProposal(@Param('id') id: string) {
        return await this.proposalService.withdrawProposal(id);
    }

    @Put("update")
    async updateProposal(@Body() data: { id: string, title: string, description: string }) {
        return await this.proposalService.updateProposal(data.id, data.title, data.description);
    }

    @Delete("delete/:id")
    async deleteProposal(@Param('id') id: string) {
        return await this.proposalService.deleteProposal(id);
    }

}
