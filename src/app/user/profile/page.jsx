'use client'
import { useState } from "react";
import { 
    Avatar, Card, CardHeader, CardBody,
    CardFooter, Button, Input
} from "@nextui-org/react";

import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaHandsHelping, FaUserTie } from "react-icons/fa";
import HeadsUser from "@/components/HeadUser/HeadUser";

export default function Profile() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return(<>
        <HeadsUser />
        <section className="mt-5 flex flex-col text-xs">
            <span className="text-xs flex items-center gap-1"><CiLock className="text-sm"/> Alterar minha senha</span>
            <div className="flex items-center mt-3 gap-2">
                <Input
                    variant="bordered"
                     
                    size="xs"
                    placeholder="Sua senha"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />
                <Input
                    variant="bordered"
                    size="xs"
                    placeholder="Nova senha"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                />
            </div>
            <Button color="primary" size="sm" className="w-full mt-2 bg-[#fff] text-black"   isLoading>Enviando...</Button>
            <span className="my-5 flex items-center gap-1"><IoShareSocialOutline className="text-sm"/>Redes Sociais</span>
            <Card className="w-full">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src="/world.webp" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Global X</h4>
                        <h5 className="text-small tracking-tight text-default-400">@globalx</h5>
                    </div>
                    </div>
                    <a href="https://t.me/+4ZVTuOnwAk41ZjQ5" target="_blank">
                        <Button
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="solid"
                        >
                            Seguir
                        </Button>
                    </a>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        Siga A gente agora no telegram, e não perca nenhuma noticia nossa!
                    </p>
                    <span className="pt-2">
                    #InvistaSeguro 
                    <span className="py-2" aria-label="computer" role="img">
                        💻
                    </span>
                    </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">500k+</p>
                    <p className=" text-default-400 text-small">De Lucro</p>
                    </div>
                    <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">de investidores</p>
                    </div>
                </CardFooter>
            </Card>
            <span className="my-5 flex items-center gap-1"><FaHandsHelping className="text-sm"/>Precisa de ajuda ?</span>
            <Button variant="bordered"   endContent={<FaUserTie />}>
                Contatar Suporte
            </Button>
        </section>
        <footer className='mt-auto bg-[#00000077] backdrop-blur-md p-4 text-[10px] uppercase tracking-wider flex items-center justify-center w-full'>
            <p className='opacity-50'>© Copyright Global X | 2024</p>
        </footer>
    </>)
}