'use client'
import { User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LiaTimesSolid } from "react-icons/lia";
import { useRecoilValue } from "recoil";
import { userState } from '@/atom/userAtom';

export default function HeadsUser() {
    const router = useRouter();
    const { email } = useRecoilValue(userState);

    return(<>
        <header className="flex sticky top-0 bg-[rgba(0,0,0,.5)] backdrop-blur-md p-2 items-center justify-between z-[101]">
            <User   
                name="E-mail"
                description={email}
                avatarProps={{
                    name: "U"
                }}
            />
            <div className="w-10 h-10 rounded-full border border-[#111] flex items-center justify-center text-white text-lg" onClick={() => router.push('/user/dashboard')}>
                <LiaTimesSolid />
            </div>
        </header>
        <hr className="w-full h-[1px] bg-[#252525] my-4 border-none" />
    </>)
}