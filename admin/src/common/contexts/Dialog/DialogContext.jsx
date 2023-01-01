import React, {createContext, useEffect, useRef} from "react";
import "./styles.sass";

export const DialogContext = createContext({});

export const DialogProvider = (props) => {
    const ref = useRef();

    const close = () => {
        ref.current?.classList.add("dialog-hidden");
    }

    const onClose = (e) => {
        if (e.animationName === "fadeOut") props?.close();
    }

    const handleKeyDown = (event) => {
        if (event.code === "Enter" && props.submit) props.submit();
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (!ref.current?.contains(event.target)) close();
        }

        document.addEventListener("mousedown", handleClick);
    }, [ref]);

    return (
        <DialogContext.Provider value={close}>
            <div className="dialog-area">
                <div className="dialog" ref={ref} onAnimationEnd={onClose} onKeyDown={handleKeyDown} style={{maxWidth: props.maxWidth || 650}}>
                    {props.children}
                </div>
            </div>
        </DialogContext.Provider>
    )
}