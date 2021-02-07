import PiuLike from '../../models/PiuLike';

import CreatePiuLikeDTO from '../../dtos/CreatePiuLikeDTO'

interface IPiuLikesRepository {
    create(data: CreatePiuLikeDTO): Promise<PiuLike>;
    save(data: PiuLike): Promise<PiuLike>;
    delete(piu_id: string): Promise<void>;
    findByUserAndPiuIds(user_id: string, piu_id: string): Promise<PiuLike | undefined>;
}

export default IPiuLikesRepository;
