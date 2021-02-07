import { getRepository, Repository } from 'typeorm';
import CreatePiuLikeDTO from '../dtos/CreatePiuLikeDTO';

import PiuLike from '../models/PiuLike';

import IPiuLikesRepository from './IPiuLikesRepository';

class PiuLikesRepository implements IPiuLikesRepository {
    private ormRepository: Repository<PiuLike>;

    constructor() {
        this.ormRepository = getRepository(PiuLike);
    }

    public async create(data: CreatePiuLikeDTO): Promise<PiuLike> {
        const piuLike = this.ormRepository.create(data);

        return piuLike;
    }

    public async save(data: PiuLike): Promise<PiuLike> {
        const piuLike = await this.ormRepository.save(data);

        return piuLike;
    }

    public async delete(piu_id: string): Promise<void> {
        await this.ormRepository.delete(piu_id);
    }

    public async findByUserAndPiuIds(user_id: string, piu_id: string): Promise<PiuLike | undefined> {
        const piuLike = await this.ormRepository.findOne({
            where: { user_id, piu_id }
        });

        return piuLike;
    }

}

export default PiuLikesRepository;
