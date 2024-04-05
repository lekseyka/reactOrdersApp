import {AppDispatch} from "../store";
import {orderSlice} from "./OrderSlice";
import {IOrder} from "../../models/IOrder";

export const fetchOrders = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(orderSlice.actions.ordersFetching())
        dispatch(orderSlice.actions.ordersFetchingSuccess())
    } catch (e: any) {
        dispatch(orderSlice.actions.ordersFetchingError(e.message))
    }
}

export const changeOrderStatusToRejected = (orderId: number) => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.ordersChangeStatusToRejected(orderId))
    fetchOrders();
}

export const changeOrderStatusToComplete = (orderId: number) => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.ordersChangeStatusToComplete(orderId))
    fetchOrders();
}

export const createNewOrder = (data: IOrder) => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.ordersAddOrder(data))
    fetchOrders();
}