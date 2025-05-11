import { Flex, Spin } from 'antd';
import './Loader.css';

export function Loader() {
    return (
        <section className="loader">
            <p>Loading... Please wait...</p>
            <Flex align="center" gap="middle">
                <Spin size="large" />
            </Flex>
        </section>
    )
}
