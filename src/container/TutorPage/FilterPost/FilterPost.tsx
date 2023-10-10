import React, { useState } from "react";
import { FilterForm } from "./FilterForm/FilterForm";
import { ResultScreen } from "./ResultScreen/ResultScreen";
import { IInfoPostDetail } from "../../../@types/apiResponse";

export const FilterPost = () => {
    const [screen, setScreen] = useState(1);
    const [listPost, setListPost] = useState<IInfoPostDetail[]>([]);
    
    if (screen === 1) return <FilterForm onGetResult={(listPost:IInfoPostDetail[]) => {
        setListPost(listPost)
        setScreen(2)}
    } />
    return <ResultScreen goBack={() => setScreen(1)} listPost={listPost}/>;
}