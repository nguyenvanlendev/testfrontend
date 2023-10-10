import React from "react";
import './RadioGroup.scss';

interface IRadio {
    id: number;
    value: string;
}

interface IRadioGroup {
    className?: string;
    options: IRadio[];
    name: string;
    value: any;
    setSelected: (select?: any) => void;
}

export const RadioGroup: React.FC<IRadioGroup> = ({className, options, name, value, setSelected}) => {

    return (
        <div className={`radio-group ${className ? className : ""}`}>
            {options?.map((item) => 
                <div key={item.id} className="radio-group__item">
                    <input 
                        className="radio-group__item__input"
                        name={name}
                        type="radio"
                        value={item.id}
                        checked={item.id == value}
                        onChange={(e) => {
                            setSelected(e.currentTarget.value)
                        }}
                    />
                    <label>{item.value}</label>
                </div>
            )}
        </div>
    )
}