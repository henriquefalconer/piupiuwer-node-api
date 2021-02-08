import { getRepository, Repository } from 'typeorm';
import CreatePiuDTO from '../../dtos/CreatePiuDTO';

import Piu from '../../models/Piu';

import IPiusRepository from './types';

class PiusRepository implements IPiusRepository {
    private ormRepository: Repository<Piu>;

    constructor() {
        this.ormRepository = getRepository(Piu);
    }

    public async create(data: CreatePiuDTO): Promise<Piu> {
        const piu = this.ormRepository.create(data);

        return piu;
    }

    public async save(data: Piu): Promise<Piu> {
        const piu = await this.ormRepository.save(data);

        return piu;
    }

    public async findById(id: string): Promise<Piu | undefined> {
        const piu = await this.ormRepository.findOne(id);

        return piu;
    }
}

export default PiusRepository;
