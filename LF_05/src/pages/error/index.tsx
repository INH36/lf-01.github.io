import React, { useEffect, useState } from 'react';
import Error404 from './404';
import Error403 from './403';
import Error500 from './500';


const Error: React.FC = () => {

    const [errorType, setErrorType] = useState<string>('404');

    useEffect(() => {
        getErrorType();
    })

    // 获取错误类型 error=404,403,500
    const getErrorType = () => {
        const error = window.location.search.split('=')[1];
        setErrorType(error);
    }

    // 根据错误类型返回对应的错误页面
    const renderErrorPage = () => {
        switch (errorType) {
            case '404':
                return <Error404 />;
            case '403':
                return <Error403 />;
            case '500':
                return <Error500 />;
            default:
                return <Error404 />;
        }
    }

    return (
        <>
            {renderErrorPage()}
        </>

    );
};

export default Error;
