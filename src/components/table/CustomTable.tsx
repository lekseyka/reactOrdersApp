import React, {MouseEvent} from 'react';
import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import OrderStatus from "../orderStatus/OrderStatus";
import {useAppDispatch} from "../../hooks/redux";
import {
    changeOrderStatusToComplete,
    changeOrderStatusToRejected
} from "../../store/reducers/ActionCreators";

interface TableType {
    [key: string]: {
        heading: Array<string>,
    }
}

const TABLE_INFO: TableType = {
    ordersTable: {
        heading: ['Клиент', 'Номер телефона', 'Статус', 'Дата доставки', 'Адрес доставки', 'Артикул', 'Кол-во',
            'Стоимость товаров (RUB)', 'Стоимость доставки (RUB)', 'Стоимость итого (RUB)', 'Коментарий', 'Действия'],
    },
}

type AppProps = {
    data: Array<any>;
};

const CustomTable = ({data} : AppProps) => {
    const dispatch = useAppDispatch();
    type ButtonClickHandler = (e: MouseEvent<HTMLButtonElement>, numericValue: number) => void;

    const changeStatusToRejected: ButtonClickHandler = (e, orderId) => {
        e.stopPropagation();
        dispatch(changeOrderStatusToRejected(orderId))
    };

    const changeStatusToComplete: ButtonClickHandler = (e, orderId) => {
        e.stopPropagation();
        dispatch(changeOrderStatusToComplete(orderId))
    };

    return (
        <TableContainer mt="20px">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>№</Th>
                        {TABLE_INFO.ordersTable.heading.map((e, index) => {
                            return <Th key={index}>{e}</Th>
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((e, index: number) => {
                            return <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{e.user}</Td>
                                <Td>{e.phoneNumber}</Td>
                                <Td>
                                    <OrderStatus type={e.status}></OrderStatus>
                                </Td>
                                <Td>{e.date}</Td>
                                <Td>{e.address}</Td>
                                <Td>{e.sku}</Td>
                                <Td>{e.amount}</Td>
                                <Td>{e.price}</Td>
                                <Td>{e.deliveryPrice}</Td>
                                <Td>{e.totalPrice}</Td>
                                <Td>{e.comment}</Td>
                                <Td>
                                    {e.status === 'created' &&
                                    <>
                                        <Button onClick={(e) => changeStatusToRejected(e, index)} variant='ghost'>
                                            Отменить
                                        </Button>
                                        <Button onClick={(e) => changeStatusToComplete(e, index)} fontSize="sm" colorScheme='facebook' variant='solid' ml="10px">
                                            Завершить
                                        </Button>
                                    </>
                                    }
                                </Td>
                            </Tr>
                        })

                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;