'use client'
import { useRouter } from 'next/navigation';
import {
    Card, CardHeader, Snippet, 
    CardFooter, Image, Button
} from "@nextui-org/react";

import { BiUser } from 'react-icons/bi';
import { AiOutlineHome } from "react-icons/ai";
import { CiPower, CiShop } from "react-icons/ci";
import { FaChartLine, FaUsersRays } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { MdMultipleStop } from "react-icons/md";

import { useRecoilValue } from 'recoil';
import Wins from '@/components/Wins/Wins';
import { userState } from '@/atom/userAtom';
import { useEffect, useState } from 'react';
import endpoints from '@/service/endpoints';
import api from '@/service/api';
import { formatCurrency } from '@/utils';

export default function Dashboard() {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [balance, setBalance] = useState("-");
  const [bonus, setBonus] = useState("-");
  const { inviteCode } = user;

    useEffect(() => {
        async function fetchData() {         
            const response = await api.get(endpoints.gateway.BALANCE);
            if (!response.success) {
                console.log("error balance");
            }
            const { data } = response;
            setBalance((data.main / 100));
            setBonus((data.bonus / 100));
        }
        fetchData();
    }, []);

  return (
    <>
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 w-full justify-between">
                <h1 className='text-white uppercase'><img src="/logo.png" className='max-w-14' alt="" /></h1>
                <div className="flex items-center gap-3" onClick={() => router.push('/user/profile')}>
                    <div className="w-10 h-10 rounded-xl bg-[#161616] flex items-center justify-center">
                        <BiUser />
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-3 justify-between">
                    <div className="w-full text-2xl relative h-12 rounded-md flex items-center justify-center border border-[rgba(255,255,255,.2)] transition-all delay-75 active:scale-110" onClick={() => router.push('/user/dashboard')}>
                        <AiOutlineHome />
                        <span className="mb-[-75px] absolute text-[9px] uppercase tracking-[1.2px] font-[200] opacity-70">Inicio</span>
                    </div>
                    <div className="w-full text-2xl relative h-12 rounded-md flex items-center justify-center border border-[rgba(255,255,255,.2)] transition-all delay-75 active:scale-110"  onClick={() => router.push('/user/shop')}>
                        <FaChartLine />
                        <span className="mb-[-75px] absolute text-[9px] uppercase tracking-[1.2px] font-[200] opacity-70">Corretora</span>
                    </div>
                    <div className="w-full text-2xl relative h-12 rounded-md flex items-center justify-center border border-[rgba(255,255,255,.2)] transition-all delay-75 active:scale-110" onClick={() => router.push('/user/wallet')}>
                        <IoWalletOutline />
                        <span className="mb-[-75px] absolute text-[9px] uppercase tracking-[1.2px] font-[200] opacity-70">Carteira</span>
                    </div>
                    <div className="w-full text-2xl relative h-12 rounded-md flex items-center justify-center border border-[rgba(255,255,255,.2)] transition-all delay-75 active:scale-110">
                        <FaUsersRays />
                        <span className="mb-[-75px] absolute text-[9px] uppercase tracking-[1.2px] font-[200] opacity-70 whitespace-nowrap">Investidores</span>
                    </div>
                </div>
            </div>

            <Wins />

            <div className="flex flex-col">
                <h2 className="text-sm mb-3 flex items-center gap-2">
                    <span className="tracking-widest uppercase text-xs font-bold">Carteira:</span>
                </h2>
            </div>

            <div className="flex flex-col">
                <p className="text-white-400 text-small">Saldo total: {balance !== "-" ? formatCurrency(balance + bonus) : "-"}</p>
                <p className="text-white-400 text-small">Saldo disponivel: {balance !== "-" ? formatCurrency(balance) : "-"}</p>
            </div>

            <div className="flex flex-col">
                <h2 className="text-sm mb-3 flex items-center gap-2">
                    <span className="tracking-widest uppercase text-xs font-bold">Noticias</span>
                </h2>

                <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Nova era</p>
                        <h4 className="text-white/90 font-medium text-xl">investimentos Global X</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="/world.webp"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Investimento</p>
                                <p className="text-tiny text-white/60">ganhe até 50% ao dia com o investimento</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm" onClick={() => router.push('/user/shop')}>Investir agora</Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="w-full flex flex-col">
                <h2 className="text-sm mb-3 flex items-center gap-2">
                    <span className="tracking-widest uppercase text-xs font-bold">Convite</span>
                </h2>
                <Snippet size="md" symbol="" className="w-full flex"><p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px]">{location.origin}/auth?code={inviteCode}</p></Snippet>
            </div>

        </div>

        <footer className='mt-auto bg-[#00000077] backdrop-blur-md rounded-md p-4 text-[10px] uppercase tracking-wider flex items-center justify-center w-full'>
            <p className='opacity-50'>© Copyright Global X | 2024</p>
        </footer>
        <div className="absolute left-0 top-0 w-44 h-24 blur-3xl bg-[#3B82F6] z-[-1] opacity-20"></div>
        <div className="absolute right-0 bottom-0 w-44 h-24 blur-3xl bg-[#3B82F6] z-[-1] opacity-20"></div>
  </>
  );
}
