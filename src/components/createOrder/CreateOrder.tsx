import React, {ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react';
import {
    Box, Button, Container, Flex, Heading, Input, InputGroup,
    InputRightAddon, Select, Spacer, Table, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {FormControl, FormLabel} from '@chakra-ui/react'
import {createNewOrder} from "../../store/reducers/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";
import {IOrder} from "../../models/IOrder";
import {clients} from "../../store/reducers/OrderSlice";
import {CopyIcon} from "@chakra-ui/icons";
import InputMask from 'react-input-mask';
import axios from "axios";

const CreateOrder = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    type ListClickHandler = (e: MouseEvent<HTMLDivElement>, selectedAddress: string) => void;
    type FormSubmit = (e: FormEvent<HTMLFormElement>) => void;
    type SelectHandler = (e: ChangeEvent<HTMLSelectElement>) => void;
    type SelectDayHandler = (e: MouseEvent<HTMLButtonElement>, deliveryDate: string) => void;
    type CleanSkuType = (e: ChangeEvent<HTMLInputElement>, skuCode: string) => void;

    const [username, setUsername] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [amount, setAmount] = useState<string>('1');
    const [sku, setSku] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [inputActive, setInputActive] = useState<boolean>(false);
    const [deliveryPrice, setDeliveryPrice] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                    { query: address },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token YOUR_TOKEN'
                        }
                    }
                ).then(response => {
                    if(response.data.suggestions.length > 0) {
                        setSuggestions(response.data.suggestions);
                    }
                });
            } catch (error) {
                console.error('Ошибка при получении подсказок:', error);
            }
        }

        if (address !== '') {
            fetchData();
        } else {
            setSuggestions([]);
        }
    }, [address])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
    };

    const chooseAddress : ListClickHandler = (e, selectedAddress)  => {
        e.preventDefault();
        setAddress(selectedAddress)
        setInputActive(false);
    }

    const selectUser : SelectHandler = (e)  => {
        e.preventDefault();
        const selectedUser = clients[+e.target.value]

        setUsername(selectedUser.name);
        setPhoneNumber(selectedUser.phone);
        setAddress(selectedUser.address);
    }

    const cleanSku : CleanSkuType = (e, skuCode)  => {
        e.preventDefault();

        const cleanedSku = skuCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

        setSku(cleanedSku);
    }

    const selectDate : SelectDayHandler = (e, deliveryDate)  => {
        e.preventDefault();

        const selectedDate = new Date();

        const setNewDate = (selectedDate: Date) => {
            setDate(selectedDate.toISOString().split('T')[0]);
        }

        switch (deliveryDate) {
            case 'today':
                setNewDate(selectedDate);
                break;
            case 'tomorrow':
                selectedDate.setDate(selectedDate.getDate() + 1);
                setNewDate(selectedDate);
                break;
            case 'afterTomorrow':
                selectedDate.setDate(selectedDate.getDate() + 2);
                setNewDate(selectedDate);
                break;
        }
    }

    const handleSubmit: FormSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const item: IOrder = {
            status: 'created',
            user: username,
            phoneNumber: phoneNumber,
            address: address,
            comment: comment,
            price: +price * +amount,
            amount: +amount,
            deliveryPrice: +deliveryPrice,
            totalPrice: 0,
            date: date.split('-').reverse().join('.'),
            productName: productName,
            sku: sku,
        };

        item.totalPrice = item.price  + item.deliveryPrice;

        dispatch(createNewOrder(item));
        navigate('/');
    };

    return (
        <Container onClick={e => setInputActive(false)} maxW="container.2xl">
            <Heading as="h2" size='lg'>Создание заказа</Heading>
            <form onSubmit={e => handleSubmit(e)}>
                <Flex mt="20px">
                    <Box w="400px" paddingRight="40px" borderRight="1px solid #CBD5E0">
                        <Box>
                            <Text variant="form-text">Данные заказа</Text>

                            <FormLabel variant="form-input">Постоянный клиент</FormLabel>
                            <Select onChange={selectUser} placeholder='Выберите клиента'>
                                {clients.map((e, index) => {
                                    return <option key={index} value={index}>{e.name}</option>
                                })}
                            </Select>

                            <FormLabel variant="form-input">Клиент</FormLabel>
                            <Input value={username} onChange={e => {setUsername(e.target.value || '')}} placeholder="Введите Имя" type='text' />

                            <FormControl isRequired>
                                <FormLabel variant="form-input">Номер телефона</FormLabel>
                                <Input as={InputMask} mask="+7 (999) 999-99-99" value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value || '')}} placeholder="Введите номер" type='text' />
                            </FormControl>

                            <FormLabel variant="form-input">Комментарий</FormLabel>
                            <Textarea onChange={e => {setComment(e.target.value || '')}} maxHeight="200px" placeholder='Введите комментарий'/>
                        </Box>
                        <Box mt="40px">
                            <Text variant="form-text">Данные заказа</Text>

                            <FormControl onClick={e => e.stopPropagation()} isRequired>
                                <FormLabel variant="form-input">Адрес</FormLabel>
                                <InputGroup size='sm'>
                                    <Input value={address}
                                           onChange={e => {setAddress(e.target.value || '')}}
                                           placeholder="Введите адрес"
                                           type='text'
                                           onFocus={() => setInputActive(true)}/>
                                    <InputRightAddon cursor="pointer" onClick={copyToClipboard} background="none">
                                        <CopyIcon/>
                                    </InputRightAddon>
                                </InputGroup>
                                {inputActive && suggestions.length > 0 &&
                                    <Box border="1px solid gray" position="absolute" top="65px" zIndex='1' w='100%' height='250px' overflowY="scroll">
                                        {suggestions.map((item, index) => {
                                            return <Box padding='5px' bg='white' _hover={{ background: '#f5eeff' }} onClick={e => {chooseAddress(e, item.value  || '')}} key={index}>{item.value}</Box>
                                        })}
                                    </Box>
                                }
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel variant="form-input">Стоимость доставки</FormLabel>
                                <InputGroup size='sm'>
                                    <Input onChange={e => {setDeliveryPrice(e.target.value || '')}} type="number" placeholder='Введите сумму доставки' />
                                    <InputRightAddon>
                                        RUB
                                    </InputRightAddon>
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel variant="form-input">Дата</FormLabel>
                                <Input value={date} onChange={e => {setDate(e.target.value)}} type="date" />
                                <Flex mt="10px" gap="10px">
                                    <Button onClick={e => selectDate(e, 'today')} colorScheme='linkedin' variant='outline'>Сегодня</Button>
                                    <Button onClick={e => selectDate(e, 'tomorrow')} colorScheme='linkedin' variant='outline'>Завтра</Button>
                                    <Button onClick={e => selectDate(e, 'afterTomorrow')} colorScheme='linkedin' variant='outline'>Послезавтра</Button>
                                </Flex>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box paddingLeft="40px" flex="1">
                        <Text color="#595B83" fontWeight="500" fontSize="lg">Товары к заказу</Text>

                        <TableContainer mt="20px">
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>№</Th>
                                        <Th>Название</Th>
                                        <Th>Артикул</Th>
                                        <Th>Стоимость</Th>
                                        <Th>Количество</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>1</Td>
                                        <Td >
                                            <FormControl isRequired>
                                                <Input value={productName} onChange={(e) => {setProductName(e.target.value || '')}} type="text" />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <FormControl isRequired>
                                                <Input value={sku} onChange={(e) => {cleanSku(e, e.target.value || '')}} type="text" />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <FormControl isRequired>
                                                <Input onChange={e => {setPrice(e.target.value || '')}} type="number" />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <FormControl isRequired>
                                                <Input value={amount} onChange={(e) => {setAmount(e.target.value || '')}} type="text" />
                                            </FormControl>
                                        </Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th color="#9598B1" colSpan={6} textAlign="center">Заполните данные по товару</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>

                        <Box width="350px">
                            <Flex>
                                <Text color='#484A6A' fontWeight="600" textTransform="uppercase">Сумма</Text>
                                <Spacer />
                                <Text color='#484A6A' fontWeight="600">{+price * +amount}</Text>
                            </Flex>
                            <Flex>
                                <Text color='#484A6A' fontWeight="600" textTransform="uppercase">Сумма с доставкой</Text>
                                <Spacer />
                                <Text color='#484A6A' fontWeight="600">{+price * +amount + +deliveryPrice}</Text>
                            </Flex>
                        </Box>
                        <Flex mt="20px" justifyContent="flex-end">
                            <Link to={'/'}>
                                <Button variant='ghost'>
                                    <Text fontSize="sm">Отменить</Text>
                                </Button>
                            </Link>
                            <Button type="submit" colorScheme='facebook' variant='solid' ml="10px">
                                <Text fontSize="sm">Создать</Text>
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </form>
        </Container>
    );
};

export default CreateOrder;