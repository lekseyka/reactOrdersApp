import React, {useEffect} from 'react';
import { Button, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import {Link} from "react-router-dom";
import CustomTable from "../table/CustomTable";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchOrders} from "../../store/reducers/ActionCreators";

const Orders = () => {

    const dispatch = useAppDispatch();
    const {orders} = useAppSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    return (
        <Container maxW="container.2xl">

            <Flex>
                <Heading as="h2" size='lg'>Заказы</Heading>
                <Spacer />
                <Link to={'/createOrder'}>
                    <Button colorScheme='facebook' variant='solid'>
                        <AddIcon boxSize={4} />
                        <Text fontSize="sm" ml="10px">Добавить заказ</Text>
                    </Button>
                </Link>
            </Flex>

            <CustomTable data={orders} type="ordersTable" />

        </Container>
    );
};

export default Orders;