'use client'
import { useRecoilValue } from 'recoil';
import { userState } from '@/atom/userAtom';
import { Snippet } from "@nextui-org/react";

import HeadsUser from "@/components/HeadUser/HeadUser";
import TableInvite from '@/components/TableInvite/TableInvite';

export default function Indicate() {
    const { enviteCode } = useRecoilValue(userState);

    return(<>
        <HeadsUser />

        <div className="w-full flex flex-col mb-5">
            <h2 className="text-sm mb-3 flex items-center gap-2">
                <span className="tracking-widest uppercase text-xs font-bold">Convite</span>
            </h2>
            <Snippet size="md" symbol="" color="primary" className="w-full flex"><p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px]">{location.origin}/auth?code={enviteCode}</p></Snippet>
        </div>

        <TableInvite />
        
        <footer className='mt-auto bg-[#00000077] backdrop-blur-md p-4 text-[10px] uppercase tracking-wider flex items-center justify-center w-full'>
            <p className='opacity-50'>© Copyright Global X | 2024</p>
        </footer>
    </>)
}