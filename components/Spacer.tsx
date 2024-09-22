import React, {FC} from 'react';
import {View} from "react-native";

interface ISpacer {
    space: number;
}

const Spacer: FC<ISpacer> = ({space}) => {
    return (
        <View style={{
            marginTop: space
        }}/>

    );
};

export default Spacer;