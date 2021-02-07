// DTO: Data Transfer Object: quando eu preciso me comunicar entre um serviço e um repositório, eu uso um DTO

interface CreatePiuDTO {
    content: string;
    user_id: string;
}

export default CreatePiuDTO;
