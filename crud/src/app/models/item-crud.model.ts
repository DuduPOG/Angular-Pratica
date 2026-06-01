export interface ItemCrud {
  nome: string;
  descricao: string;
  imagemPadrao: string;
  foto: string;
  trabalho: boolean;
  nota: string;
}

export const DEFAULT_ITEM_CRUD: ItemCrud = {
  nome: '',
  descricao: '',
  imagemPadrao: 'https://static.wikia.nocookie.net/naruto/images/c/cf/S%C3%ADmbolo_MS_Shisui.svg/revision/latest?cb=20121117225358&path-prefix=pt-br',
  foto: '',
  trabalho: false,
  nota: ''
};

export const DEFAULT_IMAGE = 'https://static.wikia.nocookie.net/naruto/images/c/cf/S%C3%ADmbolo_MS_Shisui.svg/revision/latest?cb=20121117225358&path-prefix=pt-br';
