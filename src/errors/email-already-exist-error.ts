export class EmailAlreadyExistError extends Error {
  constructor() {
    super('Já existe um usuário com este e-mail')
  }
}
