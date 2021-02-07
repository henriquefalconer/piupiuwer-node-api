import Piu from '../../models/Piu';

import CreatePiuDTO from '../../dtos/CreatePiuDTO'

interface IPiusRepository {
    create(data: CreatePiuDTO): Promise<Piu>;
    save(data: Piu): Promise<Piu>;
    findById(id: string): Promise<Piu | undefined>;
}

export default IPiusRepository;
