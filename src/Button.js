// src/Button.js
import React, { useState } from 'react';
import Popup from './Popup';

const Button = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openPopup}>Open Popup</button>
            <Popup isOpen={isOpen} handleClose={closePopup} />
        </div>
    );
};

export default Button;
