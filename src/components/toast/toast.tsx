import React, { useEffect } from 'react';
import './toast.scss';
export interface i_toastProps {
    toast: { type: string; message: string; show: boolean };
    setToast: (toast: { type: string; message: string; show: boolean }) => void;
}

const Toast: React.FC<i_toastProps> = (props) => {
    const toast = props.toast || { type: 'SUCCESS', message: '', show: false };
    const setToast = props.setToast;
    let iconClass: string = '';
    let alertClass: string = '';

    switch (toast.type) {
        case 'SUCCESS':
            iconClass = 'fas fa-check-circle';
            alertClass = 'alert success';
            break;
        case 'ERROR':
            iconClass = 'fas fa-exclamation-circle';
            alertClass = 'alert error';
            break;
        case 'INFO':
            iconClass = 'fas fa-info-circle';
            alertClass = 'alert info';
            break;
    }

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 3000);
        }
    }, [toast]);

    const hideToast = () => {
        setToast({ ...toast, show: false });
    };

    return (
        <div className={`${alertClass} ${toast.show ? 'show' : ''}`}>
            <span className="alert-icon">
                <i className={iconClass}></i>
            </span>
            <span className="alert-message">{toast.message}</span>
            <span className="alert-close" onClick={hideToast}>
                &times;
            </span>
        </div>
    );
};

export default Toast;
