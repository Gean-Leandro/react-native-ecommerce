import { create } from 'zustand';

interface Product {
    id: number,
    name: string,
    price: number,
    img: string
}

interface carrinho_props {
    products: Product[],
    addProduct: (new_product:any) => void,
    clear: () => void,
}

const carrinho = create<carrinho_props>((set) => ({
    products: [],
    addProduct: (new_product:Product) => set((state) => ({products: [...state.products, new_product]})),
    clear: () => set(() => ({products:[]}))
}));

export default carrinho;