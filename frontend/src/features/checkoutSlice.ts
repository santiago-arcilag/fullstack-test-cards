import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardInfo {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface CheckoutState {
  productId: number | null;
  customerEmail: string;
  customerName: string;
  address: string;
  card: CardInfo;
}

const initialState: CheckoutState = {
  productId: null,
  customerEmail: '',
  customerName: '',
  address: '',
  card: { number: '', expMonth: '', expYear: '', cvc: '' },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<number>) {
      state.productId = action.payload;
    },
    setCustomerInfo(
      state,
      action: PayloadAction<{ email: string; name: string; address: string }>,
    ) {
      state.customerEmail = action.payload.email;
      state.customerName = action.payload.name;
      state.address = action.payload.address;
    },
    setCardInfo(state, action: PayloadAction<CardInfo>) {
      state.card = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const { setProduct, setCustomerInfo, setCardInfo, resetCheckout } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer; 