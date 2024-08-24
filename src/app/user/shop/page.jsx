'use client'
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Modal, ModalContent, 
    ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, 
    Tabs,
    Tab,
    Slider
} from "@nextui-org/react";
// rentabilidade do dia
// rentabilidade acumulada
// saldo disponivel
import useApi from "@/hooks/useApi";

import endpoints from "@/service/endpoints";
import HeadsUser from "@/components/HeadUser/HeadUser";
import toast from "react-hot-toast";
import { formatCurrency, ONE_DAY } from "@/utils";
import WithdrawModal from "./WithdrawModal";

export default function Shop() {
    const api = useApi();
    const { handleSubmit, register, reset, formState: {errors} } = useForm();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [productSelected, setSelectedProduct] = useState(null);
    const [orderSelected, setOrderSelected] = useState(null);
    const [loadingWithdraw, setLoadingWithdraw] = useState(false);

    async function getMyOrders() {
        const response = await api.get(endpoints.orders.GET);
        if (!response.success) {
            console.log("error balance");
        }
        const { data } = response;
        data.sort((a, b) => a.createdAt - b.createdAt);
        setOrders(data);
    }

    useEffect(() => {
        async function fetchData() {         
            const response = await api.get(endpoints.products.ALL);
            if (!response.success) {
                console.log("error balance");
            }
            const { data } = response;
            data.sort((a, b) => a.profits - b.profits);
            setProducts(data);
        }
        fetchData();
        getMyOrders();
    }, []);

    function calcProfits(product, order) {
        const d = new Date().getTime();
        const days = Math.ceil(200/Number(product?.profits));
        
        const redeemTime = order.createdAt + (days * ONE_DAY);
        const elapsedDays = Math.floor((d - order.createdAt) / ONE_DAY);
        const profits = Math.floor(((order.amount / 100) * product?.profits * elapsedDays) / 100);
        return {
            canRedeem: d > redeemTime && order.active,
            profits: d > redeemTime ? order?.amount / 100 * 2 : profits.toFixed(2),
            percent: profits * 100 / (order.amount * 2 /100)
        }
    }

    const withdraw = async (order_) => {
        setLoadingWithdraw(true);
        const response = await api.post(endpoints.orders.WITHDRAW, { orderId: order_.orderId });
        setLoadingWithdraw(false);
        if (response.success) {
            setOrderSelected(null);
            toast.success(`Você resgatou R$${order_?.amount / 100 * 2} de ${order_?.symbol}`, { duration: 5000 });
            getMyOrders();
        } else {
            toast.error(response?.data?.error || "Erro ao resgatar. Tente novamente mais tarde.");
        }
    }

    const handleSubmitOrder = () => {
        withdraw(orderSelected);
    }

    const buyAction = async (data) => {
        if (loading) return;
        setLoading(true);
        const response = await api.post(endpoints.products.BUY, { productId: productSelected.id, amount: (data.amount * 100) });
        setLoading(false);
        if (!response.success) return toast.error(response.data.error);
        getMyOrders();
        toast.success(`Você comprou R$${data.amount} de ${productSelected?.symbol}`, { duration: 10000 });
        onOpenChange()
    }

    return(<>
        <HeadsUser />
        <Tabs>
            <Tab key="products" title="Produtos">
            <div className="flex flex-col gap-5">
                {products.map((product) => (
                    <Card key={product?.id} className="w-full">
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Avatar isBordered radius="full" size="md" name={product?.symbol} />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{product?.title}</h4>
                                <h5 className="text-small tracking-tight text-default-400">{product?.symbol}</h5>
                                </div>
                            </div>
                            <Button
                                color="primary"
                                radius="full"
                                size="sm"
                                variant="solid"
                                onPress={() => {
                                    setSelectedProduct(product);
                                    onOpen();
                                }}
                            >
                                Comprar
                            </Button>
                        </CardHeader>
                        <CardBody className="px-3 py-2">
                            <div className="flex items-center justify-between w-full text-xs mb-2">
                                <span>Minimo: {(product.min / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                <span>{product.max === -1 ? 'Sem limites' : `Maxímo: ${(product.max / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` }</span>
                            </div>
                        </CardBody>
                        <CardFooter className="gap-3">
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">{product?.profits}%</p>
                                <p className=" text-default-400 text-small">{" "}ao dia</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Tab>
            <Tab key="myProducts" title="Meus Investimentos" isDisabled={!orders.length}>
                <div className="flex flex-col gap-5">
                {orders.map((order, index) => {
                    const product = products.find((p) => p.id === order.productId);
                    const { canRedeem, profits, percent} = calcProfits(product, order);
                    return(
                        <Card key={index} className="w-full">
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <Avatar isBordered radius="full" size="md" name={product?.symbol} />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{product?.title}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">{product?.symbol}</h5>
                                    </div>
                                </div>
                                {(canRedeem || !order.active) && (
                                    <Button
                                        color="primary"
                                        radius="full"
                                        size="sm"
                                        disabled={!order.active}
                                        variant={order.active ? "solid" : "flat"}
                                        onPress={() => {
                                            setOrderSelected({
                                                ...product,
                                                ...order,
                                            });
                                        }}
                                    >
                                        {order.active ? "Resgatar" : "Finalizado"}
                                    </Button>
                                )}
                                
                            </CardHeader>
                            <CardBody className="px-3 py-2">
                                <div className="flex items-center justify-between w-full text-xs mb-2">
                                    <Slider 
                                        hideThumb={true}
                                        value={percent}
                                        className="max-w-md"
                                        isDisabled
                                        color={percent < 100 ? 'warning' : 'success'}
                                    />
                                    {/* <span>Minimo: {(product.min / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    <span>{product.max === -1 ? 'Sem limites' : `Maxímo: ${(product.max / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` }</span> */}
                                </div>
                            </CardBody>
                            <CardFooter className="gap-3">
                                <div className="w-full">
                                    <div className="flex">
                                        <p className="text-default-400 text-small">Comprado em: {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex">
                                            <p className="font-semibold text-default-400 text-small">{product?.profits}%</p>
                                            <p className=" text-default-400 text-small">{" "} ao dia</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-default-400 text-small">Investimento: {formatCurrency(order.amount / 100)}</p>
                                            <p className="font-semibold text-default-400 text-small leading-none text-right">Lucro: {formatCurrency(profits)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                    })}
                </div>
            </Tab>
        </Tabs>
        <WithdrawModal 
            handleSubmit={handleSubmitOrder} 
            handleClose={() => setOrderSelected(null)} 
            loading={loadingWithdraw} 
            orderSelected={orderSelected} 
        />

        <footer className='mt-auto bg-[#00000077] backdrop-blur-md py-10 text-[10px] uppercase tracking-wider flex items-center justify-center w-full'>
            <p className='opacity-50'>© Copyright Global X | 2024</p>
        </footer>

        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>{(onClose) => (
                <form onSubmit={handleSubmit(buyAction)}>
                    <ModalHeader className="flex flex-col gap-1">Comprar: {productSelected.title}</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Escolha um valor"
                            {...register('amount', { required: 'Valor é obrigatório' })} 
                            isClearable
                            type="number"
                            min={(productSelected.min / 100)}
                            max={(productSelected.max / 100)}
                            classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "shadow-xl",
                                "bg-default-200/50",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focus=true]:bg-default-200/50",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                            ],
                            }}
                            placeholder="0.00"
                            startContent={ <span>R$</span> }
                        />
                        <div className="w-full flex items-center justify-between">
                            <span>Minimo: {(productSelected.min / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            <span>{productSelected.max === -1 ? 'Sem limites' : `Maxímo: ${(productSelected.max / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` }</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>Cancelar</Button>
                        <Button isLoading={loading} color="primary" type="submit">Enviar</Button>
                    </ModalFooter>
                </form>
            )}
            </ModalContent>
        </Modal>
    </>)
}