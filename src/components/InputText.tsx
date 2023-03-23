import React, { forwardRef } from "react";

const Add = (prop:any,ref:any) => {
    return(
        
        <div >
            <input type="text" ref={ref}
                    className="container"
                    placeholder={prop.textPlaceHolder}
                    maxLength={prop.maxLength}
                    >
                
            </input>
        </div>
    );
}

export default forwardRef(Add)