import {Card, message} from 'antd';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {EmptyLayout} from '~/components/layout';
import {APP_ROUTES} from '~/constant';
import {LoginPayload} from '~/models';
import {IMAGES} from '~/public/images';
import ZonePage from "../components/IncomeAndExpenditure/ZonePage";
import LoginForm from "~/components/auth/LoginForm";


const Login = (props) => {

    return (
        <div className="flex h-screen items-center justify-center">
            <Card
                className="w-[900px] overflow-hidden rounded-2xl border-none shadow-lg"
                bodyStyle={{padding: 0,}}
            >
                <div className="flex flex-1">
                    <div className="w-full p-5 sm:w-1/2 md:w-2/5">
                        <div className="mb-9 text-center">
                            <h1>Logo</h1>
                        </div>
                        <LoginForm />
                    </div>
                    <div
                        className="hidden w-1/2  items-center justify-center bg-black p-5 sm:flex md:w-3/5 md:p-10">
                        <div className="max-w-xs">
                            <h2 className="text-3xl text-white">Welcome to Logo!</h2>
                            <p className="text-white">
                                Logo is purely based on Ant Design components and follows Ant Design guidelines.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
export default Login;
Login.Layout = EmptyLayout;






