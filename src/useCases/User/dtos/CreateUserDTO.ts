// DTO: Data Transfer Object: quando eu preciso me comunicar entre um serviço e um repositório, eu uso um DTO

interface CreateUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    // birthdate: string;
}

export default CreateUserDTO;
