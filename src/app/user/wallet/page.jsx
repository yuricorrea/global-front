'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from "react";
import {
    Tabs, Tab, Chip, Input, Button
} from "@nextui-org/react";

import useApi from "@/hooks/useApi";
import endpoints from "@/service/endpoints";

import { FaCheck } from "react-icons/fa";
import { PiHandDeposit } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdHistoryToggleOff } from "react-icons/md";

import Tablen from "@/components/Table/Tablen";
import HeadsUser from "@/components/HeadUser/HeadUser";
import { formatCurrency, ONE_DAY } from '@/utils';
import toast from 'react-hot-toast';

export default function Shop() {
    const { handleSubmit, register, reset, formState: {errors} } = useForm();
    const [balance, setBalance] = useState("-");
    const [bonus, setBonus] = useState("-");
    const [lastBonusRedeem, setLastBonusRedeem] = useState(new Date().getTime());
    const [loadingBonus, setLoadingBonus] = useState(false);
    const api = useApi();

    async function fetchData() {         
        const response = await api.get(endpoints.gateway.BALANCE);
        if (!response.success) {
            console.log("error balance");
        }
        const { data } = response;
        setBalance((data.main / 100));
        setBonus((data.bonus / 100));
        setLastBonusRedeem(data.lastBonusRedeem);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const canRedeem = useMemo(() => {
        const now = new Date().getTime();
        return now - lastBonusRedeem > ONE_DAY;
    }, [lastBonusRedeem])

    const redeemBonus = async () => {
        setLoadingBonus(true);
        const response = await api.get(endpoints.gateway.DAILY_REWARD);
        setLoadingBonus(false);
        if (response.success) {
            toast.success("Bônus resgatado com sucesso");
            fetchData();
        } else {
            toast.error("Erro ao resgatar bônus");
        }
    }

    const transferBonus = async () => {
        setLoadingBonus(true);
        const response = await api.get(endpoints.gateway.REDEEM_BONUS);
        setLoadingBonus(false);
        if (response.success) {
            toast.success("Bônus transferido para a carteira");
            fetchData();
        } else {
            toast.error("Erro ao transferir bônus");
        }
    }
    
    const withdrawn = async (data) => {
        console.log(data)
        const response = await api.post(endpoints.gateway.WITHDRAW, { amount: data.valueWithdrawn, pixkey: data.key });
        if (!response.success) console.log("error withdrawn")

        const { res } = response;
        console.log(res);
    }

    const deposit = async (data) => {
        console.log(data)
        const response = await api.post(endpoints.gateway.DEPOSIT, { amount: data.value });
        if (!response.success) console.log("error Depositar");

        const { res } = response;
        console.log(res);
    }

    return (<>
        <HeadsUser />
        
        <section className="mt-5 flex flex-col text-xs">
            <span>Seu saldo</span>
            <h1 className="text-4xl mb-5">{formatCurrency(balance)}</h1>
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#fff]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#fff]"
                    }}
                ><Tab
                    key="photos"
                    title={
                    <div className="flex items-center space-x-2">
                        <PiHandDeposit />
                        <span>Depositar</span>
                        <Chip size="sm" variant="faded"><FaCheck /></Chip>
                    </div>}>
                        <form onSubmit={handleSubmit(deposit)}>
                            <Input
                                label="Escolha um valor"
                                isClearable
                                {...register('value', { required: 'Valor é obrigatório' })} 
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
                            {/* <p className="text-sm font-semibold mt-2">Bonus Indicação R$ 50+</p> */}
                            <div className="flex items-center w-full justify-between mt-5">
                                <p className="mt-3 uppercase mb-1">Canais de Deposito</p>
                                <img src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-logo-pix-150x220.png" className="max-w-[20px]" alt="" />
                            </div>
                            <Button type='submit' size="lg" className="w-full mt-2" color="primary"> Depositar </Button>
                            <div className="flex items-center w-full justify-between mt-5">
                                <p className="mt-3 uppercase mb-1">Total de bônus</p>
                                <span>{formatCurrency(bonus)}</span>
                                <Button 
                                    isDisabled={!canRedeem} 
                                    isLoading={loadingBonus} 
                                    onClick={redeemBonus} 
                                    variant={canRedeem ? "solid" : "flat"}
                                    size="sm" 
                                    color="primary"
                                >{canRedeem ? "Pegar bônus diário (R$ 5)" : "Bônus diário resgatado"}</Button>
                            </div>
                            {bonus > 50 &&
                                <div className="flex items-center w-full justify-between mt-5">
                                    <Button isLoading={loadingBonus} onClick={transferBonus} size="lg" className="w-full mt-2" color="primary">Transferir bonus para a carteira</Button>
                                </div>
                            }
                            
                        </form>
                    </Tab>
                    <Tab
                        key="music"
                        title={
                            <div className="flex items-center space-x-2">
                                <GiTakeMyMoney />
                                <span>Sacar</span>
                                <Chip size="sm" variant="faded"><FaCheck /></Chip>
                            </div>
                        }>
                        <form onSubmit={handleSubmit(withdrawn)}>
                            <Input className="mb-2" label="Chave Pix" {...register('key')}  />
                            <Input
                                label="Escolha um valor"
                                isClearable
                                {...register('valueWithdrawn', { required: 'Valor é obrigatório' })} 
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
                            <Button type='submit' size="lg" className="w-full mt-2" color="primary">Sacar</Button>
                        </form>
                    </Tab>
                </Tabs>
            </div>
            <span className="my-5 flex text-base items-center gap-2">
                <MdHistoryToggleOff className="text-sm"/>Suas transações
            </span>
            <Tablen />
        </section>

        <footer className='mt-auto bg-[#00000077] backdrop-blur-md p-4 text-[10px] uppercase tracking-wider flex items-center justify-center w-full'>
            <p className='opacity-50'>© Copyright Global X | 2024</p>
        </footer>
    </>)
}