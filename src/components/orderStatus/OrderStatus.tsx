import React from 'react';
import {Box} from "@chakra-ui/react";

interface StatusType {
    [key: string]: {
        text: string;
        color: string;
        background: string;
    };
}

const statusType: StatusType = {
    created: {
        text: 'Создан',
        color: 'purple',
        background: '#ffd9ff'
    },
    closed: {
        text: 'Завершен',
        color: 'green',
        background: '#dbffdb'
    },
    rejected: {
        text: 'Отменен',
        color: 'red',
        background: '#ffd4d4'
    }
}

type AppProps = {
    type: string;
};

const OrderStatus = ({ type } : AppProps) => {
    return (
        <Box
            border="1px solid"
            borderColor={statusType[type].color}
            borderRadius="5px"
            padding="5px 10px"
            color={statusType[type].color}
            background={statusType[type].background}
            textAlign="center"
        >
            {statusType[type].text}
        </Box>
    );
};

export default OrderStatus;