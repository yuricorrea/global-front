"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [selected, setSelected] = React.useState(code ? "sign-up" : "login");
  const { login, signup, loading, errorMsg } = useAuth();

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const regEmailRef = React.useRef();
  const regPasswordRef = React.useRef();
  const regNameRef = React.useRef();
  const refPhone = React.useRef();
  const regAffiliateRef = React.useRef();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendSignUp = (e) => {
    if (loading) return;
    e.preventDefault();
    const email = regEmailRef.current.value;
    const password = regPasswordRef.current.value;
    const phone = refPhone.current.value;
    const referral = regAffiliateRef.current.value;
    if (!validateEmail(email)) {
      toast("E-mail invalido");
      return regEmailRef.current.focus();
    }
    if (password?.length < 6) {
      toast("A senha deve ter pelo menos 6 caracteres");
      return regPasswordRef.current.focus();
    }
    if (!phone) {
      toast("Celular inválido");
      return refPhone.current.focus();
    }
    signup({
      email,
      password,
      phone,
      referral,
    });
  };

  const sendLogin = (e) => {
    if (loading) return;
    e.preventDefault();
    if (selected === "sign-up") return sendSignUp();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!validateEmail(email)) {
      toast("E-mail invalido");
      return emailRef.current.focus();
    }
    if (password?.length < 6) {
      toast("A senha deve ter pelo menos 6 caracteres");
      return passwordRef.current.focus();
    }
    login({ email, password });
  };

  React.useEffect(() => {
    if (errorMsg) {
      toast(errorMsg);
    }
  }, [errorMsg]);

  return (
    <>
      <div className="flex flex-col w-full items-center h-full justify-between">
        <header className="pt-10">
          {" "}
          <img src="/logo.png" className="max-w-32" alt="" />
          {" "}
        </header>
        <div className="w-full flex-1 flex items-center justify-center px-10 login-form">
          <Card className="w-full bg-transparent h-auto border-none">
            <CardBody>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <form onSubmit={sendLogin} className="flex flex-col gap-4">
                    <Input
                      ref={emailRef}
                      isRequired
                      label="Email"
                      type="text"
                    />
                    <Input
                      isRequired
                      label="Password"
                      type="password"
                      ref={passwordRef}
                    />
                    <p className="text-center text-small">
                      Criar uma conta?{" "}
                      <Link size="sm" onPress={() => setSelected("sign-up")}>
                        Clique aqui
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        isLoading={loading}
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Registrar-se">
                  <form onSubmit={sendSignUp} className="flex flex-col gap-4">
                    <Input
                      ref={regEmailRef}
                      isRequired
                      label="Email"
                      type="text"
                    />
                    <Input
                      ref={regPasswordRef}
                      isRequired
                      label="Password"
                      type="password"
                    />
                    <Input
                      ref={refPhone}
                      isRequired
                      label="Celular"
                      type="number"
                    />
                    <Input
                      value={code}
                      readOnly={!!code}
                      ref={regAffiliateRef}
                      label="Código de indicação"
                      type="text"
                    />
                    <p className="text-center text-small">
                      Já tem uma conta?{" "}
                      <Link size="sm" onPress={() => setSelected("login")}>
                        Clique aqui
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button isLoading={loading} fullWidth type="submit" color="primary">
                        Enviar
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
      <footer className="mt-auto bg-[#00000077] backdrop-blur-md p-4 text-[10px] uppercase tracking-wider flex items-center justify-center w-full">
        <p className="opacity-50">© Copyright Global X | 2024</p>
      </footer>
    </>
  );
}
