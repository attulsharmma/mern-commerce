import { type StateCreator } from "zustand";
export interface CartState {
  add: (id:string,name:string,qty:number)=>void,
  items: {name:string,id:string, qty:number}[]
}
export const cartSlice: StateCreator<
  { cart: CartState },
  [],
  [],
  CartState
> = (set, get) => {
  return {
    items:[{
      name:"Phone",
      id:"1234",
      qty:2
    }],
    add:(id, name, qty) =>{
      const currentCart = get().cart;
      const items = [...currentCart.items];
      const updatedItems = [...items,{
        name: name,
        id:id,
        qty:qty
      }]
      set({cart:{...currentCart, items:updatedItems}})
    },
  };
};
