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
  imagemPadrao: 'https://static.wikia.nocookie.net/naruto/images/4/43/Mangekyō_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr',
  foto: '',
  trabalho: false,
  nota: ''
};

export const DEFAULT_IMAGE = 'https://static.wikia.nocookie.net/naruto/images/4/43/Mangekyō_Sharingan_Shisui.svg/revision/latest?cb=20140503184904&path-prefix=fr';
