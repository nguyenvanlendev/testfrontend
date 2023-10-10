import React from "react"
import "./Button.scss"

export const Button: React.FC<ButtonStudent> = ({ content, onClick = () => {}, paddingLeft = "107px", paddingTop = "15px", borderRadius = "60px"}) => {
    return <button className="button" onClick={onClick}  style = {{
        paddingLeft: paddingLeft || "unset",
        paddingRight: paddingLeft || "unset",
        paddingBottom: paddingTop || "unset",
        paddingTop: paddingTop || "unset",
        borderRadius: borderRadius || "unset"
    }}>
        {content}
    </button>
}