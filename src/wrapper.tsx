import React from "react"

const Wrapper = ({ children }: { children: any }) => {
    return <React.Fragment>
        {
            children
        }
    </React.Fragment>
}


export default React.memo(Wrapper,()=>true)

