import { notification } from 'antd';

export function handleError(message: string) {
    return (err: any) => notification.error({ message: 'Something went wrong.', description: message });
}