// // import { create } from "zustand";
// // import { authSlice } from "./auth-slice";
// // export const useStore = create((set, get) => ({
// //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //     // @ts-expect-error
// //  authSlice: authSlice(set, get),
// // }))

import { create } from "zustand";
import { authSlice, type AuthState } from "./auth-slice";
import { cartSlice, type CartState } from "./cart-slice";


// import { create } from "zustand";
// import { authSlice, type AuthState } from "./auth-slice";
// import { cartSlice , type CartState} from "./cart-slice";
// // import { cartSlice, CartState } from "./cart-slice";

// type StoreState = AuthState & CartState

// export const useStore = create<StoreState>((set, get) => ({
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//  // @ts-expect-error
//   ...authSlice(set, get),
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//  // @ts-expect-error
//   ...cartSlice(set, get),

// }));
// // export const useStore = create<StoreState>((set, get) => ({
// //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //  // @ts-expect-error
// //   ...authSlice(set, get),
// //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //  // @ts-expect-error
// //   ...cartSlice(set, get),
// // //   cartSlice: cartSlice(set, get),
// // }));


type StoreState = {
  auth: AuthState;
  cart: CartState;
};

export const useStore = create<StoreState>()((...a) => ({
  auth: authSlice(...a),
  cart: cartSlice(...a),
}));