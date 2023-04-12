import { Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LoginForm } from '~/components/auth';
import { EmptyLayout } from '~/components/layout';
import { APP_ROUTES } from '~/constant';
import { LoginPayload } from '~/models';
import { IMAGES } from '~/public/images';

export interface SigninProps {}

export default function Signin(props: SigninProps) {
    const router = useRouter();

    async function handleLoginSubmit(payload: LoginPayload) {
        console.log('🏆 ~ handleLoginSubmit ~ payload:', payload);
        router.replace(APP_ROUTES.HOME);
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Card
                className="w-[900px] overflow-hidden rounded-2xl border-none shadow-lg"
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div className="flex flex-1">
                    <div className="w-full p-5 sm:w-1/2 md:w-2/5">
                        <div className="mb-9 text-center">
                            <Image src={IMAGES.logoWithName} alt="logo" height={36} className="object-cover" />
                        </div>
                        <LoginForm onSubmit={handleLoginSubmit} />
                    </div>
                    <div className="hidden w-1/2  items-center justify-center bg-black p-5 sm:flex md:w-3/5 md:p-10">
                        <div className="max-w-xs">
                            <h2 className="text-3xl text-white">Welcome to Crema!</h2>
                            <p className="text-white">
                                Crema is purely based on Ant Design components and follows Ant Design guidelines.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

Signin.Layout = EmptyLayout;
