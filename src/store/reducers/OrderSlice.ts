import {IOrder} from "../../models/IOrder";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface OrderState {
    orders: IOrder[];
    isLoading: boolean;
    error: string;
}

const initialState: OrderState = {
    orders: [
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'created',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        },
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'created',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        },
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'created',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        },
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'created',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        },
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'closed',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        },
        {
            user: 'Геннадий',
            phoneNumber: '375 25 555 55 55',
            status: 'rejected',
            data: '2022-02-24',
            address: 'Парковая 1',
            amount: 25,
            price: 200,
            deliveryPrice: 100,
            totalPrice: 300,
            comment: 'быстрее',
        }
    ],
    isLoading: false,
    error: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        ordersFetching(state) {
            state.isLoading = true;
        },
        ordersFetchingSuccess(state) {
            state.isLoading = false;
            state.error = ''
            state.orders = [...state.orders];
        },
        ordersFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        ordersChangeStatusToRejected(state, action:PayloadAction<number>){
            state.orders[action.payload].status = 'rejected';
        },
        ordersChangeStatusToComplete(state, action:PayloadAction<number>){
            state.orders[action.payload].status = 'closed';
        },
    }
})

export default orderSlice.reducer;