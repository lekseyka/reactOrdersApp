import React from 'react';
import {Box, Button, Container, Flex, Heading, Input, InputGroup,
    InputRightAddon, Spacer, Text, Textarea} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react'
import CustomTable from "../table/CustomTable";

const CreateOrder = () => {
    const emailField: any = React.useRef('');

    const copyToClipboard = (e: any) => {
        e.preventDefault();
        navigator.clipboard.writeText(emailField.current.value);
    };

    return (
        <Container maxW="container.2xl">
            <Heading as="h2" size='lg'>Создание заказа</Heading>
            <FormControl>
                <Flex mt="20px">
                    <Box w="400px" paddingRight="40px" borderRight="1px solid #CBD5E0">
                        <Box>
                            <Text variant="form-text">Данные заказа</Text>

                            <FormLabel variant="form-input">Постоянный клиент</FormLabel>
                            <Input ref={emailField} type='text' />

                            <FormLabel variant="form-input">Номер телефона</FormLabel>
                            <Input placeholder="Введите номер" type='number' />

                            <FormLabel variant="form-input">Комментарий</FormLabel>
                            <Textarea maxHeight="200px" placeholder='Введите комментарий'/>
                        </Box>
                        <Box mt="40px">
                            <Text variant="form-text">Данные заказа</Text>

                            <FormLabel variant="form-input">Адрес</FormLabel>
                            <Input type='text' />

                            <FormLabel variant="form-input">Стоимость</FormLabel>
                            <InputGroup size='sm'>
                                <Input type="number" placeholder='Введите сумму' />
                                <InputRightAddon>
                                    RUB
                                </InputRightAddon>
                            </InputGroup>

                            <FormLabel variant="form-input">Дата</FormLabel>
                            <Input type="date" />
                            <Flex mt="10px" gap="10px">
                                <Button colorScheme='linkedin' variant='outline'>Сегодня</Button>
                                <Button colorScheme='linkedin' variant='outline'>Завтра</Button>
                                <Button colorScheme='linkedin' variant='outline'>Послезавтра</Button>
                            </Flex>

                        </Box>
                    </Box>
                    <Box paddingLeft="40px" flex="1">
                        <Text color="#595B83" fontWeight="500" fontSize="lg">Товары к заказу</Text>

                        <CustomTable data={[]} type="createOrderTable" />

                        <Box width="350px">
                            <Flex>
                                <Text color='#484A6A' fontWeight="600" textTransform="uppercase">Сумма</Text>
                                <Spacer />
                                <Text color='#484A6A' fontWeight="600">1600</Text>
                            </Flex>
                            <Flex>
                                <Text color='#484A6A' fontWeight="600" textTransform="uppercase">Сумма с доставкой</Text>
                                <Spacer />
                                <Text color='#484A6A' fontWeight="600">1600</Text>
                            </Flex>
                        </Box>
                        <Flex mt="20px" justifyContent="flex-end">
                            <Link to={'/'}>
                                <Button variant='ghost'>
                                    <Text fontSize="sm">Отменить</Text>
                                </Button>
                            </Link>
                            <Button colorScheme='facebook' variant='solid' ml="10px">
                                <Text fontSize="sm">Создать</Text>
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </FormControl>
        </Container>
    );
};

export default CreateOrder;